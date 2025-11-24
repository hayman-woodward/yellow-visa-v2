import DropdownMenu from './DropdownMenu';
import { menuData } from './data';

interface DicasNoticiasMenuProps {
  children: React.ReactNode;
  className?: string;
}

export default function DicasNoticiasMenu({
  children,
  className = ''
}: DicasNoticiasMenuProps) {
  return (
    <DropdownMenu
      trigger={children}
      columns={menuData.dicasNoticias}
      className={className}
    />
  );
}
