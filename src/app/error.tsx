'use client';

import Link from 'next/link';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      id="main"
      className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center"
    >
      <h1 className="font-display text-3xl font-semibold text-ink-100">
        Something went wrong on our side.
      </h1>
      <p className="max-w-md text-ink-400">
        An unexpected problem stopped this page from loading. Try again in a moment. If it keeps
        happening, contact support and include the reference code below.
      </p>
      {error.digest ? (
        <p className="font-mono text-sm text-ink-400">Reference: {error.digest}</p>
      ) : null}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-ink-950 shadow-raised-md transition hover:bg-accent-strong"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-ink-700 bg-ink-800 px-6 py-3 text-sm font-medium text-ink-100 shadow-raised-sm transition hover:bg-ink-700"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
