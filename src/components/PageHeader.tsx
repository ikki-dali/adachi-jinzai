import HeroVideo from "@/components/HeroVideo";

type PageHeaderProps = {
  title: string;
  description?: string;
  illustration?: {
    src: string;
    alt: string;
  };
};

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <section className="relative py-14 sm:py-20 overflow-hidden">
      <HeroVideo />
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-black/20 to-white/50" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 lg:px-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-white/90 text-sm max-w-lg mx-auto drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
