import Link from 'next/link';
import { type CtaData } from './cta.schema';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/Icon';

interface CtaProps {
  data: CtaData;
}

export function Cta({ data }: CtaProps) {
  const { icon, title, subtitle, buttons, stats, styles } = data;

  const defaultStyles = {
    '--section-bg': 'hsl(0 0% 100%)',
    '--section-padding-y': '4rem',
    '--section-text-align': 'center',
    '--main-icon-size': '3rem',
    '--button-gap': '1rem',
    '--stats-margin-top': '3rem',
    '--stats-gap': '2rem',
  };

  const combinedStyles = { ...defaultStyles, ...styles } as React.CSSProperties;

  return (
    <section
      style={combinedStyles}
      className={cn(
        'w-full',
        '[background:var(--section-bg)]',
        'py-(--section-padding-y)',
      )}
    >
      <div className="container mx-auto flex flex-col items-center">
        {/* --- Bloco Principal --- */}
        <div
          className={cn(
            'flex flex-col gap-6 max-w-3xl',
            'text-(--section-text-align)',
            'items-[var(--section-text-align)]',
          )}
        >
          {/* Ícone Principal */}
          {icon && (
            <Icon
              name={icon}
              style={{
                color: 'var(--main-icon-color)',
                width: 'var(--main-icon-size)',
                height: 'var(--main-icon-size)',
              }}
            />
          )}

          {/* Títulos */}
          <div className="flex flex-col gap-4">
            {title && (
              <h2
                className="text-3xl md:text-5xl font-bold tracking-tight"
                style={{ color: 'var(--title-color)' }}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className="text-lg md:text-xl"
                style={{ color: 'var(--subtitle-color)' }}
              >
                {subtitle}
              </p>
            )}
          </div>

          {/* Botões de Download/Ação */}
          {buttons && buttons.length > 0 && (
            <div
              className="flex flex-wrap items-center justify-center mt-4"
              style={{ gap: 'var(--button-gap)' }}
            >
              {buttons.map((btn, idx) => (
                <Button
                  key={idx}
                  variant={btn.variant}
                  asChild
                  size="lg"
                  className="h-14 px-8 text-lg" // Botões um pouco maiores para CTA
                >
                  <Link href={btn.href} className="flex items-center gap-3">
                    {btn.icon && <Icon name={btn.icon} className="w-6 h-6" />}
                    <span>{btn.text}</span>
                  </Link>
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* --- Lista de Estatísticas / Info (Parte Inferior) --- */}
        {stats && stats.length > 0 && (
          <div
            className="w-full flex flex-wrap justify-center items-center pt-8 border-t"
            style={{
              marginTop: 'var(--stats-margin-top)',
              gap: 'var(--stats-gap)',
              borderColor: 'var(--stats-divider-color, transparent)', // Linha opcional
            }}
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="flex items-center gap-3">
                {stat.icon && (
                  <Icon
                    name={stat.icon}
                    className="w-5 h-5"
                    style={{ color: 'var(--stats-icon-color)' }}
                  />
                )}
                <span
                  className="font-medium text-sm md:text-base"
                  style={{ color: 'var(--stats-text-color)' }}
                >
                  {stat.text}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
