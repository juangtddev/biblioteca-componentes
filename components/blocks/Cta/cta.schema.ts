import { z } from 'zod';
import { icons } from 'lucide-react';

// Schema para Botões (com Ícone opcional)
const CtaButtonSchema = z.object({
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
  // Ícone dentro do botão (ex: Apple, Play)
  icon: z
    .custom<keyof typeof icons>(
      (val): val is keyof typeof icons =>
        typeof val === 'string' && val in icons,
    )
    .optional(),
});

// Schema para os itens da lista inferior (Stats/Info)
const StatItemSchema = z.object({
  icon: z
    .custom<keyof typeof icons>(
      (val): val is keyof typeof icons =>
        typeof val === 'string' && val in icons,
    )
    .optional(),
  text: z.string(),
});

export const ctaSchema = z.object({
  // Conteúdo Principal
  icon: z
    .custom<keyof typeof icons>(
      (val): val is keyof typeof icons =>
        typeof val === 'string' && val in icons,
    )
    .optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),

  // Botões de Ação
  buttons: z.array(CtaButtonSchema).optional(),

  // Lista Inferior (Stats)
  stats: z.array(StatItemSchema).optional(),

  // Estilos
  styles: z
    .object({
      // --- Seção Geral ---
      '--section-bg': z.string().optional(),
      '--section-padding-y': z.string().optional(),
      '--section-text-align': z.string().optional(),

      // --- Tipografia e Cores ---
      '--main-icon-color': z.string().optional(),
      '--main-icon-size': z.string().optional(),
      '--title-color': z.string().optional(),
      '--subtitle-color': z.string().optional(),

      // --- Botões ---
      '--button-gap': z.string().optional(), // Espaço entre os botões

      // --- Lista Inferior (Stats) ---
      '--stats-margin-top': z.string().optional(),
      '--stats-gap': z.string().optional(),
      '--stats-icon-color': z.string().optional(),
      '--stats-text-color': z.string().optional(),
      '--stats-divider-color': z.string().optional(), // Cor da linha separadora (se houver)

      // --- Tema ---
      '--primary': z.string().optional(),
      '--primary-foreground': z.string().optional(),
    })
    .optional(),
});

export type CtaData = z.infer<typeof ctaSchema>;
