'use client';

import {
  CodeIcon,
  SmileyIcon,
  TextTIcon,
  ClipboardTextIcon,
  PaletteIcon,
  VibrateIcon,
} from '@phosphor-icons/react';
import SectionHeading from '@/components/SectionHeading';

const features = [
  {
    icon: CodeIcon,
    title: '100% Code-Driven UI',
    description:
      'Zero XML layout files. Every View and layout is built dynamically in code with pure Android SDK and zero external dependencies.',
  },
  {
    icon: SmileyIcon,
    title: 'Emoji Panel & Glyph Filtering',
    description:
      'Categorized emoji browser with a Recent tab (last 32 used), inline backspace and device-glyph filtering that only shows what your device can render.',
  },
  {
    icon: TextTIcon,
    title: '21 Unicode Font Styles',
    description:
      'Transform text live as you type (Bold, Script, Fraktur, Monospace, Strikethrough, Small Caps, etc.). Switching styles mid-word converts automatically and persists.',
  },
  {
    icon: ClipboardTextIcon,
    title: 'Clipboard History Manager',
    description:
      'Captures system clipboard changes, lets you tap to paste or swipe to delete, offers configurable retention limits (0 = unlimited) and one-tap clear all.',
  },
  {
    icon: PaletteIcon,
    title: 'Native Theming Engine',
    description:
      'Supports System (auto light/dark), Light, Dark and Custom themes with user-defined hex tokens for Background, Keys, Text and Accent.',
  },
  {
    icon: VibrateIcon,
    title: 'Smart Key Engine & Haptics',
    description:
      'QWERTY and symbol layouts, accelerating repeating backspace, smart context Enter / newline on long-press, double-space period, auto-capitalize and haptic feedback.',
  },
];

export default function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="scroll-mt-24 px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          titleId="features-title"
          title="Engineered natively from the ground up"
          subtitle="A minimal, uncompromising Android keyboard architecture with zero bloat and rich features."
        />
        <ul className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <li key={title} className="flex flex-col gap-3">
              <span className="flex size-11 items-center justify-center rounded-xl bg-ink-800 text-accent shadow-raised-sm">
                <Icon size={22} weight="regular" aria-hidden="true" />
              </span>
              <h3 className="font-display text-xl font-semibold text-ink-100">{title}</h3>
              <p className="leading-relaxed text-ink-400">{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
