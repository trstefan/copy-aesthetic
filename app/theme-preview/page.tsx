'use client';

import React, { useState } from 'react';
import { THEMES } from '../../constants';
import { Theme } from '../../types';
import MockUI from '../../components/MockUI';
import { Copy, Check, Smartphone, Monitor, ArrowLeft, Layers, Terminal, ChevronDown, ChevronUp } from 'lucide-react';

const ThemePreview = () => {
  const [activeTheme, setActiveTheme] = useState<Theme>(THEMES[0]);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isPromptOpen, setIsPromptOpen] = useState(false);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleBack = () => {
    window.location.href = '/';
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* Header */}
      <header className="flex-none bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-20 shadow-sm">
        <div className="flex items-center gap-4">
            <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-slate-500">
                <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Copy Aesthetic
            </h1>
        </div>
        
        <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
            <button 
                onClick={() => setViewMode('desktop')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'desktop' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <Monitor size={16} /> Desktop
            </button>
            <button 
                onClick={() => setViewMode('mobile')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'mobile' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <Smartphone size={16} /> Mobile
            </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar / Theme List */}
          <aside className="w-[400px] flex-none bg-white border-r border-gray-200 flex flex-col overflow-hidden z-10 shadow-xl">
            {/* Theme List Section */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2 px-2">
                    <Layers size={14} /> Select Theme
                </h2>
                <div className="space-y-3">
                    {THEMES.map((theme) => (
                        <button
                            key={theme.id}
                            onClick={() => setActiveTheme(theme)}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all group relative overflow-hidden ${
                                activeTheme.id === theme.id 
                                ? 'border-blue-500 bg-blue-50/50 shadow-md' 
                                : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                            }`}
                        >
                            <div className="relative z-10">
                                <div className="flex justify-between items-start">
                                    <div className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors text-lg">
                                        {theme.name}
                                    </div>
                                    {activeTheme.id === theme.id && (
                                        <div className="text-blue-500 bg-white rounded-full p-0.5 shadow-sm">
                                            <Check size={14} strokeWidth={3} />
                                        </div>
                                    )}
                                </div>
                                <div className="text-sm text-slate-500 mt-1 leading-relaxed">
                                    {theme.description}
                                </div>
                            </div>
                            
                            {/* Color Dots Preview */}
                            <div className="flex gap-2 mt-4 relative z-10">
                                <div className="w-6 h-6 rounded-full border border-gray-200 shadow-sm" style={{background: theme.colors.bgPrimary}} title="Background"></div>
                                <div className="w-6 h-6 rounded-full border border-gray-200 shadow-sm" style={{background: theme.colors.accent}} title="Accent"></div>
                                <div className="w-6 h-6 rounded-full border border-gray-200 shadow-sm" style={{background: theme.colors.textPrimary}} title="Text"></div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Prompt Area in Sidebar (Collapsible) */}
            <div className="flex-none bg-slate-900 text-white border-t border-slate-800 shadow-[0_-10px_40px_rgba(0,0,0,0.2)] z-20 transition-all duration-300">
                 {/* Toggle Header */}
                 <button 
                    onClick={() => setIsPromptOpen(!isPromptOpen)}
                    className="w-full flex items-center justify-between p-4 hover:bg-slate-800/50 transition-colors focus:outline-none group cursor-pointer"
                 >
                    <div className="flex items-center gap-2">
                        <Terminal size={16} className="text-blue-400" /> 
                        <span className="text-sm font-bold text-blue-400 uppercase tracking-wider">Prompt Engine</span>
                        {!isPromptOpen && <span className="text-xs text-slate-500 ml-2 font-normal normal-case opacity-0 group-hover:opacity-100 transition-opacity">Click to expand</span>}
                    </div>
                    {isPromptOpen ? <ChevronDown size={18} className="text-slate-400 group-hover:text-white" /> : <ChevronUp size={18} className="text-slate-400 group-hover:text-white" />}
                </button>

                {isPromptOpen && (
                    <div className="px-5 pb-5 space-y-4 max-h-[45vh] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-track]:bg-transparent animate-in slide-in-from-bottom-2 fade-in duration-200">
                        
                        {/* Short Prompt Card */}
                        <div className="group relative bg-slate-800 rounded-lg p-3 border border-slate-700 hover:border-slate-500 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-semibold text-slate-400">Concept</span>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); handleCopy(activeTheme.promptShort, 'short'); }}
                                    className="text-slate-500 hover:text-white transition-colors"
                                    title="Copy short prompt"
                                >
                                    {copiedId === 'short' ? <Check size={14} className="text-green-400"/> : <Copy size={14} />}
                                </button>
                            </div>
                            <p className="text-sm text-slate-200 font-mono leading-relaxed select-text">
                                {activeTheme.promptShort}
                            </p>
                        </div>

                        {/* Long Prompt Card */}
                        <div className="group relative bg-slate-800 rounded-lg p-3 border border-slate-700 hover:border-slate-500 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-semibold text-slate-400">Detailed Spec</span>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); handleCopy(activeTheme.promptLong, 'long'); }}
                                    className="text-slate-500 hover:text-white transition-colors"
                                    title="Copy detailed prompt"
                                >
                                     {copiedId === 'long' ? <Check size={14} className="text-green-400"/> : <Copy size={14} />}
                                </button>
                            </div>
                            <p className="text-xs text-slate-400 font-mono leading-relaxed select-text opacity-90">
                                {activeTheme.promptLong}
                            </p>
                        </div>

                       
                    </div>
                )}
            </div>
        </aside>

        {/* Main Preview Area */}
        <main className="flex-1 bg-gray-100/50 p-8 flex items-center justify-center overflow-auto relative">
             <div className="absolute inset-0 z-0 opacity-5" style={{
                 backgroundImage: 'radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)',
                 backgroundSize: '24px 24px'
             }}></div>

             <div className={`transition-all duration-500 ease-in-out z-10 ${viewMode === 'mobile' ? 'scale-100' : 'w-full max-w-5xl h-[80vh]'}`}>
                 <MockUI theme={activeTheme} isMobile={viewMode === 'mobile'} />
             </div>
        </main>
      </div>
    </div>
  );
};

export default ThemePreview;
