import { z } from 'zod';
import { icons } from 'lucide-react';

// Schema para botões (CTA)
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

// Schema para cada "Passo"
const StepCardSchema = z.object({
  number: z.string().optional(), // Ex: "01", "1", "Passo 1"
  icon: z
    .custom<keyof typeof icons>(
      (val): val is keyof typeof icons =>
        typeof val === 'string' && val in icons,
    )
    .optional(),
  title: z.string().optional(),
  text: z.string().optional(),
});

// Schema Principal
export const howItWorksSchema = z.object({
  // Cabeçalho
  title: z.string().optional(),
  subtitle: z.string().optional(),

  // Conteúdo
  steps: z.array(StepCardSchema).optional(),
  cta: CtaSchema.optional(), // CTA final da seção

  // Estilos
  styles: z
    .object({
      // --- Seção ---
      '--section-background': z.string().optional(),
      '--section-padding-y': z.string().optional(),
      '--section-text-align': z.string().optional(),
      '--section-title-color': z.string().optional(),
      '--section-subtitle-color': z.string().optional(),

      // --- Grid ---
      '--grid-template-columns': z.string().optional(),
      '--grid-gap': z.string().optional(),

      // --- Card (Passo) ---
      '--step-card-bg': z.string().optional(),
      '--step-card-padding': z.string().optional(),
      '--step-card-radius': z.string().optional(),
      '--step-card-align': z.string().optional(), // center, left, right

      // --- Elementos do Card ---
      '--number-bg': z.string().optional(),
      '--number-color': z.string().optional(),
      '--number-size': z.string().optional(), // Tamanho da bolinha do número
      '--number-font-size': z.string().optional(),

      '--icon-color': z.string().optional(),
      '--icon-size': z.string().optional(),

      '--step-title-color': z.string().optional(),
      '--step-text-color': z.string().optional(),

      // --- Tema do Botão ---
      '--primary': z.string().optional(),
      '--primary-foreground': z.string().optional(),
    })
    .optional(),
});

export type HowItWorksData = z.infer<typeof howItWorksSchema>;
