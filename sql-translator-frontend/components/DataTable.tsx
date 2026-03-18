'use client';

interface DataTableProps {
  data: any[];
}

export default function DataTable({ data }: DataTableProps) {
  // Extraemos las llaves del primer objeto para las cabeceras
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-700">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-200">
              {headers.map((key) => (
                <th 
                  key={key} 
                  className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest"
                >
                  {key.replace('_', ' ')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-blue-50/30 transition-colors group">
                {Object.values(row).map((val: any, j) => (
                  <td 
                    key={j} 
                    className="px-6 py-4 text-sm text-slate-600 font-medium group-hover:text-blue-700"
                  >
                    {val?.toString() || '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Estado vacío */}
        {data.length === 0 && (
          <div className="flex flex-col items-center justify-center p-12 text-slate-400 space-y-2">
            <svg 
              className="w-12 h-12 opacity-20" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <p className="text-sm font-medium">No se encontraron registros para esta consulta.</p>
          </div>
        )}
      </div>
    </div>
  );
}