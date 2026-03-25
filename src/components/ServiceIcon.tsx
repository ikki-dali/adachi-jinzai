import Image from "next/image";

type ServiceIconProps = {
  type: "consulting" | "tour" | "seminar";
  className?: string;
};

const ICON_MAP: Record<string, { src: string; alt: string }> = {
  consulting: {
    src: "/images/illust/conversation-male.png",
    alt: "専門家が相談に乗るイラスト",
  },
  tour: {
    src: "/images/illust/handshake-female.png",
    alt: "企業見学で握手するイラスト",
  },
  seminar: {
    src: "/images/illust/presentation-male.png",
    alt: "セミナーでプレゼンするイラスト",
  },
};

export default function ServiceIcon({ type, className = "" }: ServiceIconProps) {
  const icon = ICON_MAP[type];
  return (
    <Image
      src={icon.src}
      alt={icon.alt}
      width={240}
      height={240}
      className={className}
    />
  );
}
