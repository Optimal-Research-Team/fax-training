import type { TestFax } from '../data/types';
import { FaxIcon, Layers } from './icons';

export function FaxPreview({ fax }: { fax: TestFax }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-soft">
      {/* Fax header strip */}
      <div className="flex items-center justify-between gap-3 border-b border-dashed border-line-strong bg-[#FCFBF8] px-5 py-3.5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-ink/5 text-ink-muted">
            <FaxIcon className="h-[18px] w-[18px]" />
          </span>
          <div className="min-w-0">
            <div className="eyebrow leading-none">Inbound fax</div>
            <div className="mt-1 truncate text-[15px] font-semibold text-ink">
              {fax.display.sender}
            </div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-ink/5 px-2.5 py-1 text-2xs font-semibold text-ink-muted">
          <Layers className="h-3.5 w-3.5" />
          {fax.display.pages} {fax.display.pages === 1 ? 'page' : 'pages'}
        </div>
      </div>

      {/* OCR body */}
      <div className="relative px-5 py-5 sm:px-6 sm:py-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-line to-transparent" />
        <div className="eyebrow mb-2 text-ink-faint">OCR transcript</div>
        <pre className="ocr whitespace-pre-wrap break-words font-mono">
          {fax.display.snippet}
        </pre>
      </div>
    </div>
  );
}
