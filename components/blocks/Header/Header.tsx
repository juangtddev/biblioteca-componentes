'use client'; // Necessário para o Sheet (menu mobile)

import Link from 'next/link';
import Image from 'next/image';
import { type HeaderData } from './header.schema';
import { cn } from '@/lib/utils'; // Importe o 'cn' do shadcn
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useState } from 'react';

// Componente interno para Links (evita repetição)
const NavLinks = ({ links }: { links: HeaderData['links'] }) => (
  <>
    {links?.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className={cn(
          'text-sm font-medium transition-colors',
          'text-(--link-color,hsl(215_20%_65%)) hover:text-(--link-hover-color,hsl(222_47%_11%))',
        )}
      >
        {link.text}
      </Link>
    ))}
  </>
);

// Componente interno para CTAs (evita repetição)
const CtaButtons = ({ ctas }: { ctas: HeaderData['ctas'] }) => (
  <>
    {ctas?.map((cta) => (
      <Button key={cta.href} variant={cta.variant} asChild>
        <Link href={cta.href}>{cta.text}</Link>
      </Button>
    ))}
  </>
);

// O Template Principal
export function Header({ data }: { data: HeaderData }) {
  const { logo, links, ctas, styles } = data;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fallbacks (valores padrão caso o JSON não forneça)
  const defaultStyles = {
    '--header-bg': 'hsl(0 0% 100%)',
    '--header-fg': 'hsl(222 47% 11%)',
    '--header-border': 'hsl(214 32% 91%)',
    '--header-height': '4rem',
    '--header-padding-x': '2rem',
    // ... adicione todos os fallbacks aqui
  };

  return (
    <header
      // 1. APLICA AS CSS VARIABLES DO JSON
      style={{ ...defaultStyles, ...styles } as React.CSSProperties}
      // 2. USA AS CSS VARIABLES COM TAILWIND
      className={cn(
        'w-full sticky top-0 z-50',
        'h-(--header-height) bg-(--header-bg) text-(--header-fg) border-b border-(--header-border)',
      )}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        {/* --- Logo --- */}
        {logo && (
          <Link href="/" className="flex items-center gap-2">
            {logo.type === 'image' && logo.width && logo.height ? (
              <Image
                src={logo.content}
                alt="Logo"
                width={logo.width}
                height={logo.height}
              />
            ) : (
              <span className="text-lg font-bold">{logo.content}</span>
            )}
          </Link>
        )}

        {/* --- Menu Desktop --- */}
        <nav className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-4">
            <NavLinks links={links} />
          </div>
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <CtaButtons ctas={ctas} />
        </div>

        {/* --- Menu Mobile (Sheet) --- */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw]">
              <nav className="flex flex-col gap-8 p-6 items-center h-full">
                {/* Links Mobile */}
                <div className="flex flex-col gap-6 text-center">
                  <NavLinks links={links} />
                </div>
                {/* CTAs Mobile */}
                <div className="flex flex-col gap-4 w-full mt-auto">
                  <CtaButtons ctas={ctas} />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
