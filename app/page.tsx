import { Header } from '@/components/blocks/Header';
import { headerSchema } from '@/components/blocks/Header/header.schema';
import headerData from '@/components/blocks/Header/data.example.json';

export default function Home() {
  // 1. Valida o JSON (segurança em tempo de execução)
  const validatedHeaderData = headerSchema.parse(headerData);

  return (
    <main>
      {/* 2. Renderiza o template com os dados validados */}
      <Header data={validatedHeaderData} />

      {/* Conteúdo de placeholder para testar o 'sticky' */}
      <div className="h-screen bg-gray-100 p-24">
        <h1 className="text-4xl font-bold">Conteúdo da Página</h1>
        <p>Role para baixo...</p>
      </div>
      <div className="h-screen bg-gray-200 p-24">
        <h2 className="text-2xl">Mais conteúdo</h2>
      </div>
    </main>
  );
}
