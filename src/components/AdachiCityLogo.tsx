import Image from "next/image";

type AdachiCityLogoProps = {
  className?: string;
  title?: string;
  priority?: boolean;
  width?: number;
  height?: number;
};

export default function AdachiCityLogo({
  className,
  title = "足立区 ADACHI CITY",
  priority = false,
  width = 293,
  height = 136,
}: AdachiCityLogoProps) {
  return (
    <Image
      src="/images/logos/adachi-city-transparent.png"
      alt={title}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}
