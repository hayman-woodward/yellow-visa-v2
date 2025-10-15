interface YVTextProps {
  children?: React.ReactNode;
  text?: string;
  variant?:
    | 'body'
    | 'caption'
    | 'lead'
    | 'small'
    | 'muted'
    | 'paragraph'
    | 'super-small';
  className?: string;
  tag?: 'p' | 'span' | 'div' | 'small';
}

const YVText = ({
  children,
  text,
  variant = 'body',
  className = '',
  tag = 'p'
}: YVTextProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'lead':
        return 'text-xl leading-relaxed font-medium';
      case 'caption':
        return 'text-sm leading-tight font-medium';
      case 'small':
        return 'leading-[20px] md:leading-[18px] md:text-sm md:leading-[20px] font-normal pb-2';
      case 'muted':
        return 'text-sm font-normal text-gray-500';
      case 'paragraph':
        return 'text-[18px] leading-[24px] font-normal';
      case 'super-small':
        return 'text-center text-[12px] leading-[16px] tracking-[-0.5px] uppercase';

      default: // Valor padrão do p
        return 'text-[14px] leading-[20px] md:text-[16px] md:leading-[22px]';
    }
  };

  const classes = getVariantClasses();
  const defaultColor = 'text-[#0F0005]';
  const TextComponent = tag;

  return (
    <TextComponent className={`${classes} ${className || defaultColor}`}>
      {children || text}
    </TextComponent>
  );
};

export { YVText };
