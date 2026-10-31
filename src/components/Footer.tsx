import { docsUrl, repoUrl } from '@/lib/site';

export default function Footer() {
  const year = 2026;

  return (
    <footer className="border-t border-ink-800 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-sm text-ink-400 md:flex-row">
        <p>Copyright {year} xodobyte. Xoboard is open source.</p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <li>
              <a
                href={docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-ink-100"
              >
                Documentation
              </a>
            </li>
            <li>
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-ink-100"
              >
                Repository
              </a>
            </li>
            <li>
              <a href="/sitemap.xml" className="transition-colors hover:text-ink-100">
                Sitemap
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
