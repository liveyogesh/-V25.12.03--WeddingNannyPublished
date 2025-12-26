
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      
      return (
        <div className="p-8 text-center bg-rose-50 dark:bg-slate-900 rounded-xl my-8 border border-rose-200">
          <h3 className="text-xl font-bold text-navy-gemini dark:text-white mb-2">Something went wrong</h3>
          <p className="text-sm text-gray-500 mb-4">We couldn't load this section. Please try refreshing.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-rose-500 text-white rounded-full text-sm font-bold"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
