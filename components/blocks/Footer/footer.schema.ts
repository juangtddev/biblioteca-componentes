import { z } from 'zod';

// Schema de Link Simples
const LinkItemSchema = z.object({
  text: z.string(),
  href: z.string(),
});

// Schema Principal
export const footerSchema = z.object({
  // Coluna 1: Marca
  brand: z
    .object({
      logo: z
        .object({
          type: z.enum(['text', 'image']),
          content: z.string(),
          width: z.number().optional(),
          height: z.number().optional(),
        })
        .optional(),
      description: z.string().optional(),
    })
    .optional(),

  // Coluna 2: Links Rápidos
  nav1: z
    .object({
      title: z.string().optional(),
      links: z.array(LinkItemSchema).optional(),
    })
    .optional(),

  // Coluna 3: Serviços
  nav2: z
    .object({
      title: z.string().optional(),
      links: z.array(LinkItemSchema).optional(),
    })
    .optional(),

  // Coluna 4: Contato
  contact: z
    .object({
      title: z.string().optional(),
      phone: z.string().optional(),
      email: z.string().optional(),
      address: z.string().optional(),
    })
    .optional(),

  // Barra Inferior
  bottom: z
    .object({
      copyrightText: z.string().optional(),
    })
    .optional(),

  // Estilos
  styles: z
    .object({
      // Background e Cores Gerais
      '--footer-bg': z.string().optional(),
      '--footer-text-color': z.string().optional(),
      '--footer-title-color': z.string().optional(),
      '--footer-link-color': z.string().optional(),
      '--footer-link-hover': z.string().optional(),
      '--footer-border-color': z.string().optional(), // Para o separador

      // Espaçamentos
      '--footer-padding-y': z.string().optional(),
      '--footer-gap': z.string().optional(),

      // Ícones de Contato
      '--icon-color': z.string().optional(),
    })
    .optional(),
});

export type FooterData = z.infer<typeof footerSchema>;
