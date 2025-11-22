import Link from 'next/link';
import Image from 'next/image';
import { type ContactData } from './contact.schema';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Icon } from '@/components/Icon';

interface ContactProps {
  data: ContactData;
}

export function Contact({ data }: ContactProps) {
  const { title, subtitle, infoCards, form, footer, styles } = data;

  const defaultStyles = {
    '--section-bg': 'hsl(0 0% 100%)',
    '--section-padding-y': '4rem',
    '--section-text-align': 'center',
    '--grid-gap': '3rem',

    '--info-card-bg': 'transparent',
    '--info-card-padding': '1.5rem',
    '--info-card-radius': '0.5rem',

    '--form-bg': 'transparent',
    '--form-padding': '0',
    '--form-radius': '0',
    '--form-gap': '1rem',

    '--input-bg': 'transparent',
    '--input-border-color': 'hsl(0 0% 90%)',
  };

  const combinedStyles = { ...defaultStyles, ...styles } as React.CSSProperties;

  return (
    <section
      style={combinedStyles}
      className={cn(
        'w-full',
        '[background:var(--section-bg)]',
        'py-[var(--section-padding-y)]',
      )}
    >
      <div className="container mx-auto">
        {/* --- Header --- */}
        {(title || subtitle) && (
          <div
            className={cn(
              'flex flex-col gap-4 mb-12',
              'text-[var(--section-text-align)]',
              'items-[var(--section-text-align)]',
            )}
          >
            {title && (
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{ color: 'var(--title-color)' }}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className="text-lg max-w-2xl mx-auto"
                style={{ color: 'var(--subtitle-color)' }}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* --- Conteúdo Principal (Grid 2 Colunas) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--grid-gap)] items-start">
          {/* Coluna 1: Cards de Informação */}
          {infoCards && (
            <div className="flex flex-col gap-6">
              {infoCards.map((card, index) => {
                // Renderiza como <a> se tiver link, senão como <div>
                const Tag = card.href ? Link : 'div';
                const hrefProps = card.href ? { href: card.href } : {};

                return (
                  <Tag
                    key={index}
                    {...hrefProps}
                    className={cn(
                      'flex items-center gap-4 transition-opacity hover:opacity-90',
                      card.href ? 'cursor-pointer' : '',
                    )}
                    style={{
                      background: 'var(--info-card-bg)',
                      padding: 'var(--info-card-padding)',
                      borderRadius: 'var(--info-card-radius)',
                    }}
                  >
                    {card.icon && (
                      <div className="shrink-0">
                        <Icon
                          name={card.icon}
                          className="w-6 h-6"
                          style={{ color: 'var(--info-icon-color)' }}
                        />
                      </div>
                    )}
                    <div>
                      {card.title && (
                        <h4
                          className="font-bold text-lg"
                          style={{ color: 'var(--info-title-color)' }}
                        >
                          {card.title}
                        </h4>
                      )}
                      {card.text && (
                        <p style={{ color: 'var(--info-text-color)' }}>
                          {card.text}
                        </p>
                      )}
                    </div>
                  </Tag>
                );
              })}
            </div>
          )}

          {/* Coluna 2: Formulário */}
          {form && (
            <div
              className="flex flex-col"
              style={{
                background: 'var(--form-bg)',
                padding: 'var(--form-padding)',
                borderRadius: 'var(--form-radius)',
                gap: 'var(--form-gap)',
              }}
            >
              {/* Campos do Formulário */}
              {[
                { config: form.nameField, type: 'text', id: 'name' },
                { config: form.phoneField, type: 'tel', id: 'phone' },
                { config: form.emailField, type: 'email', id: 'email' },
              ].map((field) =>
                field.config ? (
                  <div key={field.id} className="flex flex-col gap-2">
                    {field.config.label && (
                      <Label
                        htmlFor={field.id}
                        style={{ color: 'var(--label-color)' }}
                      >
                        {field.config.label}
                      </Label>
                    )}
                    <Input
                      id={field.id}
                      type={field.type}
                      placeholder={field.config.placeholder}
                      className="border-0 ring-1 ring-inset"
                      style={
                        {
                          backgroundColor: 'var(--input-bg)',
                          color: 'var(--input-text-color)',
                          '--tw-ring-color': 'var(--input-border-color)',
                        } as React.CSSProperties
                      }
                    />
                  </div>
                ) : null,
              )}

              {/* Textarea para Mensagem */}
              {form.messageField && (
                <div className="flex flex-col gap-2">
                  {form.messageField.label && (
                    <Label
                      htmlFor="message"
                      style={{ color: 'var(--label-color)' }}
                    >
                      {form.messageField.label}
                    </Label>
                  )}
                  <Textarea
                    id="message"
                    placeholder={form.messageField.placeholder}
                    className="min-h-[120px] border-0 ring-1 ring-inset"
                    style={
                      {
                        backgroundColor: 'var(--input-bg)',
                        color: 'var(--input-text-color)',
                        '--tw-ring-color': 'var(--input-border-color)',
                      } as React.CSSProperties
                    }
                  />
                </div>
              )}

              {/* Botão de Enviar */}
              {form.submitButton && (
                <Button
                  variant={form.submitButton.variant}
                  className="mt-2 w-full md:w-auto md:self-start"
                >
                  {form.submitButton.text}
                </Button>
              )}
            </div>
          )}
        </div>

        {/* --- Mini Footer (Logo e Copyright) --- */}
        {footer && (
          <div
            className="mt-16 flex flex-col items-center gap-4 text-center border-t pt-8"
            style={{ borderColor: 'var(--input-border-color)' }}
          >
            {footer.logo && (
              <div className="flex items-center justify-center">
                {footer.logo.type === 'image' && footer.logo.content ? (
                  <Image
                    src={footer.logo.content}
                    alt="Logo"
                    width={footer.logo.width || 100}
                    height={footer.logo.height || 32}
                  />
                ) : (
                  <span
                    className="text-xl font-bold"
                    style={{ color: 'var(--footer-logo-color)' }}
                  >
                    {footer.logo.content}
                  </span>
                )}
              </div>
            )}
            {footer.copyright && (
              <p
                className="text-sm opacity-80"
                style={{ color: 'var(--footer-text-color)' }}
              >
                {footer.copyright}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
