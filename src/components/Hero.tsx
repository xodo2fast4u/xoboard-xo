'use client';

import {
  ArrowRightIcon,
  BackspaceIcon,
  CheckIcon,
  ClipboardTextIcon,
  DownloadSimpleIcon,
  GearSixIcon,
  SmileyIcon,
  TextTIcon,
} from '@phosphor-icons/react';
import { downloadPath, repoUrl } from '@/lib/site';

const row1 = 'qwertyuiop'.split('');
const row2 = 'asdfghjkl'.split('');
const row3 = 'zxcvbnm'.split('');

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-36 sm:pt-44">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h1
          id="hero-title"
          className="font-display text-5xl leading-[1.05] font-semibold tracking-tight sm:text-7xl"
        >
          <span className="block text-ink-100">Your keyboard,</span>
          <span className="block text-ink-400">built in the open.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-400">
          Built purely in Java with the Android SDK and <strong>no XML layouts</strong>. Features an
          emoji panel with device glyph filtering, 21 Unicode font styles, a persistent clipboard
          history manager and native theming.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={downloadPath}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-ink-950 shadow-raised-md transition-colors hover:bg-accent-strong"
          >
            <DownloadSimpleIcon size={18} weight="bold" aria-hidden="true" />
            Download APK
          </a>
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-ink-700 bg-ink-800 px-6 py-3 text-sm font-medium text-ink-100 shadow-raised-sm transition-colors hover:bg-ink-700"
          >
            View source
            <ArrowRightIcon size={16} weight="bold" aria-hidden="true" />
          </a>
        </div>
        <p className="mt-4 text-sm text-ink-400">
          Pure Android SDK. Requires Android 8.0 (API 26) or newer.
        </p>
      </div>

      <div className="relative mx-auto mt-16 max-w-3xl px-6" aria-hidden="true">
        <div className="pointer-events-none absolute -inset-x-8 -top-12 h-64 bg-accent/5 blur-3xl rounded-full" />

        <div className="relative rounded-3xl border border-ink-700/80 bg-ink-900/90 p-4 shadow-raised-lg backdrop-blur-sm sm:p-6 sm:pb-5">
          <div className="mx-auto max-w-xl mb-3 flex items-center justify-between border-b border-ink-700/60 pb-3 px-2 text-xs font-mono text-ink-400">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="flex items-center gap-1 rounded bg-ink-800 px-2 py-1 text-accent font-semibold shadow-raised-sm">
                ABC
              </span>
              <span className="rounded bg-ink-800/60 px-2 py-1 hover:text-ink-200 cursor-default">
                ?123
              </span>
              <span className="inline-flex items-center gap-1.5 rounded bg-ink-800/60 px-2 py-1 hover:text-ink-200 cursor-default">
                <SmileyIcon size={14} weight="regular" aria-hidden="true" />
                <span className="hidden sm:inline">Emoji</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded bg-ink-800/60 px-2 py-1 hover:text-ink-200 cursor-default">
                <ClipboardTextIcon size={14} weight="regular" aria-hidden="true" />
                <span className="hidden sm:inline">Clip</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded bg-ink-800/60 px-2 py-1 hover:text-ink-200 cursor-default">
                <TextTIcon size={14} weight="regular" aria-hidden="true" />
                <span className="hidden sm:inline">Fonts</span>
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded bg-ink-800/60 px-2 py-1 text-ink-400 hover:text-ink-200 cursor-default">
              <GearSixIcon size={14} weight="regular" aria-hidden="true" />
              <span className="hidden sm:inline">Settings</span>
            </span>
          </div>

          <div className="mx-auto max-w-xl space-y-2 rounded-2xl bg-ink-800/90 p-3 shadow-raised-md sm:p-4">
            <div className="flex justify-center gap-1.5">
              {row1.map((letter) => (
                <span
                  key={letter}
                  className="flex h-10 flex-1 items-center justify-center rounded-lg bg-ink-700 font-display text-base font-medium text-ink-200 shadow-raised-sm sm:h-12"
                >
                  {letter}
                </span>
              ))}
            </div>

            <div className="flex justify-center gap-1.5 px-3 sm:px-4">
              {row2.map((letter) => (
                <span
                  key={letter}
                  className="flex h-10 flex-1 items-center justify-center rounded-lg bg-ink-700 font-display text-base font-medium text-ink-200 shadow-raised-sm sm:h-12"
                >
                  {letter}
                </span>
              ))}
            </div>

            <div className="flex justify-center gap-1.5">
              <span
                className="flex h-10 w-12 sm:w-14 items-center justify-center rounded-lg bg-ink-700/80 text-ink-300 shadow-raised-sm sm:h-12 hover:text-ink-100"
                aria-label="Shift key"
              >
                <svg
                  className="size-4.5 sm:size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m0-15l-6 6m6-6l6 6"
                  />
                </svg>
              </span>
              <div className="flex flex-1 gap-1.5">
                {row3.map((letter) => (
                  <span
                    key={letter}
                    className="flex h-10 flex-1 items-center justify-center rounded-lg bg-ink-700 font-display text-base font-medium text-ink-200 shadow-raised-sm sm:h-12"
                  >
                    {letter}
                  </span>
                ))}
              </div>
              <span
                className="flex h-10 w-12 sm:w-14 items-center justify-center rounded-lg bg-ink-700/80 text-ink-300 shadow-raised-sm sm:h-12 hover:text-ink-100"
                aria-label="Backspace key"
              >
                <BackspaceIcon size={20} weight="regular" aria-hidden="true" />
              </span>
            </div>

            <div className="flex justify-center gap-1.5 sm:gap-2 pt-0.5">
              <span className="flex h-10 w-12 sm:w-14 items-center justify-center rounded-lg bg-ink-700/80 font-display text-xs font-semibold text-ink-300 shadow-raised-sm sm:h-12">
                ?123
              </span>
              <span className="flex h-10 w-10 sm:w-12 items-center justify-center rounded-lg bg-ink-700/80 text-ink-300 shadow-raised-sm sm:h-12">
                <SmileyIcon size={18} weight="regular" aria-hidden="true" />
              </span>
              <span className="flex h-10 w-9 sm:w-10 items-center justify-center rounded-lg bg-ink-700 font-display text-sm font-medium text-ink-300 shadow-raised-sm sm:h-12">
                ,
              </span>
              <span className="h-10 flex-1 rounded-lg bg-ink-700 shadow-raised-sm sm:h-12 flex items-center justify-center font-display text-xs text-ink-400 tracking-wider">
                space
              </span>
              <span className="flex h-10 w-9 sm:w-10 items-center justify-center rounded-lg bg-ink-700 font-display text-sm font-medium text-ink-300 shadow-raised-sm sm:h-12">
                .
              </span>
              <span className="flex h-10 w-16 sm:w-20 items-center justify-center gap-1 rounded-lg bg-accent text-ink-950 font-display text-xs font-bold shadow-raised-sm sm:h-12">
                <CheckIcon size={14} weight="bold" aria-hidden="true" />
                <span>Enter</span>
              </span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-center">
            <div className="h-1 w-28 rounded-full bg-ink-700/70" />
          </div>
        </div>
      </div>
    </section>
  );
}
