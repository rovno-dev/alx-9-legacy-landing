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
    <section className="py-16 md:py-24 bg-(--bg) overflow-hidden" id="schedule">
      <Container>
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-heading font-semibold uppercase tracking-wider text-(--primary) mb-4">
            Расписание
          </span>
          <h2 className="text-display-3 md:text-display-2 font-heading text-(--on-bg-high) mb-4">
            Три вечера, три уникальных опыта
          </h2>
          <p className="text-body-2 font-sans text-(--on-bg-medium) max-w-2xl mx-auto">
            Полная программа инсталляции по дням.
          </p>
        </div>

        <div className="flex flex-col items-center relative max-w-4xl mx-auto">
          {/* Day Selector */}
          <div className="inline-flex items-center p-1 rounded-full border border-(--outline)/50 bg-(--card)/60 backdrop-blur-md shadow-xl mb-10 relative z-20">
            {["1", "2", "3"].map((day) => (
              <button
                key={day}
                onClick={() => setActiveScheduleTab(day)}
                className={`px-5 py-2 rounded-full text-sm font-heading font-medium transition-all duration-300 ${activeScheduleTab === day
                    ? "bg-(--primary) text-white shadow-lg shadow-(--primary)/30 scale-105"
                    : "text-(--on-bg-low) hover:text-(--on-bg-high)"
                  }`}
              >
                День {day}
              </button>
            ))}
          </div>

          {/* Timeline Container */}
          <div className="relative flex flex-col gap-6 w-full max-w-2xl">
            {/* Vertical Line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-(--primary)/50 via-(--primary)/20 to-transparent" />

            {currentEvents.map((event, idx) => (
              <div key={idx} className="relative flex w-full group items-start">

                {/* 1. Node Column (Perfectly matches line height of the time text element) */}
                <div className="relative z-10 flex flex-col items-center shrink-0 w-10 h-5 top-[22px] justify-center">
                  <div className="w-4 h-4 rounded-full border-[1.5px] border-(--primary) bg-(--bg) flex items-center justify-center shadow-[0_0_10px_rgba(51,109,255,0.3)] transition-shadow group-hover:shadow-[0_0_18px_rgba(51,109,255,0.6)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-(--primary) animate-pulse group-hover:scale-125 transition-transform" />
                  </div>
                </div>

                {/* 2. Horizontal Connector Column */}
                <div className="relative shrink-0 w-8 h-5 top-[22px] flex items-center">
                  <div className="w-full h-px bg-(--primary)/20 group-hover:bg-(--primary)/50 transition-colors duration-300" />
                </div>

                {/* 3. Card Column */}
                <div className="flex-1">
                  <Card className="p-5 rounded-xl border border-(--outline)/30 bg-(--card)/40 backdrop-blur-sm hover:border-(--primary)/40 hover:shadow-lg hover:shadow-(--primary)/5 transition-all duration-300">
                    <div className="flex justify-between items-center mb-3"> {/* Updated items-start to items-center for uniform header tracking */}
                      <span className="font-mono text-sm font-semibold text-(--primary) tracking-wide leading-5">{event.time}</span>
                      <Badge variant="glass-static" size="chip-small" className="font-heading text-[10px] bg-(--primary-glass) text-(--primary) border-(--primary)/20">{event.tag}</Badge>
                    </div>
                    <h5 className="font-heading text-lg font-bold mb-1 text-(--on-bg-high)">{event.title}</h5>
                    <p className="text-xs font-sans text-(--on-bg-low) flex items-center gap-1.5">
                      <PublicIcon className="size-3 opacity-70" /> {event.location}
                    </p>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
