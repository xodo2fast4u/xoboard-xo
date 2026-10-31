'use client';

import Link from 'next/link';
import { DownloadSimpleIcon, KeyboardIcon, ListIcon } from '@phosphor-icons/react';

const links = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#download', label: 'Download' },
  { href: '#faq', label: 'FAQ' },
  { href: '#docs', label: 'Docs' },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-4xl items-center justify-between gap-4 rounded-full border border-ink-700 bg-ink-800/85 py-2 pr-2 pl-5 shadow-raised-md backdrop-blur-md"
      >
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-lg font-semibold text-ink-100"
        >
          <KeyboardIcon size={22} weight="regular" aria-hidden="true" className="text-accent" />
          Xoboard
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-3 py-1.5 text-sm text-ink-400 transition-colors hover:text-ink-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#download"
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-medium text-ink-950 shadow-raised-sm transition-colors hover:bg-accent-strong"
          >
            <DownloadSimpleIcon size={16} weight="bold" aria-hidden="true" />
            Download
          </a>

          <details className="group relative md:hidden">
            <summary
              aria-label="Open menu"
              className="flex size-10 cursor-pointer list-none items-center justify-center rounded-full text-ink-100 transition-colors hover:bg-ink-700"
            >
              <ListIcon size={20} weight="regular" aria-hidden="true" />
            </summary>
            <ul className="absolute top-12 right-0 flex w-52 flex-col gap-1 rounded-2xl border border-ink-700 bg-ink-800 p-2 shadow-raised-lg">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block rounded-xl px-3 py-2.5 text-sm text-ink-300 transition-colors hover:bg-ink-700 hover:text-ink-100"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </nav>
    </header>
  );
}
