'use client';

import { ArrowRightIcon, BookOpenIcon } from '@phosphor-icons/react';
import { docsUrl } from '@/lib/site';

export default function DocsCta() {
  return (
    <section id="docs" aria-labelledby="docs-title" className="scroll-mt-24 px-6 py-28">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-[2rem] bg-ink-800 px-8 py-14 text-center shadow-raised-lg sm:px-14">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-ink-700 text-accent shadow-raised-sm">
          <BookOpenIcon size={28} weight="regular" aria-hidden="true" />
        </span>
        <h2
          id="docs-title"
          className="font-display text-3xl font-semibold tracking-tight text-ink-100 sm:text-4xl"
        >
          Read the documentation
        </h2>
        <p className="max-w-xl text-lg leading-relaxed text-ink-400">
          Complete guides for building from source (Windows, macOS, Ubuntu, Arch Linux), keystore
          signing, adding font styles, custom emoji categories and extending code-driven panels.
        </p>
        <a
          href={docsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-ink-950 shadow-raised-md transition-colors hover:bg-accent-strong"
        >
          Open documentation
          <ArrowRightIcon size={16} weight="bold" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
