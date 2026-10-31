'use client';

import { CheckCircleIcon, DownloadSimpleIcon, WarningIcon } from '@phosphor-icons/react';
import { downloadPath } from '@/lib/site';
import type { ApkInfo } from '@/lib/apk';

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function DownloadUI({ apk }: { apk: ApkInfo }) {
  return (
    <section id="download" aria-labelledby="download-title" className="scroll-mt-24 px-6 py-28">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-ink-700 bg-ink-900 p-8 shadow-raised-lg sm:p-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-md">
            <h2
              id="download-title"
              className="font-display text-3xl font-semibold tracking-tight text-ink-100 sm:text-4xl"
            >
              Get Xoboard for Android
            </h2>
            <p className="mt-4 leading-relaxed text-ink-400">
              Install the lightweight, standalone APK directly on your device. Only ~57.7 KB
              download (219 KB installed) with zero external dependencies.
            </p>
          </div>

          <div className="flex w-full flex-col gap-4 rounded-3xl bg-ink-800 p-6 shadow-raised-md md:w-80">
            {apk.available ? (
              <>
                <a
                  href={downloadPath}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-ink-950 shadow-raised-sm transition-colors hover:bg-accent-strong"
                >
                  <DownloadSimpleIcon size={18} weight="bold" aria-hidden="true" />
                  Download Xoboard.apk
                </a>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                  <dt className="text-ink-400">Version</dt>
                  <dd className="text-right font-medium text-ink-100">{apk.version}</dd>
                  <dt className="text-ink-400">Download size</dt>
                  <dd className="text-right font-medium text-ink-100">
                    {formatFileSize(apk.sizeBytes)}
                  </dd>
                  <dt className="text-ink-400">Installed size</dt>
                  <dd className="text-right font-medium text-ink-100">~219 KB</dd>
                  <dt className="text-ink-400">Platform</dt>
                  <dd className="text-right font-medium text-ink-100">Android 8.0+</dd>
                </dl>
                <p className="flex items-center gap-2 text-sm text-ink-400">
                  <CheckCircleIcon
                    size={16}
                    weight="regular"
                    aria-hidden="true"
                    className="text-accent"
                  />
                  Ready to install
                </p>
              </>
            ) : (
              <p
                role="status"
                className="flex items-start gap-3 text-sm leading-relaxed text-ink-300"
              >
                <WarningIcon
                  size={18}
                  weight="regular"
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-accent"
                />
                The APK is not available right now. Check the project repository for the latest
                release.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
