import Image from "next/image";

type HeroIllustrationProps = {
  className?: string;
};

export default function HeroIllustration({ className = "" }: HeroIllustrationProps) {
  return (
    <div className={className}>
      <Image
        src="/images/illust/handshake.png"
        alt="握手するビジネスパーソンのイラスト"
        width={600}
        height={600}
        className="w-full h-auto"
        priority
      />
    </div>
  );
}
