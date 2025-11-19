import Link from 'next/link';
import { type HowItWorksData } from './how-it-works.schema';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/Icon';

interface HowItWorksProps {
  data: HowItWorksData;
}

export function HowItWorks({ data }: HowItWorksProps) {
  const { title, subtitle, steps, cta, styles } = data;

  const defaultStyles = {
    '--section-background': 'hsl(0 0% 100%)',
    '--section-padding-y': '4rem',
    '--section-text-align': 'center',
    '--grid-template-columns': 'repeat(1, 1fr)',
    '--grid-gap': '2rem',
    '--step-card-align': 'center',
    '--number-size': '2.5rem',
    '--number-bg': 'hsl(0 0% 0%)',
    '--number-color': 'hsl(0 0% 100%)',
    '--icon-size': '2rem',
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
        {/* --- Header --- */}
        {(title || subtitle) && (
          <div
            className={cn(
              'flex flex-col gap-4 mb-12',
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

        {/* --- Steps Grid --- */}
        {steps && steps.length > 0 && (
          <div
            className={cn(
              'grid w-full',
              'grid-cols-1', // Mobile-first
              'md:grid-cols-(--grid-template-columns)',
              'gap-(--grid-gap)',
            )}
          >
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col gap-4"
                style={{
                  background: 'var(--step-card-bg)',
                  padding: 'var(--step-card-padding)',
                  borderRadius: 'var(--step-card-radius)',
                  alignItems: 'var(--step-card-align)',
                  // Cast the CSS variable to the proper React style type without using `any`
                  textAlign:
                    'var(--step-card-align)' as unknown as React.CSSProperties['textAlign'],
                }}
              >
                {/* Topo do Card (Número e Ícone) */}
                <div className="flex flex-col items-[var(--step-card-align)] gap-4 mb-2">
                  {/* Número (Badge Circular) */}
                  {step.number && (
                    <div
                      className="flex items-center justify-center font-bold shrink-0"
                      style={{
                        width: 'var(--number-size)',
                        height: 'var(--number-size)',
                        borderRadius: '9999px',
                        backgroundColor: 'var(--number-bg)',
                        color: 'var(--number-color)',
                        fontSize: 'var(--number-font-size, 1rem)',
                      }}
                    >
                      {step.number}
                    </div>
                  )}

                  {/* Ícone */}
                  {step.icon && (
                    <Icon
                      name={step.icon}
                      style={{
                        width: 'var(--icon-size)',
                        height: 'var(--icon-size)',
                        color: 'var(--icon-color)',
                      }}
                    />
                  )}
                </div>

                {/* Textos */}
                {step.title && (
                  <h3
                    className="text-xl font-bold"
                    style={{ color: 'var(--step-title-color)' }}
                  >
                    {step.title}
                  </h3>
                )}
                {step.text && (
                  <p
                    className="text-base"
                    style={{ color: 'var(--step-text-color)' }}
                  >
                    {step.text}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* --- CTA Final --- */}
        {cta && (
          <div className="mt-12">
            <Button variant={cta.variant} asChild size="lg">
              <Link href={cta.href}>{cta.text}</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
