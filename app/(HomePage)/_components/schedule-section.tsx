"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PublicIcon } from "@/components/icons";

export default function ScheduleSection() {
  const [activeScheduleTab, setActiveScheduleTab] = useState("1");

  const scheduleData: Record<string, { time: string; label: string; title: string; location: string; tag: string }[]> = {
    '1': [
      { time: '19:00', label: 'Открытие', title: 'Встреча с авторами и презентация ALX-9', location: 'Главный зал', tag: 'Демонстрация' },
      { time: '20:00', label: 'Технологии', title: 'Живой показ сенсорных алгоритмов', location: 'Лаборатория', tag: 'Технологии' },
      { time: '21:30', label: 'Погружение', title: 'Иммерсивный VR-опыт в киберпространстве', location: 'VR-зона', tag: 'VR-опыт' },
    ],
    '2': [
      { time: '19:00', label: 'Арт-зона', title: 'Фантастика глазами науки: экскурсия', location: 'Выставочный зал', tag: 'Искусство' },
      { time: '20:00', label: 'Панель', title: 'Дискуссия о футуризме и цифровой культуре', location: 'Зал дискуссий', tag: 'Панель' },
      { time: '21:30', label: 'Вопросы', title: 'Сессия Q&A с создателями инсталляции', location: 'Лаборатория', tag: 'Q&A' },
    ],
    '3': [
      { time: '19:00', label: 'Финал', title: 'Заключительное шоу и интерактив', location: 'Главный зал', tag: 'Шоу' },
      { time: '20:30', label: 'Свобода', title: 'Свободное посещение всех зон', location: 'Весь комплекс', tag: 'Свободный' },
    ]
  };

  const currentEvents = scheduleData[activeScheduleTab] || [];

  return (
    <section className="py-20 md:py-28 bg-(--bg) overflow-hidden relative" id="schedule">
      {/* Structural Tech Background Pattern Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--outline)_1px,transparent_1px),linear-gradient(to_bottom,var(--outline)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_40%,transparent_100%)] opacity-20 pointer-events-none" />

      <Container className="relative z-10">
        {/* Header Block */}
        <div className="text-center mb-16 animate-reveal">
          <span className="inline-block text-xs font-heading font-semibold uppercase tracking-wider text-(--primary) mb-4">
            Расписание
          </span>
          <h2 className="text-display-3 md:text-display-2 font-heading font-semibold tracking-tight text-(--on-bg-high) mb-4">
            Построен на базе передовых технологий
          </h2>
          <p className="text-body-3 font-sans text-(--on-bg-medium) max-w-xl mx-auto">
            Три вечера интерактивного погружения. Выберите интересующий день.
          </p>
        </div>

        <div className="w-full max-w-5xl mx-auto flex flex-col items-center">

          {/* Microchip Tab Switcher Container */}
          <div className="relative mb-20 flex flex-col items-center animate-reveal [animation-delay:150ms] [animation-fill-mode:both]">
            {/* Top Microchip Pin System */}
            <div className="absolute -top-3 flex gap-2 justify-center w-full">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-1 h-3 bg-(--outline) rounded-sm opacity-60" />
              ))}
            </div>

            {/* Main Microchip Control Element */}
            <div className="px-6 py-3 rounded-xl border border-(--outline)/60 bg-(--card) shadow-xl flex items-center gap-2 min-w-[240px] justify-center relative z-10 backdrop-blur-md">
              <span className="text-xs font-mono tracking-widest text-(--on-bg-low) uppercase mr-1">День:</span>
              <div className="flex gap-1 bg-(--bg)/50 p-0.5 rounded-lg border border-(--outline)/40">
                {["1", "2", "3"].map((day) => (
                  <button
                    key={day}
                    onClick={() => setActiveScheduleTab(day)}
                    className={`px-3 py-1 rounded-md text-xs font-mono transition-all duration-300 ${activeScheduleTab === day
                      ? "bg-(--primary) text-(--on-primary) font-bold shadow-md scale-105"
                      : "text-(--on-bg-low) hover:text-(--on-bg-high) hover:bg-(--bg)"
                      }`}
                  >
                    0{day}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Microchip Pin System */}
            <div className="absolute -bottom-3 flex gap-2 justify-center w-full">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-1 h-3 bg-(--outline) rounded-sm opacity-60" />
              ))}
            </div>

            {/* Wire Tracks Layout Component */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] h-12 opacity-40 pointer-events-none hidden md:block">
              <svg className="w-full h-full text-(--outline)" fill="none" xmlns="http://w3.org">
                <path d="M300 0V20M300 20H100V48M300 20H500V48M300 20V48" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
              </svg>
            </div>
          </div>

          {/* 3-Column Responsive Dashboard Layout with Premium Card Glows */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-stretch">
            {currentEvents.map((event, idx) => (
              <Card
                key={`${activeScheduleTab}-${idx}`} // Reset animation cleanly on tab changes
                style={{
                  animationDelay: `${300 + idx * 150}ms`,
                  animationFillMode: 'both'
                }}
                className="group relative rounded-xl border border-(--outline)/40 bg-(--card) p-6 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:border-(--primary)/60 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] animate-reveal"
              >
                {/* 
                  1. LASER LIGHT BORDER ACCENT
                  Brings back the top glowing light bar using your exact global primary variable color token!
                */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-(--primary) to-transparent opacity-30 group-hover:opacity-100 group-hover:scale-x-110 transition-all duration-500" />

                {/* 
                  2. AMBIENT RADIAL LIGHT GLOW MESH
                  Emits a soft neon aura downwards inside the card structure whenever hovered.
                */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--primary),transparent_55%)] opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* Card Info Meta Elements */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-mono text-sm font-semibold tracking-wider text-(--primary) group-hover:scale-105 transition-transform duration-300">
                      {event.time}
                    </span>
                    <Badge variant="outline" className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 border-(--outline)/60 text-(--on-bg-low) group-hover:border-(--primary)/40 group-hover:text-(--on-bg-high) transition-colors">
                      {event.tag}
                    </Badge>
                  </div>

                  {/* Main Event Title Text Block */}
                  <h3 className="font-heading text-lg font-medium leading-snug text-(--on-bg-high) transition-colors duration-300 mb-4">
                    {event.title}
                  </h3>
                </div>

                {/* Footer Location Container Block */}
                <div className="pt-4 border-t border-(--outline)/30 mt-auto">
                  <p className="text-xs font-sans text-(--on-bg-low) group-hover:text-(--on-bg-medium) flex items-center gap-2 transition-colors duration-300">
                    <PublicIcon className="size-3.5 opacity-70 text-(--primary)" />
                    {event.location}
                  </p>
                </div>
              </Card>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}
