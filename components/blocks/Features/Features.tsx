import Link from 'next/link';
import { type FeaturesData } from './features.schema';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/Icon'; // Importa nosso helper

// Propriedades
interface FeaturesProps {
  data: FeaturesData;
}

export function Features({ data }: FeaturesProps) {
  const { title, subtitle, cards, ctas, styles } = data;

  // Fallbacks
  const defaultStyles = {
    '--features-background': 'hsl(0 0% 100%)',
    '--features-padding-y': '4rem',
    '--features-text-align': 'left',
    '--features-grid-template-columns': 'repeat(1, 1fr)',
    '--features-grid-gap': '1.5rem',
    '--card-padding': '1.5rem',
    '--card-icon-size': '1.5rem',
  };

  const combinedStyles = { ...defaultStyles, ...styles } as React.CSSProperties;

  return (
    <section
      style={combinedStyles}
      className={cn(
        'w-full',
        '[background:var(--features-background)]',
        'py-(--features-padding-y)',
      )}
    >
      <div className="container mx-auto flex flex-col items-center">
        {/* --- Cabeçalho do Bloco --- */}
        {(title || subtitle) && (
          <div
            className={cn(
              'flex flex-col gap-4',
              'text-(--features-text-align)',
              // Centraliza o container do cabeçalho
              'items-[var(--features-text-align)]',
            )}
          >
            {title && (
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{ color: 'var(--features-title-color)' }}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className="text-lg max-w-2xl"
                style={{ color: 'var(--features-subtitle-color)' }}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* --- Grid de Cards --- */}
        {cards && cards.length > 0 && (
          <div
            className={cn(
              'grid w-full mt-12',
              // Mobile-first: 1 coluna
              'grid-cols-1',
              // Desktop: usa a variável do JSON
              'md:grid-cols-(--features-grid-template-columns)',
              'gap-(--features-grid-gap)',
            )}
          >
            {cards.map((card, index) => (
              <div
                key={index}
                className="flex flex-col"
                style={{
                  background: 'var(--card-background)',
                  padding: 'var(--card-padding)',
                  borderRadius: 'var(--card-border-radius)',
                  textAlign: 'var(--card-text-align)' as 'left' | 'center',
                }}
              >
                {card.icon && (
                  <Icon
                    name={card.icon}
                    style={{
                      color: 'var(--card-icon-color)',
                      width: 'var(--card-icon-size)',
                      height: 'var(--card-icon-size)',
                    }}
                    className="mb-4"
                  />
                )}
                {card.title && (
                  <h3
                    className="text-xl font-semibold"
                    style={{ color: 'var(--card-title-color)' }}
                  >
                    {card.title}
                  </h3>
                )}
                {card.text && (
                  <p
                    className="text-base mt-2"
                    style={{ color: 'var(--card-text-color)' }}
                  >
                    {card.text}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* --- CTAs do Bloco --- */}
        {ctas && ctas.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-12">
            {ctas.map((cta, index) => (
              <Button key={index} variant={cta.variant} asChild>
                <Link href={cta.href}>{cta.text}</Link>
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
