import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      id="main"
      className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center"
    >
      <p className="font-display text-7xl font-semibold text-accent">404</p>
      <h1 className="font-display text-3xl font-semibold text-ink-100">
        This page could not be found.
      </h1>
      <p className="max-w-md text-ink-400">
        The address may be mistyped or outdated or the page was moved. Check the address or return
        to the home page.
      </p>
      <Link
        href="/"
        className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-ink-950 shadow-raised-md transition hover:bg-accent-strong"
      >
        Back to home
      </Link>
    </main>
  );
}
