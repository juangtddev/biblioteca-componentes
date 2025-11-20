import Link from 'next/link';
import Image from 'next/image';
import { type FooterData } from './footer.schema';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/Icon';

interface FooterProps {
  data: FooterData;
}

export function Footer({ data }: FooterProps) {
  const { brand, nav1, nav2, contact, bottom, styles } = data;

  const defaultStyles = {
    '--footer-bg': 'hsl(0 0% 100%)',
    '--footer-text-color': 'hsl(0 0% 40%)',
    '--footer-title-color': 'hsl(0 0% 0%)',
    '--footer-link-color': 'hsl(0 0% 40%)',
    '--footer-link-hover': 'hsl(0 0% 0%)',
    '--footer-border-color': 'hsl(0 0% 90%)',
    '--footer-padding-y': '3rem',
    '--footer-gap': '2rem',
    '--icon-color': 'currentColor',
  };

  const combinedStyles = { ...defaultStyles, ...styles } as React.CSSProperties;

  return (
    <footer
      style={combinedStyles}
      className={cn(
        'w-full',
        '[background:var(--footer-bg)]',
        'text-(--footer-text-color)',
        'pt-(--footer-padding-y)',
      )}
    >
      <div className="container mx-auto flex flex-col">
        {/* --- Grid de 4 Colunas --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-(--footer-gap) mb-(--footer-padding-y)">
          {/* Coluna 1: Marca */}
          {brand && (
            <div className="flex flex-col gap-4">
              {brand.logo && (
                <Link href="/" className="flex items-center">
                  {brand.logo.type === 'image' && brand.logo.content ? (
                    <Image
                      src={brand.logo.content}
                      alt="Logo"
                      width={brand.logo.width || 120}
                      height={brand.logo.height || 40}
                    />
                  ) : (
                    <span
                      className="text-2xl font-bold"
                      style={{ color: 'var(--footer-title-color)' }}
                    >
                      {brand.logo.content}
                    </span>
                  )}
                </Link>
              )}
              {brand.description && (
                <p className="text-sm leading-relaxed opacity-90">
                  {brand.description}
                </p>
              )}
            </div>
          )}

          {/* Coluna 2: Links Rápidos */}
          {nav1 && (
            <div className="flex flex-col gap-4">
              {nav1.title && (
                <h4
                  className="font-bold text-lg"
                  style={{ color: 'var(--footer-title-color)' }}
                >
                  {nav1.title}
                </h4>
              )}
              {nav1.links && (
                <ul className="flex flex-col gap-2">
                  {nav1.links.map((link, i) => (
                    <li key={i}>
                      <Link
                        href={link.href}
                        className="text-sm transition-colors hover:text-(--footer-link-hover)"
                        style={{ color: 'var(--footer-link-color)' }}
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Coluna 3: Serviços */}
          {nav2 && (
            <div className="flex flex-col gap-4">
              {nav2.title && (
                <h4
                  className="font-bold text-lg"
                  style={{ color: 'var(--footer-title-color)' }}
                >
                  {nav2.title}
                </h4>
              )}
              {nav2.links && (
                <ul className="flex flex-col gap-2">
                  {nav2.links.map((link, i) => (
                    <li key={i}>
                      <Link
                        href={link.href}
                        className="text-sm transition-colors hover:text-(--footer-link-hover)"
                        style={{ color: 'var(--footer-link-color)' }}
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Coluna 4: Contato */}
          {contact && (
            <div className="flex flex-col gap-4">
              {contact.title && (
                <h4
                  className="font-bold text-lg"
                  style={{ color: 'var(--footer-title-color)' }}
                >
                  {contact.title}
                </h4>
              )}
              <ul className="flex flex-col gap-3 text-sm">
                {contact.phone && (
                  <li className="flex items-center gap-2">
                    <Icon
                      name="Phone"
                      className="w-4 h-4 shrink-0"
                      style={{ color: 'var(--icon-color)' }}
                    />
                    <span>{contact.phone}</span>
                  </li>
                )}
                {contact.email && (
                  <li className="flex items-center gap-2">
                    <Icon
                      name="Mail"
                      className="w-4 h-4 shrink-0"
                      style={{ color: 'var(--icon-color)' }}
                    />
                    <span>{contact.email}</span>
                  </li>
                )}
                {contact.address && (
                  <li className="flex items-start gap-2">
                    <Icon
                      name="MapPin"
                      className="w-4 h-4 shrink-0 mt-1"
                      style={{ color: 'var(--icon-color)' }}
                    />
                    <span>{contact.address}</span>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* --- Separador e Copyright --- */}
        {bottom && (
          <div
            className="border-t py-6 text-center md:text-left"
            style={{ borderColor: 'var(--footer-border-color)' }}
          >
            <p className="text-sm opacity-80">{bottom.copyrightText}</p>
          </div>
        )}
      </div>
    </footer>
  );
}
