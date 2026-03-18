'use client';

interface SqlViewerProps {
  sql: string;
  isPreview?: boolean;
}

export default function SqlViewer({ sql, isPreview }: SqlViewerProps) {
  return (
    <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Barra superior estilo ventana de código */}
      <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
          {isPreview ? 'Vista Previa de Tabla' : 'Motor SQL Gemini AI'}
        </span>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-amber-500/50" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
        </div>
      </div>

      {/* Contenido del SQL */}
      <div className="p-5 overflow-x-auto">
        <code className="text-blue-300 font-mono text-sm leading-relaxed break-words">
          {sql}
        </code>
      </div>
    </div>
  );
}