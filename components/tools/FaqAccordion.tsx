"use client";

import { useState } from "react";

import { ChevronDown } from "lucide-react";

export function FaqAccordion({
  items,
}: {
  items: Array<{
    question: string;
    answer: string;
  }>;
}) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="grid gap-3">
      {items.map((item, index) => {
        const open = openIndex === index;

        return (
          <div key={item.question} className="glass-card rounded-[24px]">
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-semibold text-foreground">{item.question}</span>
              <ChevronDown
                size={18}
                className={`shrink-0 transition ${open ? "rotate-180 text-cyan" : "text-muted"}`}
              />
            </button>
            {open ? <div className="px-5 pb-5 text-sm leading-7 text-muted">{item.answer}</div> : null}
          </div>
        );
      })}
    </div>
  );
}
