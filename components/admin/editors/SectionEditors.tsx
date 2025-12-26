import React from 'react';

interface EditorProps {
  data: any;
  onChange: (newData: any) => void;
}

export const HeroEditor: React.FC<EditorProps> = ({ data, onChange }) => (
  <div className="space-y-4">
    <div>
      <label className="text-[10px] font-black uppercase text-gray-400 block mb-1">Headline</label>
      <input 
        value={data.title} 
        onChange={(e) => onChange({ ...data, title: e.target.value })}
        className="w-full p-3 rounded-xl border border-gray-200 text-sm font-bold focus:border-rose-500 outline-none"
      />
    </div>
    <div>
      <label className="text-[10px] font-black uppercase text-gray-400 block mb-1">Subtitle</label>
      <textarea 
        value={data.subtitle} 
        onChange={(e) => onChange({ ...data, subtitle: e.target.value })}
        className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:border-rose-500 outline-none h-24"
      />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="text-[10px] font-black uppercase text-gray-400 block mb-1">Pill Text</label>
        <input 
          value={data.pillText || ''} 
          onChange={(e) => onChange({ ...data, pillText: e.target.value })}
          className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:border-rose-500 outline-none"
        />
      </div>
      <div>
        <label className="text-[10px] font-black uppercase text-gray-400 block mb-1">Image Alt Tag</label>
        <input 
          value={data.imageAlt} 
          onChange={(e) => onChange({ ...data, imageAlt: e.target.value })}
          className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:border-rose-500 outline-none"
        />
      </div>
    </div>
  </div>
);

export const TrustEditor: React.FC<EditorProps> = ({ data, onChange }) => (
  <div className="space-y-4">
    <div>
      <label className="text-[10px] font-black uppercase text-gray-400 block mb-1">Section Title</label>
      <input 
        value={data.title} 
        onChange={(e) => onChange({ ...data, title: e.target.value })}
        className="w-full p-3 rounded-xl border border-gray-200 text-sm font-bold focus:border-rose-500 outline-none"
      />
    </div>
    <div>
      <label className="text-[10px] font-black uppercase text-gray-400 block mb-1">Description</label>
      <textarea 
        value={data.description} 
        onChange={(e) => onChange({ ...data, description: e.target.value })}
        className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:border-rose-500 outline-none h-24"
      />
    </div>
  </div>
);

export const JsonEditor: React.FC<EditorProps & { label: string; helper?: string }> = ({ data, onChange, label, helper }) => (
  <div>
    <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">{label} (JSON)</label>
    <textarea 
      value={JSON.stringify(data, null, 2)} 
      onChange={(e) => {
        try {
          const parsed = JSON.parse(e.target.value);
          onChange(parsed);
        } catch(err) { /* Allow partial typing */ }
      }}
      className="w-full p-4 bg-slate-900 text-green-400 rounded-xl font-mono text-xs h-64 focus:border-rose-500 outline-none"
    />
    {helper && <p className="text-[10px] text-gray-400 mt-2 italic">{helper}</p>}
  </div>
);

export const AboutEditor: React.FC<EditorProps> = ({ data, onChange }) => (
  <div className="space-y-4">
    <div>
      <label className="text-[10px] font-black uppercase text-gray-400 block mb-1">Section Title</label>
      <input 
        value={data.title || ''} 
        onChange={(e) => onChange({ ...data, title: e.target.value })}
        className="w-full p-3 rounded-xl border border-gray-200 text-sm font-bold focus:border-rose-500 outline-none"
      />
    </div>
    <div className="grid grid-cols-2 gap-4">
       <div>
          <label className="text-[10px] font-black uppercase text-gray-400 block mb-1">Stats Count</label>
          <input 
            value={data.statsCount || ''} 
            onChange={(e) => onChange({ ...data, statsCount: e.target.value })}
            className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:border-rose-500 outline-none"
          />
       </div>
       <div>
          <label className="text-[10px] font-black uppercase text-gray-400 block mb-1">Stats Label</label>
          <input 
            value={data.statsLabel || ''} 
            onChange={(e) => onChange({ ...data, statsLabel: e.target.value })}
            className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:border-rose-500 outline-none"
          />
       </div>
    </div>
    <div>
      <label className="text-[10px] font-black uppercase text-gray-400 block mb-1">Paragraphs (One per line)</label>
      <textarea 
        value={data.paragraphs?.join('\n') || ''} 
        onChange={(e) => onChange({ ...data, paragraphs: e.target.value.split('\n') })}
        className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:border-rose-500 outline-none h-48"
      />
    </div>
  </div>
);