import SectionHeading from '@/components/SectionHeading';

const themes = [
  {
    name: 'System',
    badge: 'Default',
    description: 'Dynamically adapts to your device light or dark mode palette.',
    surface: 'oklch(0.18 0.012 60)',
    panel: 'oklch(0.24 0.015 60)',
    key: 'oklch(0.32 0.016 60)',
    label: 'oklch(0.96 0.005 60)',
    accent: 'oklch(0.82 0.14 72)',
  },
  {
    name: 'Light',
    badge: 'Fixed',
    description: 'Clean high-contrast daytime palette with crisp readability.',
    surface: 'oklch(0.92 0.015 85)',
    panel: 'oklch(0.96 0.01 85)',
    key: 'oklch(1 0 0)',
    label: 'oklch(0.2 0.02 60)',
    accent: 'oklch(0.6 0.16 45)',
  },
  {
    name: 'Dark',
    badge: 'Fixed',
    description: 'True night mode optimized for low-glare typing.',
    surface: 'oklch(0.12 0.008 60)',
    panel: 'oklch(0.16 0.01 60)',
    key: 'oklch(0.22 0.012 60)',
    label: 'oklch(0.95 0.01 60)',
    accent: 'oklch(0.78 0.15 65)',
  },
  {
    name: 'Custom',
    badge: 'User Defined',
    description: 'Set custom hex colors (#RRGGBB) for all four theme tokens.',
    surface: 'oklch(0.2 0.05 280)',
    panel: 'oklch(0.26 0.07 280)',
    key: 'oklch(0.34 0.08 280)',
    label: 'oklch(0.96 0.02 280)',
    accent: 'oklch(0.82 0.16 160)',
  },
];

const tokens = [
  { name: 'Background', desc: 'Overall keyboard canvas & container' },
  { name: 'Keys', desc: 'Individual keycap surface color' },
  { name: 'Text', desc: 'Letters, symbols and glyph labels' },
  { name: 'Accent', desc: 'Active highlights, Shift, & action button' },
];

const rows = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

export default function Themes() {
  return (
    <section id="themes" aria-labelledby="themes-title" className="scroll-mt-24 px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          titleId="themes-title"
          title="Theming with four native tokens"
          subtitle="Choose System, Light, Dark or build your own with user-defined hex colors for Background, Keys, Text and Accent."
        />
        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {themes.map((theme) => (
            <li
              key={theme.name}
              className="flex flex-col justify-between rounded-3xl p-5 shadow-raised-lg"
              style={{ background: theme.surface }}
            >
              <div>
                <div className="flex items-center justify-between gap-3 pb-2">
                  <div className="flex items-center gap-2">
                    <h3
                      className="font-display text-lg font-semibold"
                      style={{ color: theme.label }}
                    >
                      {theme.name}
                    </h3>
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase shadow-raised-sm"
                      style={{ background: theme.panel, color: theme.label }}
                    >
                      {theme.badge}
                    </span>
                  </div>
                  <span
                    className="size-4 shrink-0 rounded-full shadow-raised-sm"
                    style={{ background: theme.accent }}
                    aria-hidden="true"
                  />
                </div>
                <p
                  className="text-xs mb-4 leading-relaxed opacity-85"
                  style={{ color: theme.label }}
                >
                  {theme.description}
                </p>
              </div>

              <div
                className="space-y-1.5 rounded-2xl p-3"
                style={{ background: theme.panel }}
                aria-hidden="true"
              >
                {rows.map((row) => (
                  <div key={row} className="flex justify-center gap-1">
                    {row.split('').map((letter) => (
                      <span
                        key={letter}
                        className="flex h-7 flex-1 items-center justify-center rounded-md text-xs shadow-raised-sm font-display"
                        style={{ background: theme.key, color: theme.label }}
                      >
                        {letter}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>

        {/* Custom Theme Tokens Reference */}
        <div className="mt-12 rounded-3xl border border-ink-700 bg-ink-900/60 p-6 shadow-raised-md">
          <h4 className="font-display text-base font-semibold text-ink-100">
            Custom Theme Tokens (#RRGGBB)
          </h4>
          <p className="mt-1 text-sm text-ink-400">
            Configurable hex values applied in code without XML styles or assets:
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {tokens.map((token) => (
              <div key={token.name} className="rounded-2xl bg-ink-800 p-4 border border-ink-700/60">
                <span className="font-mono text-xs font-semibold text-accent">{token.name}</span>
                <p className="mt-1 text-xs text-ink-400 leading-normal">{token.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
