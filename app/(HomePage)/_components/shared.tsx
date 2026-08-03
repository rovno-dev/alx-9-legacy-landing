"use client";

import { useState, useEffect } from "react";
import { CloseSmallIcon } from "@/components/icons";

export function Countdown({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex gap-4 mt-8 pt-8 border-t border-(--outline)">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div className="text-3xl font-heading font-bold tracking-tight text-(--on-bg-high) tabular-nums">
            {String(value).padStart(2, "0")}
          </div>
          <div className="text-xs uppercase tracking-wider text-(--on-bg-low) mt-1">
            {unit === "days" && "Дней"}
            {unit === "hours" && "Часов"}
            {unit === "minutes" && "Минут"}
            {unit === "seconds" && "Секунд"}
          </div>
        </div>
      ))}
    </div>
  );
}

export function FAQItem({
  question,
  answer,
  defaultOpen = false,
}: {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-(--outline) first:border-t">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full py-5 text-left font-heading text-base font-semibold text-(--on-bg-high) hover:text-(--primary) transition-colors"
      >
        {question}
        <span className="transition-transform">
          {open ? <CloseSmallIcon className="size-4" /> : <span className="text-2xl">+</span>}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-40 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-sm font-sans text-(--on-bg-medium) leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}
