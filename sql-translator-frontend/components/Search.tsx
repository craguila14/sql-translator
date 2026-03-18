'use client';

interface SearchProps {
  question: string;
  setQuestion: (value: string) => void;
  onSearch: () => void;
  loading: boolean;
}

export default function Search({ 
  question, 
  setQuestion, 
  onSearch, 
  loading 
}: SearchProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100">
      <h2 className="text-lg font-bold mb-4 text-slate-800 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm">
          AI
        </span>
        Consultor de datos
      </h2>
      <div className="flex flex-col md:flex-row gap-3">
        <input 
          type="text"
          className="flex-1 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-slate-700 transition-all"
          placeholder="Ej: ¿Cuál es el promedio de ventas por ciudad?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        />
        <button 
          onClick={onSearch}
          disabled={loading || !question.trim()}
          className="bg-slate-900 hover:bg-black text-white px-8 py-4 rounded-xl font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            'Consultar IA'
          )}
        </button>
      </div>
    </div>
  );
}