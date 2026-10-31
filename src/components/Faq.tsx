'use client';

import { CaretDownIcon } from '@phosphor-icons/react';
import SectionHeading from '@/components/SectionHeading';
import { faqs } from '@/lib/faqs';

export default function Faq() {
  const ordered = [...faqs].sort((a, b) => a.position - b.position);

  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-24 px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          titleId="faq-title"
          title="Questions and answers"
          subtitle="The essentials before you install."
        />
        <ul className="mt-14 divide-y divide-ink-700 border-y border-ink-700">
          {ordered.map((faq) => (
            <li key={faq.id}>
              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left font-display text-lg font-medium text-ink-100 marker:content-none">
                  {faq.question}
                  <CaretDownIcon
                    size={18}
                    weight="bold"
                    aria-hidden="true"
                    className="shrink-0 text-ink-400 transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="mt-3 pr-8 leading-relaxed text-ink-400">{faq.answer}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
