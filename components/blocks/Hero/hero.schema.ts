import { z } from 'zod';

// Sub-schemas - Repetidos para manter o bloco isolado
const LinkSchema = z.object({
  text: z.string(),
  href: z.string(),
});

const CtaSchema = LinkSchema.extend({
  variant: z.enum([
    'default',
    'destructive',
    'outline',
    'secondary',
    'ghost',
    'link',
  ]),
});

const ImageSchema = z.object({
  src: z.string(),
  alt: z.string(),
  width: z.number(),
  height: z.number(),
});

// Schema Principal do Hero
export const heroSchema = z.object({
  // Conteúdo do Hero - Tudo Opcional
  title: z.string().optional(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  paragraphs: z.array(z.string()).optional(),
  ctas: z.array(CtaSchema).optional(),
  foregroundImage: ImageSchema.optional(),

  // Estilos e Layout
  styles: z
    .object({
      '--hero-background': z.string().optional(),

      // Layout
      '--hero-layout-direction': z.string().optional(),
      '--hero-align-items': z.string().optional(),
      '--hero-justify-content': z.string().optional(),
      '--hero-text-align': z.string().optional(),
      '--hero-content-gap': z.string().optional(),

      // Espaçamento
      '--hero-min-height': z.string().optional(),
      '--hero-padding': z.string().optional(),

      // Cores
      '--hero-title-color': z.string().optional(),
      '--hero-subtitle-color': z.string().optional(),
      '--hero-text-color': z.string().optional(),

      // Overrides do Tema
      '--primary': z.string().optional(),
      '--primary-foreground': z.string().optional(),
    })
    .optional(),
});

export type HeroData = z.infer<typeof heroSchema>;
