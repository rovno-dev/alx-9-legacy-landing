"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
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

  return (
    <section className="py-20 md:py-28 bg-(--bg)" id="schedule">
      <Container>
        <span className="inline-block text-xs font-heading font-semibold uppercase tracking-wider text-(--primary) mb-4">
          Расписание
        </span>
        <h2 className="text-display-3 md:text-display-2 font-heading text-(--on-bg-high) mb-6">
          Три вечера, три уникальных опыта
        </h2>
        <p className="text-body-2 font-sans text-(--on-bg-medium) max-w-2xl mb-8">
          Полная программа инсталляции по дням.
        </p>

        <div className="flex gap-2 mb-8 border-b border-(--outline) pb-2 overflow-x-auto">
          {["1", "2", "3"].map((day) => (
            <button
              key={day}
              onClick={() => setActiveScheduleTab(day)}
              className={`px-4 py-2 text-sm font-heading font-semibold transition-colors whitespace-nowrap ${
                activeScheduleTab === day ? "text-(--primary) border-b-2 border-(--primary)" : "text-(--on-bg-low) hover:text-(--on-bg-high)"
              }`}
            >
              День {day} · {["18 Фев", "19 Фев", "20 Фев"][Number(day) - 1]}
            </button>
          ))}
        </div>

        <div className="relative pl-12">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-(--outline)" />
          {scheduleData[activeScheduleTab]?.map((slot, idx) => (
            <div key={idx} className="mb-8 last:mb-0">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-sm font-heading font-bold text-(--primary) tabular-nums min-w-[72px]">{slot.time}</span>
                <span className="text-xs font-heading uppercase tracking-wider text-(--on-bg-low)">{slot.label}</span>
              </div>
              <div className="p-4 bg-(--card) border border-(--outline) rounded-lg">
                <h5 className="font-heading font-semibold">{slot.title}</h5>
                <div className="text-sm font-sans text-(--on-bg-low) mt-1 flex flex-wrap gap-2">
                  <span className="flex items-center gap-1"><PublicIcon className="size-3" /> {slot.location}</span>
                  <Badge variant="glass-static" size="chip-small" className="font-heading">{slot.tag}</Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
