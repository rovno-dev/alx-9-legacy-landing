"use client";

import { useState, useMemo } from "react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";

export default function ActivitiesSection() {
  const [eventFilter, setEventFilter] = useState("all");

  const eventActivities = useMemo(
    () => [
      { title: "Встреча с Чужим будущего", description: "Уникальный интерактивный опыт в окружении кибернетического Чужого.", category: "experience", image: "https://picsum.photos/seed/alx9/400/500" },
      { title: "Демонстрация технологий", description: "Живые сенсоры и алгоритмы реального времени, управляющие светом и звуком.", category: "demo", image: "https://picsum.photos/seed/alx9-tech/400/500" },
      { title: "Иммерсивные VR-опыты", description: "Погружение в цифровой ландшафт через шлем виртуальной реальности.", category: "vr", image: "https://picsum.photos/seed/alx9-vr/400/500" },
      { title: "Арт-зона", description: "«Фантастика глазами науки» — экспозиция цифрового искусства и инженерии.", category: "art", image: "https://picsum.photos/seed/alx9-art/400/500" },
    ],
    []
  );

  const filteredActivities = eventFilter === "all" ? eventActivities : eventActivities.filter((a) => a.category === eventFilter);

  return (
    <section className="py-20 md:py-28 bg-(--card)" id="event">
      <Container>
        <span className="inline-block text-xs font-heading font-semibold uppercase tracking-wider text-(--primary) mb-4">
          { `{ ЧТО ЖДЕТ НА МЕРОПРИЯТИИ }` }
        </span>
        <h2 className="text-display-3 md:text-display-2 font-heading text-(--on-bg-high) mb-6">
          Погрузитесь в будущее
        </h2>
        <p className="text-body-2 font-sans text-(--on-bg-medium) max-w-2xl mb-8">
          Интерактивные зоны, знакомство с кибернетическим Чужим и иммерсивные опыты.
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {["all", "experience", "demo", "vr", "art"].map((filter) => (
            <button
              key={filter}
              onClick={() => setEventFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-heading font-medium transition-colors ${
                eventFilter === filter ? "bg-(--primary) text-white" : "bg-(--bg) text-(--on-bg-low) hover:bg-(--state-hover)"
              }`}
            >
              {filter === "all" && "Все"}
              {filter === "experience" && "Встреча"}
              {filter === "demo" && "Технологии"}
              {filter === "vr" && "VR-опыты"}
              {filter === "art" && "Арт-зона"}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredActivities.map((activity, idx) => (
            <Card key={idx} className="p-0 overflow-hidden border-(--outline) hover:shadow-lg transition-shadow group">
              <div className="aspect-[4/5] relative">
                <img src={activity.image} alt={activity.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                  <h4 className="text-white font-heading text-xl font-bold mb-1">{activity.title}</h4>
                  <p className="text-white/80 text-xs font-sans">{activity.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
