import { icons } from 'lucide-react';

// Tipa a props para aceitar qualquer chave de 'icons'
interface IconProps extends React.ComponentPropsWithoutRef<'svg'> {
  name: keyof typeof icons;
}

/**
 * Componente que renderiza um ícone do 'lucide-react' dinamicamente
 * pelo nome.
 */
export const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = icons[name];

  if (!LucideIcon) {
    console.warn(`Ícone "${name}" não encontrado em lucide-react.`);
    return null; // Ou retorne um ícone padrão
  }

  return <LucideIcon {...props} />;
};
