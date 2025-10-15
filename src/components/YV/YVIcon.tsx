import Image from 'next/image';

interface YVIconProps {
  name: string;
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

const YVIcon = ({
  name,
  width = 16,
  height = 16,
  className = '',
  alt = ''
}: YVIconProps) => {
  return (
    <Image
      src={`/svgs/icons/${name}.svg`}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};

export { YVIcon };
