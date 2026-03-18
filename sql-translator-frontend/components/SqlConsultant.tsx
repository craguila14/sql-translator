'use client';

const API_URL = process.env.NEXT_PUBLIC_API_URL;


import { useState } from 'react';
import TableExplorer from './TableExplorer';
import Search from './Search';
import SqlViewer from './SqlViewer';
import DataTable from './DataTable';

export default function SqlConsultant() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTable, setActiveTable] = useState<string | null>(null);

  const [cache, setCache] = useState<{ [key: string]: any }>({});

  const tables = ['productos', 'clientes', 'ventas'];

  const handleAiQuery = async () => {
    if (!question.trim()) return;
    
    setLoading(true);
    setActiveTable(null);
    try {
      const res = await fetch(`${API_URL}/queries/translate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error en la consulta IA", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTablePreview = async (tableName: string) => {
    setActiveTable(tableName);
    setQuestion('');

    if (cache[tableName]) {
      setResponse(cache[tableName]);
      return; 
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/queries/table/${tableName}`);
      const data = await res.json();
      
      const newResponse = { 
        data, 
        sql: `SELECT * FROM ${tableName} LIMIT 20;`,
        isPreview: true 
      };

      setResponse(newResponse);
      setCache(prev => ({ 
        ...prev, 
        [tableName]: newResponse 
      }));
      
    } catch (error) {
      console.error("Error explorando tabla", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      
      {/* 1. EXPLORADOR DE TABLAS (Usa caché para navegación instantánea) */}
      <TableExplorer 
        tables={tables} 
        activeTable={activeTable} 
        onTableSelect={fetchTablePreview} 
      />      

      {/* 2. BUSCADOR INTELIGENTE */}
      <Search 
        question={question}
        setQuestion={setQuestion}
        onSearch={handleAiQuery}
        loading={loading}
      />

      {/* 3. ZONA DE RESULTADOS */}
      {response && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* SQL Info Card */}
          <SqlViewer 
            sql={response.sql} 
            isPreview={response.isPreview} 
          />

          {/* Tabla de Datos */}
          <DataTable 
            data={response.data} 
          />
        </div>
      )}
    </div>
  );
}