interface YVTitleProps {
  title?: string;
  children?: React.ReactNode;
  subtitle?: string;
  variant?: 'primary' | 'secondary' | 'large' | 'heading' | 'subtitle' | 'hero';
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'span' | 'div';
  noPadding?: boolean;
}

const YVTitle = ({
  title,
  children,
  subtitle,
  variant = 'primary',
  className = '',
  tag = 'h2',
  noPadding = false
}: YVTitleProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'large':
        return {
          title: 'text-4xl md:text-5xl font-normal leading-tight',
          subtitle: 'text-xl md:text-2xl font-medium',
          padding: 'pb-4'
        };
      case 'secondary':
        return {
          title: 'text-2xl md:text-3xl font-semibold leading-tight',
          subtitle: 'text-lg md:text-xl font-normal',
          padding: 'pb-4'
        };
      case 'heading':
        return {
          title:
            'text-[29px] leading-[34px] md:text-[46px] md:leading-[56px] tracking-[-0.5px] font-normal ',
          subtitle: 'text-xl md:text-2xl font-medium',
          padding: 'pb-2 md:pb-4'
        };
      case 'subtitle':
        return {
          title:
            'text-[19px] md:text-[22px] leading-[24px] md:leading-[28px] md:leading-[28px] tracking-[-0.5px] font-semibold',
          subtitle: 'text-lg md:text-xl font-medium',
          padding: 'pb-2'
        };
      case 'hero':
        return {
          title:
            'text-[36px] md:text-[52px] md:leading-[60px] xl:text-[66px] leading-[40px] xl:leading-[76px] tracking-[-0.5px] font-normal',
          subtitle: 'text-xl md:text-2xl font-medium',
          padding: 'pb-2 md:pb-4'
        };

      default: // primary
        return {
          title:
            'text-[27px] leading-[32px] md:text-[42px] md:leading-[48px] tracking-[-0.5px] md:font-normal',
          subtitle: 'text-lg md:text-xl font-medium',
          padding: 'pb-2 md:pb-4'
        };
    }
  };

  const classes = getVariantClasses();

  const TitleComponent = tag;

  return (
    <div
      className={`space-y-2 ${noPadding ? '' : classes.padding} ${className}`}
    >
      <TitleComponent
        className={`font-heading ${classes.title} ${
          className.includes('text-') ? '' : 'text-gray-900'
        }`}
      >
        {children || title}
      </TitleComponent>
      {subtitle && (
        <p
          className={`${classes.subtitle} ${
            className.includes('text-') ? '' : 'text-gray-600'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export { YVTitle };
