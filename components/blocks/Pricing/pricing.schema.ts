import { z } from 'zod';
import { icons } from 'lucide-react';

// Schema para os botões (isolado)
const CtaSchema = z.object({
  text: z.string(),
  href: z.string(),
  variant: z.enum([
    'default',
    'destructive',
    'outline',
    'secondary',
    'ghost',
    'link',
  ]),
});

// Schema para cada item da lista de benefícios
const BenefitItemSchema = z.object({
  icon: z.custom<keyof typeof icons>(
    (val): val is keyof typeof icons => typeof val === 'string' && val in icons,
  ),
  text: z.string(),
});

// Schema para cada Card de Preço
const PricingCardSchema = z.object({
  // Parte Superior (com a imagem e overlay)
  top: z.object({
    imageUrl: z.string().url(),
    icon: z
      .custom<keyof typeof icons>(
        (val): val is keyof typeof icons =>
          typeof val === 'string' && val in icons,
      )
      .optional(),
    title: z.string().optional(),
    subtitle: z.string().optional(),
  }),
  // Parte Inferior (com os benefícios e CTA)
  bottom: z.object({
    benefits: z.array(BenefitItemSchema).optional(),
    cta: CtaSchema.optional(),
  }),
});

// Schema Principal
export const pricingSchema = z.object({
  // Cabeçalho do Bloco (opcional)
  title: z.string().optional(),
  subtitle: z.string().optional(),

  // Conteúdo (opcional)
  cards: z.array(PricingCardSchema).optional(),

  // Estilos
  styles: z
    .object({
      // --- Estilos da Seção ---
      '--section-background': z.string().optional(),
      '--section-padding-y': z.string().optional(),
      '--section-text-align': z.string().optional(),
      '--section-title-color': z.string().optional(),
      '--section-subtitle-color': z.string().optional(),

      // --- Estilos do Grid ---
      '--grid-template-columns': z.string().optional(),
      '--grid-gap': z.string().optional(),

      // --- Estilos dos Cards ---
      '--card-background': z.string().optional(),
      '--card-border-radius': z.string().optional(),

      // --- Parte Superior (Top) ---
      // A cor do overlay (ex: hsla(0, 0%, 0%, 0.5))
      '--card-top-bg-overlay': z.string().optional(),
      '--card-top-min-height': z.string().optional(),
      '--card-top-padding': z.string().optional(),
      '--card-top-icon-color': z.string().optional(),
      '--card-top-icon-size': z.string().optional(),
      '--card-top-title-color': z.string().optional(),
      '--card-top-subtitle-color': z.string().optional(),

      // --- Parte Inferior (Bottom) ---
      '--card-bottom-padding': z.string().optional(),
      '--benefit-icon-color': z.string().optional(),
      '--benefit-text-color': z.string().optional(),
      '--benefit-icon-size': z.string().optional(),

      // --- Tema dos Botões ---
      '--primary': z.string().optional(),
      '--primary-foreground': z.string().optional(),
    })
    .optional(),
});

// Extrai o tipo
export type PricingData = z.infer<typeof pricingSchema>;
