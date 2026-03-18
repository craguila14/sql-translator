'use client';

interface TableExplorerProps {
  tables: string[];
  activeTable: string | null;
  onTableSelect: (tableName: string) => void;
}

export default function TableExplorer({ 
  tables, 
  activeTable, 
  onTableSelect 
}: TableExplorerProps) {
  return (
    <div className="flex flex-col space-y-3">
      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
        Explorar estructura de datos
      </span>
      <div className="flex flex-wrap gap-3">
        {tables.map((table) => (
          <button
            key={table}
            onClick={() => onTableSelect(table)}
            className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all capitalize ${
              activeTable === table 
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200' 
                : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-600'
            }`}
          >
            {table}
          </button>
        ))}
      </div>
    </div>
  );
}