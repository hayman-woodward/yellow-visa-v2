import { menuData } from './data';
import type { VistoSummary } from '@/lib/actions/vistos';
import DropdownMenu from './DropdownMenu';

interface VistosDestinosMenuProps {
  children: React.ReactNode;
  className?: string;
  vistos?: VistoSummary[];
}

export default function VistosDestinosMenu({
  children,
  className = '',
  vistos
}: VistosDestinosMenuProps) {
  const dynamicColumns = (() => {
    if (!vistos || vistos.length === 0) return menuData.vistosDestinos;
    const firstColumn = menuData.vistosDestinos[0];
    const otherColumns = menuData.vistosDestinos.slice(1);
    // Divide por país na mesma coluna com subtítulos
    const vistosUSA = vistos.filter(v => v.country.toLowerCase().includes('eua') || v.country.toLowerCase().includes('estados unidos'));
    const vistosPT = vistos.filter(v => v.country.toLowerCase().includes('portugal'));
    const dynamicFirst = {
      ...firstColumn,
      items: [
        { id: 'heading-usa', label: 'Estados Unidos', isHeading: true },
        ...vistosUSA.map((v) => ({ id: v.slug, label: v.label, href: `/vistos/${v.slug}` })),
        { id: 'heading-pt', label: 'Portugal', isHeading: true },
        ...vistosPT.map((v) => ({ id: v.slug, label: v.label, href: `/vistos/${v.slug}` }))
      ]
    };
    return [dynamicFirst, ...otherColumns];
  })();

  return (
    <DropdownMenu
      trigger={children}
      columns={dynamicColumns}
      className={className}
    />
  );
}
