"use client";

import { useEffect, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

export function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Clipboard access can be blocked; the value stays visible either way.
    }
  }

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-4">
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 truncate font-medium text-foreground">{value}</p>
      </div>

      <button
        type="button"
        onClick={copy}
        className="grid size-9 shrink-0 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {copied ? (
          <CheckIcon className="size-4 text-primary" />
        ) : (
          <CopyIcon className="size-4" />
        )}
        <span className="sr-only">
          {copied ? `${label} copied` : `Copy ${label}`}
        </span>
      </button>
    </div>
  );
}
