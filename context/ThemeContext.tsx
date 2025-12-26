
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

type ThemeMode = 'light' | 'dark' | 'auto';
type ResolvedTheme = 'light' | 'dark';

export type AuditIssueType = 'Contrast' | 'Semantic' | 'ARIA' | 'SEO' | 'Navigation';
export type Severity = 'Critical' | 'Warning' | 'Info';

export interface AuditIssue {
  id: string;
  type: AuditIssueType;
  severity: Severity;
  elementName: string;
  message: string;
  pageId: string;
  sectionId?: string;
  ratio?: number;
  target?: number;
  suggestion?: string;
  isOffScreen?: boolean;
  auditId?: string;
  wcag?: string;
}

export interface HealthScore {
  overall: number;
  contrast: number;
  semantic: number;
  aria: number;
  timestamp: number;
  scope: string;
  issuesCount: number;
}

interface ThemeContextType {
  mode: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  runAudit: (scope: { type: 'current' | 'global' | 'custom' | 'component', pageIds?: string[], sectionIds?: string[], componentSelectors?: string[] }, dataRegistry?: any, customCSS?: string) => void;
  clearAudit: () => void;
  auditIssues: AuditIssue[];
  healthScore: HealthScore | null;
  isAuditActive: boolean;
  isAuditing: boolean;
  auditProgress: number;
  auditHistory: HealthScore[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getRGB = (color: string): [number, number, number] => {
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return [255, 255, 255];
  return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
};

const getLuminance = (r: number, g: number, b: number): number => {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

const getContrast = (fg: string, bg: string): number => {
  const l1 = getLuminance(...getRGB(fg));
  const l2 = getLuminance(...getRGB(bg));
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

const getEffectiveBG = (el: HTMLElement): string => {
  let curr: HTMLElement | null = el;
  while (curr) {
    const bg = window.getComputedStyle(curr).backgroundColor;
    if (bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') return bg;
    curr = curr.parentElement;
  }
  return 'rgb(255, 255, 255)';
};

export const ThemeProvider = ({ children }: { children?: ReactNode }) => {
  const [mode, setModeState] = useState<ThemeMode>(() => (localStorage.getItem('wn_theme') as ThemeMode) || 'auto');
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');
  const [auditIssues, setAuditIssues] = useState<AuditIssue[]>([]);
  const [healthScore, setHealthScore] = useState<HealthScore | null>(null);
  const [isAuditActive, setIsAuditActive] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditProgress, setAuditProgress] = useState(0);
  const [auditHistory, setAuditHistory] = useState<HealthScore[]>(() => {
    const saved = localStorage.getItem('wn_audit_history');
    return saved ? JSON.parse(saved) : [];
  });

  const setMode = (m: ThemeMode) => {
    setModeState(m);
    localStorage.setItem('wn_theme', m);
  };

  const toggleMode = () => setMode(mode === 'light' ? 'dark' : mode === 'dark' ? 'auto' : 'light');

  const clearAudit = useCallback(() => {
    setIsAuditActive(false);
    setIsAuditing(false);
    setAuditIssues([]);
    setAuditProgress(0);
    const style = document.getElementById('wn-audit-styles');
    if (style) style.remove();
    document.querySelectorAll('[data-wn-audit-id]').forEach(el => {
      el.removeAttribute('data-wn-audit-error');
      el.removeAttribute('data-wn-wcag');
      el.removeAttribute('data-wn-suggestion');
      el.removeAttribute('data-wn-audit-id');
      el.removeAttribute('data-wn-tag');
      el.classList.remove('wn-audit-target');
    });
  }, []);

  const runAudit = useCallback(async (scope: { type: 'current' | 'global' | 'custom' | 'component', pageIds?: string[], sectionIds?: string[], componentSelectors?: string[] }, dataRegistry?: any, customCSS?: string) => {
    clearAudit();
    setIsAuditing(true);
    setAuditProgress(0);

    const issues: AuditIssue[] = [];
    const currentPageId = window.location.hash.replace('#/', '') || 'home';

    const shouldCheckDOM = scope.type === 'current' || scope.type === 'global' || scope.type === 'component' || (scope.type === 'custom' && scope.pageIds?.includes(currentPageId));

    if (shouldCheckDOM) {
      let targetElements: HTMLElement[] = [];
      if (scope.type === 'component' && scope.componentSelectors) {
        scope.componentSelectors.forEach(sel => {
          try {
            targetElements.push(...Array.from(document.querySelectorAll(`${sel}, ${sel} *`)) as HTMLElement[]);
          } catch (e) {
            console.warn(`Invalid selector: ${sel}`);
          }
        });
      } else {
        targetElements = Array.from(document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, button, a, img, label, input, select, textarea, i, nav, header, footer, main, section, figcaption')) as HTMLElement[];
      }

      targetElements.forEach((el, index) => {
        const style = window.getComputedStyle(el);
        const section = el.closest('section')?.id || 'layout';
        
        // Detailed visibility check for Focus Order (WCAG 2.4.3)
        const isHidden = 
          style.display === 'none' || 
          style.visibility === 'hidden' || 
          parseFloat(style.opacity) === 0 ||
          style.clip === 'rect(0px, 0px, 0px, 0px)' ||
          style.clipPath === 'inset(50%)';

        const rect = el.getBoundingClientRect();
        // Check if element is naturally off-screen (useful for detecting unreachable focusables)
        const isOffScreen = 
          rect.width === 0 || 
          rect.height === 0 ||
          rect.right < -5000 || 
          rect.left > window.innerWidth + 5000 ||
          el.offsetParent === null;

        if (scope.type === 'custom' && scope.sectionIds && scope.sectionIds.length > 0 && !scope.sectionIds.includes(section)) return;

        const auditId = `audit-el-${index}`;
        el.setAttribute('data-wn-audit-id', auditId);
        el.setAttribute('data-wn-tag', el.tagName);

        // --- 1. Focus Order & Visibility (WCAG 2.4.3) ---
        const tabIndex = el.getAttribute('tabindex');
        const isNaturallyFocusable = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName);
        const isProgrammaticallyFocusable = tabIndex !== null && parseInt(tabIndex) >= 0;
        
        if ((isNaturallyFocusable || isProgrammaticallyFocusable) && (isHidden || isOffScreen)) {
          el.classList.add('wn-audit-target');
          el.setAttribute('data-wn-audit-error', `WCAG 2.4.3: Hidden Focusable`);
          el.setAttribute('data-wn-wcag', '2.4.3');
          issues.push({
            id: `dom-nav-hidden-${Math.random().toString(36).substr(2, 9)}`,
            type: 'Navigation',
            severity: 'Critical',
            elementName: el.tagName,
            message: `Element <${el.tagName.toLowerCase()}> is focusable but visually hidden or off-screen, violating WCAG 2.4.3 (Focus Order). Keyboard users may lose their position.`,
            pageId: currentPageId,
            sectionId: section,
            auditId,
            wcag: '2.4.3'
          });
        }

        // Skip non-critical audits for hidden elements unless they were focusable violations
        if (isHidden && !el.classList.contains('wn-audit-target')) return;

        // --- 2. Contrast Check (WCAG 1.4.3) ---
        if (['P', 'SPAN', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'BUTTON', 'A', 'LABEL'].includes(el.tagName)) {
          const ratio = getContrast(style.color, getEffectiveBG(el));
          const fontSize = parseFloat(style.fontSize);
          const target = (fontSize >= 18.66 || (fontSize >= 14 && parseInt(style.fontWeight) >= 700)) ? 3.0 : 4.5;

          if (ratio < target) {
            el.classList.add('wn-audit-target');
            el.setAttribute('data-wn-audit-error', `Low Contrast: ${ratio.toFixed(2)}:1`);
            el.setAttribute('data-wn-wcag', '1.4.3');
            issues.push({
              id: `dom-contrast-${Math.random().toString(36).substr(2, 9)}`,
              type: 'Contrast',
              severity: ratio < 2.5 ? 'Critical' : 'Warning',
              elementName: el.tagName,
              message: `Contrast ratio is ${ratio.toFixed(2)}:1 (Target ${target}:1)`,
              pageId: currentPageId,
              sectionId: section,
              ratio,
              target,
              auditId,
              wcag: '1.4.3'
            });
          }
        }

        // --- 3. Image Alt Attributes (WCAG 1.1.1) ---
        if (el.tagName === 'IMG') {
          const alt = el.getAttribute('alt');
          if (alt === null || alt.trim() === "") {
            el.classList.add('wn-audit-target');
            el.setAttribute('data-wn-audit-error', `Missing Alt Text`);
            el.setAttribute('data-wn-wcag', '1.1.1');
            el.setAttribute('data-wn-suggestion', "Add descriptive alt text.");
            issues.push({
              id: `dom-aria-img-${Math.random().toString(36).substr(2, 9)}`,
              type: 'ARIA',
              severity: 'Critical',
              elementName: 'Image',
              message: 'Image is missing an alternative text description.',
              suggestion: "Add descriptive alt text",
              pageId: currentPageId,
              sectionId: section,
              auditId,
              wcag: '1.1.1'
            });
          }
        }

        // --- 4. Interactive Labels (WCAG 4.1.2) ---
        if (['BUTTON', 'A'].includes(el.tagName)) {
          const hasLabel = el.innerText.trim().length > 0 || 
                           el.getAttribute('aria-label') || 
                           el.getAttribute('title') || 
                           el.getAttribute('aria-labelledby');
          if (!hasLabel) {
            el.classList.add('wn-audit-target');
            el.setAttribute('data-wn-audit-error', `Missing Accessible Label`);
            el.setAttribute('data-wn-wcag', '4.1.2');
            issues.push({
              id: `dom-aria-name-${Math.random().toString(36).substr(2, 9)}`,
              type: 'ARIA',
              severity: 'Critical',
              elementName: el.tagName,
              message: `Interactive <${el.tagName.toLowerCase()}> is missing an accessible name.`,
              pageId: currentPageId,
              sectionId: section,
              auditId,
              wcag: '4.1.2'
            });
          }
        }

        // --- 5. Landmark Roles (WCAG 1.3.1) ---
        if (['HEADER', 'NAV', 'FOOTER', 'MAIN'].includes(el.tagName) && !el.getAttribute('role')) {
          const roleMap: Record<string, string> = { 'HEADER': 'banner', 'NAV': 'navigation', 'FOOTER': 'contentinfo', 'MAIN': 'main' };
          const suggestion = `Suggest role="${roleMap[el.tagName]}"`;
          el.classList.add('wn-audit-target');
          el.setAttribute('data-wn-audit-error', `${el.tagName} Landmark role missing`);
          el.setAttribute('data-wn-wcag', '1.3.1');
          el.setAttribute('data-wn-suggestion', suggestion);
          issues.push({
            id: `dom-aria-landmark-${Math.random().toString(36).substr(2, 9)}`,
            type: 'ARIA',
            severity: 'Info',
            elementName: el.tagName,
            message: `Landmark <${el.tagName.toLowerCase()}> missing explicit role.`,
            suggestion,
            pageId: currentPageId,
            sectionId: section,
            auditId,
            wcag: '1.3.1'
          });
        }
      });
    }

    const steps = 15;
    for (let i = 1; i <= steps; i++) {
      await new Promise(r => setTimeout(r, 45));
      setAuditProgress((i / steps) * 100);
    }

    setIsAuditActive(true);
    
    const styleNode = document.createElement('style');
    styleNode.id = 'wn-audit-styles';
    styleNode.innerHTML = `
      .wn-audit-target {
        outline: 3px dashed #f43f5e !important;
        outline-offset: 4px !important;
        position: relative !important;
        z-index: 40 !important;
        box-shadow: 0 0 15px rgba(244, 63, 94, 0.4) !important;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease !important;
      }
      .wn-audit-target:hover {
        transform: scale(1.02) !important;
        box-shadow: 0 0 30px rgba(244, 63, 94, 0.7) !important;
        z-index: 1000 !important;
      }
      .wn-audit-target::after {
        content: attr(data-wn-tag) ": " attr(data-wn-audit-error) " [" attr(data-wn-wcag) "]" "\\A" attr(data-wn-suggestion);
        white-space: pre-wrap;
        position: absolute;
        bottom: calc(100% + 15px);
        left: 50%;
        transform: translateX(-50%);
        background: #0f172a;
        color: white;
        padding: 12px 18px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 700;
        min-width: 240px;
        max-width: 350px;
        word-wrap: break-word;
        box-shadow: 0 20px 40px -5px rgba(0,0,0,0.8);
        pointer-events: none;
        letter-spacing: 0.02em;
        border: 1px solid #f43f5e;
        z-index: 2147483647;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.25s ease, visibility 0.25s ease, transform 0.25s ease;
        line-height: 1.6;
        text-align: center;
      }
      .wn-audit-target:hover::after {
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) translateY(-5px);
      }
      ${customCSS || ''}
    `;
    document.head.appendChild(styleNode);

    setAuditIssues(issues);
    
    const score: HealthScore = {
      overall: Math.round(Math.max(0, 100 - (issues.length * 2.5))),
      contrast: Math.round(100 - (issues.filter(i => i.type === 'Contrast').length * 5)),
      semantic: 100,
      aria: Math.round(100 - (issues.filter(i => i.type === 'ARIA').length * 8)),
      timestamp: Date.now(),
      scope: scope.type.toUpperCase(),
      issuesCount: issues.length
    };

    setHealthScore(score);
    setIsAuditing(false);

    setAuditHistory(prev => {
      const updated = [score, ...prev].slice(0, 50);
      localStorage.setItem('wn_audit_history', JSON.stringify(updated));
      return updated;
    });
  }, [clearAudit]);

  useEffect(() => {
    const root = window.document.documentElement;
    let target: ResolvedTheme = 'light';
    if (mode === 'light') target = 'light';
    else if (mode === 'dark') target = 'dark';
    else {
      const h = new Date().getHours();
      target = (h >= 6 && h < 18) ? 'light' : 'dark';
    }
    setResolvedTheme(target);
    if (target === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ 
      mode, resolvedTheme, setMode, toggleMode, 
      runAudit, clearAudit, auditIssues, healthScore, 
      isAuditActive, isAuditing, auditProgress, auditHistory 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
