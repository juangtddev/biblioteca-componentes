import Link from 'next/link';
import { type PricingData } from './pricing.schema';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/Icon'; // Reutilizamos nosso helper

// Propriedades
interface PricingProps {
  data: PricingData;
}

export function Pricing({ data }: PricingProps) {
  const { title, subtitle, cards, styles } = data;

  // Fallbacks
  const defaultStyles = {
    '--section-background': 'hsl(0 0% 100%)',
    '--section-padding-y': '4rem',
    '--section-text-align': 'left',
    '--grid-template-columns': 'repeat(1, 1fr)',
    '--grid-gap': '1.5rem',
    '--card-background': 'hsl(0 0% 100%)',
    '--card-border-radius': '0.5rem',
    '--card-top-bg-overlay': 'hsla(0, 0%, 0%, 0.5)',
    '--card-top-min-height': '150px',
    '--card-top-padding': '1rem',
    '--card-bottom-padding': '1rem',
    '--benefit-icon-size': '1rem',
  };

  const combinedStyles = { ...defaultStyles, ...styles } as React.CSSProperties;

  return (
    <section
      style={combinedStyles}
      className={cn(
        'w-full',
        '[background:var(--section-background)]',
        'py-(--section-padding-y)',
      )}
    >
      <div className="container mx-auto flex flex-col items-center">
        {/* --- Cabeçalho do Bloco --- */}
        {(title || subtitle) && (
          <div
            className={cn(
              'flex flex-col gap-4',
              'text-(--section-text-align)',
              'items-[var(--section-text-align)]',
            )}
          >
            {title && (
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{ color: 'var(--section-title-color)' }}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className="text-lg max-w-2xl"
                style={{ color: 'var(--section-subtitle-color)' }}
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
              'grid-cols-1', // Mobile-first
              'md:grid-cols-(--grid-template-columns)',
              'gap-(--grid-gap)',
            )}
          >
            {cards.map((card, index) => (
              <div
                key={index}
                // O 'group' é essencial para o hover
                className="group shadow-md"
                style={{
                  background: 'var(--card-background)',
                  borderRadius: 'var(--card-border-radius)',
                  overflow: 'hidden', // Importante para o border-radius
                }}
              >
                {/* === PARTE SUPERIOR === */}
                <div
                  className="relative flex flex-col justify-end bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${card.top.imageUrl})`,
                    minHeight: 'var(--card-top-min-height)',
                    padding: 'var(--card-top-padding)',
                  }}
                >
                  {/* O OVERLAY */}
                  <div
                    className={cn(
                      'absolute inset-0',
                      'bg-(--card-top-bg-overlay)', // Cor do overlay
                      'transition-opacity duration-300',
                      'group-hover:opacity-0', // Mágica do hover
                    )}
                  />

                  {/* Conteúdo (em cima do overlay) */}
                  <div className="relative z-10">
                    {card.top.icon && (
                      <Icon
                        name={card.top.icon}
                        style={{
                          color: 'var(--card-top-icon-color)',
                          width: 'var(--card-top-icon-size)',
                          height: 'var(--card-top-icon-size)',
                        }}
                        className="mb-2"
                      />
                    )}
                    {card.top.title && (
                      <h3
                        className="text-2xl font-bold"
                        style={{ color: 'var(--card-top-title-color)' }}
                      >
                        {card.top.title}
                      </h3>
                    )}
                    {card.top.subtitle && (
                      <p
                        className="text-sm"
                        style={{ color: 'var(--card-top-subtitle-color)' }}
                      >
                        {card.top.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                {/* === PARTE INFERIOR === */}
                <div
                  className="flex flex-col gap-4"
                  style={{ padding: 'var(--card-bottom-padding)' }}
                >
                  {/* Lista de Benefícios */}
                  {card.bottom.benefits && (
                    <ul className="flex flex-col gap-2">
                      {card.bottom.benefits.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Icon
                            name={item.icon}
                            style={{
                              color: 'var(--benefit-icon-color)',
                              width: 'var(--benefit-icon-size)',
                              height: 'var(--benefit-icon-size)',
                            }}
                            className="shrink-0"
                          />
                          <span style={{ color: 'var(--benefit-text-color)' }}>
                            {item.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {/* Botão CTA */}
                  {card.bottom.cta && (
                    <Button
                      variant={card.bottom.cta.variant}
                      asChild
                      className="mt-4 w-full"
                    >
                      <Link href={card.bottom.cta.href}>
                        {card.bottom.cta.text}
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
