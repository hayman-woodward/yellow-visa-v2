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
    const dynamicFirst = {
      ...firstColumn,
      items: vistos.map((v) => ({ id: v.slug, label: v.label, href: `/vistos/${v.slug}` }))
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
