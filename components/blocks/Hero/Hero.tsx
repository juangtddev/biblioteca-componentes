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
    '--hero-padding': '4rem 2rem',
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
      // 1. Aplica as CSS Variables
      style={combinedStyles}
      // 2. Usa as CSS Variables com Tailwind
      className={cn(
        'w-full flex',
        'min-h-(--hero-min-height)',
        'p-(--hero-padding)',
        'bg-(--hero-background)', // Usa a super-propriedade 'background'
        'flex-(--hero-layout-direction)', // 'flex-col' ou 'flex-row'
        'items-[var(--hero-align-items)]', // 'items-center'
        'justify-[var(--hero-justify-content)]', // 'justify-center'
        'text-(--hero-text-align)', // 'text-center'
      )}
    >
      {/* Container de Conteúdo (Texto) */}
      <div className="flex flex-col gap-(--hero-content-gap)">
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
              key={idx}
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
              'justify-[var(--hero-align-items)]', // Reusa o align para os botões
            )}
          >
            {ctas.map((cta) => (
              <Button key={cta.href} variant={cta.variant} asChild>
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
    </section>
  );
}
