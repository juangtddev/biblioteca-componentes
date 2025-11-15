import Link from 'next/link';
import Image from 'next/image';
import { type HeroData } from './hero.schema';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Propriedades que o componente Hero aceita
interface HeroProps {
  data: HeroData;
}

export function Hero({ data }: HeroProps) {
  const { title, subtitle, paragraphs, ctas, foregroundImage, styles } = data;

  // Fallbacks (valores padrão)
  const defaultStyles = {
    '--hero-background': 'hsl(0 0% 100%)',
    '--hero-min-height': '50vh',
    '--hero-padding-y': '4rem',
    '--hero-padding-x': '1rem',
    '--hero-layout-direction': 'column',
    '--hero-align-items': 'center',
    '--hero-justify-content': 'center',
    '--hero-text-align': 'center',
    '--hero-content-gap': '1.5rem',
    '--hero-title-color': 'hsl(0 0% 0%)',
    '--hero-text-color': 'hsl(0 0% 30%)',
  };

  // Combina fallbacks com estilos do JSON
  const combinedStyles = { ...defaultStyles, ...styles } as React.CSSProperties;

  return (
    <section
      // 1. O <section> (RAIZ) cuida do fundo e altura
      style={combinedStyles}
      className={cn(
        'w-full',
        'bg-(--hero-background)',
        'min-h-(--hero-min-height)',
        // Aplicamos o padding vertical aqui
        'py-(--hero-padding-y,4rem)',
      )}
    >
      {/* 2. O <div> (INTERNO) cuida do container e do layout flex */}
      <div
        className={cn(
          'container mx-auto h-full flex', // Limita a largura!

          // --- MOBILE-FIRST (Padrão) ---
          'flex-col items-center justify-center text-center gap-8',

          // --- DESKTOP (Vem do JSON) ---
          'md:flex-(--hero-layout-direction,row)',
          'md:items-(--hero-align-items,center)',
          'md:justify-(--hero-justify-content,space-between)',
          'md:gap-(--hero-content-gap,2rem)',
          // Aplicamos o padding horizontal aqui
          'px-(--hero-padding-x,1rem)',
        )}
      >
        {/* Container de Conteúdo (Texto) */}
        <div
          className={cn(
            'flex flex-col',
            // Correção do TypeScript: usar 'gap' do Tailwind com a variável
            'gap-(--hero-content-gap,1.5rem)',
            // Alinhamento do conteúdo de texto (mobile-first)
            'items-center text-center',
            // Alinhamento Desktop (do JSON)
            'md:items-(--hero-text-align,flex-start)',
            'md:text-(--hero-text-align,left)',
          )}
        >
          {title && (
            <h1
              className="text-4xl md:text-6xl font-bold"
              style={{ color: 'var(--hero-title-color)' }}
            >
              {title}
            </h1>
          )}
          {subtitle && (
            <p
              className="text-lg md:text-xl"
              style={{
                color: 'var(--hero-subtitle-color, var(--hero-text-color))',
              }}
            >
              {subtitle}
            </p>
          )}
          {paragraphs &&
            paragraphs.map((p, idx) => (
              <p
                key={idx} // Usar 'idx' para a key dos parágrafos
                className="text-base"
                style={{ color: 'var(--hero-text-color)' }}
              >
                {p}
              </p>
            ))}
          {ctas && ctas.length > 0 && (
            <div
              className={cn(
                'flex flex-wrap gap-4',
                // Alinhamento dos botões (mobile-first)
                'justify-center',
                // Alinhamento Desktop (do JSON)
                'md:justify-[var(--hero-text-align,flex-start)]',
              )}
            >
              {ctas.map((cta, index) => (
                <Button
                  key={index} // Correção da Key: Usar 'index' para garantir unicidade
                  variant={cta.variant}
                  asChild
                >
                  <Link href={cta.href}>{cta.text}</Link>
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Container de Imagem (Opcional) */}
        {foregroundImage && (
          <div className="shrink-0">
            <Image
              src={foregroundImage.src}
              alt={foregroundImage.alt}
              width={foregroundImage.width}
              height={foregroundImage.height}
              className="rounded-lg object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
