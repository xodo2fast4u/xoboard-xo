import SectionHeading from '@/components/SectionHeading';

const reasons = [
  {
    title: 'Zero XML. 100% Pure Code.',
    description:
      'All keyboards and settings views are constructed in Java directly with the Android SDK. No layout inflation overhead, no resource bloat and pure programmatic UI control.',
  },
  {
    title: 'Zero External Dependencies',
    description:
      'No third-party SDKs, telemetry or analytics trackers. Built exclusively with core Android SDK APIs, keeping the app lightweight, secure and fast.',
  },
  {
    title: 'Unicode & Clipboard Powerhouse',
    description:
      '21 live Unicode font transformations and a persistent clipboard history manager built directly into the keyboard engine.',
  },
] as const;

export default function WhyXoboard() {
  return (
    <section aria-labelledby="why-title" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          titleId="why-title"
          title="Why Xoboard"
          subtitle="A keyboard engineered for performance, transparency and freedom with no XML, no bloated dependencies and full local execution."
        />
        <div className="mt-16 grid gap-4 lg:grid-cols-5">
          <article className="rounded-3xl bg-ink-800 p-8 shadow-raised-lg lg:col-span-3 lg:row-span-2">
            <h3 className="font-display text-3xl font-semibold tracking-tight text-ink-100">
              {reasons[0].title}
            </h3>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-400">
              {reasons[0].description}
            </p>
          </article>
          {reasons.slice(1).map((reason) => (
            <article
              key={reason.title}
              className="rounded-3xl bg-ink-900 p-7 shadow-raised-md lg:col-span-2"
            >
              <h3 className="font-display text-xl font-semibold text-ink-100">{reason.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-400">{reason.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
