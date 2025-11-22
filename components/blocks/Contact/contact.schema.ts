import { z } from 'zod';
import { icons } from 'lucide-react';

// Schema para os Cards de Informação (Email, Tel, Zap)
const InfoCardSchema = z.object({
  icon: z
    .custom<keyof typeof icons>(
      (val: unknown): val is keyof typeof icons =>
        typeof val === 'string' && val in icons,
    )
    .optional(),
  title: z.string().optional(),
  text: z.string().optional(),
  href: z.string().optional(), // Para tornar o card clicável (ex: mailto: ou wa.me)
});

// Schema para configuração de UM campo do formulário
const FormFieldConfigSchema = z.object({
  label: z.string().optional(),
  placeholder: z.string().optional(),
});

// Schema Principal
export const contactSchema = z.object({
  // Cabeçalho
  title: z.string().optional(),
  subtitle: z.string().optional(),

  // Coluna 1: Cards de Informação
  infoCards: z.array(InfoCardSchema).optional(),

  // Coluna 2: Configuração do Formulário
  form: z
    .object({
      nameField: FormFieldConfigSchema.optional(),
      phoneField: FormFieldConfigSchema.optional(),
      emailField: FormFieldConfigSchema.optional(),
      messageField: FormFieldConfigSchema.optional(),
      submitButton: z
        .object({
          text: z.string(),
          variant: z.enum([
            'default',
            'outline',
            'secondary',
            'ghost',
            'link',
            'destructive',
          ]),
        })
        .optional(),
    })
    .optional(),

  // Rodapé do Bloco (Logo e Copyright)
  footer: z
    .object({
      logo: z
        .object({
          type: z.enum(['text', 'image']),
          content: z.string(),
          width: z.number().optional(),
          height: z.number().optional(),
        })
        .optional(),
      copyright: z.string().optional(),
    })
    .optional(),

  // Estilos
  styles: z
    .object({
      // Seção
      '--section-bg': z.string().optional(),
      '--section-padding-y': z.string().optional(),
      '--section-text-align': z.string().optional(), // Alinhamento do Header
      '--title-color': z.string().optional(),
      '--subtitle-color': z.string().optional(),

      // Grid e Layout
      '--grid-gap': z.string().optional(),

      // Cards de Info
      '--info-card-bg': z.string().optional(),
      '--info-card-padding': z.string().optional(),
      '--info-card-radius': z.string().optional(),
      '--info-icon-color': z.string().optional(),
      '--info-title-color': z.string().optional(),
      '--info-text-color': z.string().optional(),

      // Formulário
      '--form-bg': z.string().optional(),
      '--form-padding': z.string().optional(),
      '--form-radius': z.string().optional(),
      '--form-gap': z.string().optional(),
      '--label-color': z.string().optional(),

      // Inputs do Formulário
      '--input-bg': z.string().optional(),
      '--input-border-color': z.string().optional(),
      '--input-text-color': z.string().optional(),
      '--input-placeholder-color': z.string().optional(),

      // Mini Footer
      '--footer-text-color': z.string().optional(),
      '--footer-logo-color': z.string().optional(),

      // Botão Primário
      '--primary': z.string().optional(),
      '--primary-foreground': z.string().optional(),
    })
    .optional(),
});

export type ContactData = z.infer<typeof contactSchema>;
