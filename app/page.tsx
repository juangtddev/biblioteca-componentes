import { Header } from '@/components/blocks/Header';
import { headerSchema } from '@/components/blocks/Header/header.schema';
import headerData from '@/components/blocks/Header/data.example.json';

// 1. Importar o Hero
import { Hero } from '@/components/blocks/Hero';
import { heroSchema } from '@/components/blocks/Hero/hero.schema';
import heroData from '@/components/blocks/Hero/data.example.json';

export default function Home() {
  // 2. Validar os dados de ambos
  const validatedHeaderData = headerSchema.parse(headerData);
  const validatedHeroData = heroSchema.parse(heroData);

  return (
    <main>
      {/* 3. Renderizar ambos */}
      <Header data={validatedHeaderData} />
      <Hero data={validatedHeroData} />

      {/* Conteúdo de placeholder */}
      <div className="h-screen bg-gray-100 p-24">
        <h1 className="text-4xl font-bold">Conteúdo Restante</h1>
      </div>
    </main>
  );
}
