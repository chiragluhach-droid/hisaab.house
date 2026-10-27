"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronIcon } from "./icons";

type Props = { title: ReactNode; meta?: ReactNode; children: ReactNode };

/** Collapsed on phones to keep the page short; always open from tablet up. */
export function Collapsible({ title, meta, children }: Props) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="card overflow-hidden">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
          className="flex min-h-[4.5rem] w-full items-center gap-4 p-5 text-left md:pointer-events-none md:p-6"
        >
          <span className="flex-1">
            <span className="block text-xl font-semibold">{title}</span>
            {meta && <span className="label mt-1 block">{meta}</span>}
          </span>
          <ChevronIcon className={`shrink-0 text-mustard transition-transform duration-200 md:hidden ${open ? "rotate-180" : ""}`} />
        </button>
      </h3>
      <div id={id} className={`${open ? "block" : "hidden"} border-t border-line md:block`}>
        {children}
      </div>
    </div>
  );
}
