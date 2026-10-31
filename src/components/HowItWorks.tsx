import SectionHeading from '@/components/SectionHeading';

const steps = [
  {
    title: 'Install the APK',
    description:
      'Download and install Xoboard.apk (or build with ./gradlew installDebug). Requires Android 8.0+.',
  },
  {
    title: 'Enable Xoboard',
    description:
      'Open the Xoboard app -> tap "Enable keyboard" -> toggle Xoboard on in system language & input settings.',
  },
  {
    title: 'Choose active keyboard',
    description:
      'Back in the Xoboard app -> tap "Choose active keyboard" -> select Xoboard. Switch to any text field and type!',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="scroll-mt-24 px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          titleId="how-title"
          title="Up and typing in three steps"
          subtitle="No account required. Install it once, enable via the app and start writing."
        />
        <ol className="mx-auto mt-16 grid max-w-5xl gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-3xl bg-ink-900 p-7 shadow-raised-md">
              <span className="flex size-9 items-center justify-center rounded-full bg-ink-700 font-display text-sm font-semibold text-accent shadow-raised-sm">
                {index + 1}
              </span>
              <h3 className="mt-6 font-display text-xl font-semibold text-ink-100">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-400">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
