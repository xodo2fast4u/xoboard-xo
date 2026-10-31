type Props = {
  title: string;
  subtitle: string;
  titleId?: string;
};

export default function SectionHeading({ title, subtitle, titleId }: Props) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2
        id={titleId}
        className="font-display text-4xl font-semibold tracking-tight text-ink-100 sm:text-5xl"
      >
        {title}
      </h2>
      <p className="mt-4 text-lg leading-relaxed text-ink-400">{subtitle}</p>
    </div>
  );
}
