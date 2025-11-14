import { z } from 'zod';

// Sub-Schemas
const LinkSchema = z.object({
  text: z.string(),
  href: z.string(),
});

const CtaSchema = LinkSchema.extend({
  // Pega as variantes do seu shadcn/ui Button
  variant: z.enum([
    'default',
    'destructive',
    'outline',
    'secondary',
    'ghost',
    'link',
  ]),
});

const LogoSchema = z.object({
  type: z.enum(['image', 'text']),
  content: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
});

// Schema Principal
export const headerSchema = z.object({
  logo: LogoSchema,
  links: z.array(LinkSchema).optional(),
  ctas: z.array(CtaSchema).optional(),

  // O "Tema" dinâmico via CSS Variables - Valores opcionais  (Tailwind usará fallbacks)
  styles: z
    .object({
      // Cores em HSL
      '--header-bg': z.string().optional(),
      '--header-fg': z.string().optional(),
      '--header-border': z.string().optional(),

      '--link-color': z.string().optional(),
      '--link-hover-color': z.string().optional(),

      // Sobreposição de tema do shadcn/ui
      '--primary': z.string().optional(),
      '--primary-foreground': z.string().optional(),
      '--secondary': z.string().optional(),
      '--secondary-foreground': z.string().optional(),

      // Tamanhos
      '--header-height': z.string().optional(),
      '--header-padding-x': z.string().optional(),
    })
    .optional(),
});

export type HeaderData = z.infer<typeof headerSchema>;
