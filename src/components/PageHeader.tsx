import Image from "next/image";

type PageHeaderProps = {
  title: string;
  description?: string;
  illustration?: {
    src: string;
    alt: string;
  };
};

export default function PageHeader({ title, description, illustration }: PageHeaderProps) {
  return (
    <section className="relative bg-gradient-to-br from-brand-bg to-bg-section py-14 sm:py-20 overflow-hidden">
      {/* 装飾 */}
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-brand/[0.04]" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-accent/[0.04]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 lg:px-8">
        {illustration ? (
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-text">
                {title}
              </h1>
              {description && (
                <p className="mt-4 text-text-muted text-sm max-w-lg">
                  {description}
                </p>
              )}
            </div>
            <div className="w-32 h-32 sm:w-40 sm:h-40 shrink-0">
              <Image
                src={illustration.src}
                alt={illustration.alt}
                width={160}
                height={160}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-text">
              {title}
            </h1>
            {description && (
              <p className="mt-4 text-text-muted text-sm max-w-lg mx-auto">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
