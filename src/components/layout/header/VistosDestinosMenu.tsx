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
    
    // Separar vistos por país
    const vistosEUA = vistos.filter(v => v.country === 'Estados Unidos');
    const vistosPortugal = vistos.filter(v => v.country === 'Portugal');
    
    // Criar uma única coluna com todos os vistos organizados
    const allItems = [];
    
    // Adicionar vistos dos Estados Unidos
    if (vistosEUA.length > 0) {
      allItems.push({
        id: 'subtitle-eua',
        label: 'Estados Unidos',
        href: '#',
        isSubtitle: true
      });
      vistosEUA.forEach(v => {
        allItems.push({
          id: v.slug,
          label: v.label,
          href: `/vistos/${v.slug}`
        });
      });
    }
    
    // Adicionar vistos de Portugal
    if (vistosPortugal.length > 0) {
      allItems.push({
        id: 'subtitle-portugal',
        label: 'Portugal',
        href: '#',
        isSubtitle: true
      });
      vistosPortugal.forEach(v => {
        allItems.push({
          id: v.slug,
          label: v.label,
          href: `/vistos/${v.slug}`
        });
      });
    }
    
    // Criar colunas dinâmicas
    const columns = [
      {
        id: 'todos-vistos',
        title: 'Todos os vistos',
        href: '/vistos',
        items: allItems
      },
      menuData.vistosDestinos[1] // Todos os destinos
    ];
    
    return columns;
  })();

  return (
    <DropdownMenu
      trigger={children}
      columns={dynamicColumns}
      className={className}
    />
  );
}
