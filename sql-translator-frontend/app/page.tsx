import SqlConsultant from '@/components/SqlConsultant';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900">AI Data Explorer</h1>
        <p className="text-slate-500 mt-2">Transforma el lenguaje natural a peticiones SQL</p>
      </div>
      
      <SqlConsultant />
    </main>
  );
}