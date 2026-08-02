"use client";

import { useState, useEffect, useMemo } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// ============================================================
// Countdown Timer (client component)
// ============================================================
function Countdown({ targetDate }: { targetDate: Date }) {
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
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
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
          <div className="text-3xl font-bold tracking-tight font-heading text-(--on-bg-high) tabular-nums">
            {String(value).padStart(2, "0")}
          </div>
          <div className="text-xs uppercase tracking-wider text-(--on-bg-low) mt-1">
            {unit}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// FAQ Accordion (client component)
// ============================================================
function FAQItem({
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
        <span className={`text-2xl transition-transform ${open ? "rotate-45" : ""}`}>
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40 pb-5" : "max-h-0"
          }`}
      >
        <p className="text-sm text-(--on-bg-medium) leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

// ============================================================
// Main Page
// ============================================================
export default function HomePage() {
  const [activeScheduleTab, setActiveScheduleTab] = useState("1");
  const [speakerFilter, setSpeakerFilter] = useState("all");

  // Sample speaker data
  const speakers = useMemo(
    () => [
      { name: "Dr. Yuki Tanaka", role: "Chief Scientist", company: "Orbital Systems", category: "keynote" },
      { name: "Marcus Chen", role: "Principal Engineer", company: "Vercel", category: "workshop" },
      { name: "Priya Sharma", role: "VP of Design", company: "Figma", category: "panel" },
      { name: "Alex Torres", role: "CTO", company: "Linear", category: "keynote" },
    ],
    []
  );

  const filteredSpeakers =
    speakerFilter === "all"
      ? speakers
      : speakers.filter((s) => s.category === speakerFilter);

  return (
    <div className="min-h-screen bg-(--bg) text-(--on-bg-high)">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[100dvh] flex items-center py-8 md:py-16 overflow-hidden border-b border-(--outline)">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_30%_20%,rgba(51,109,255,0.08),transparent_70%)]" />
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_70%_80%,rgba(51,109,255,0.06),transparent_70%)]" />
        </div>

        <Container className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-(--outline) bg-(--card) text-xs font-medium text-(--on-bg-low)">
                <Badge variant="glass-static" size="chip-small">2025</Badge>
                <span>June 18–20 · Berlin</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight tracking-tight">
                Where <span className="text-(--primary)">Ideas</span> Meet Execution
              </h1>

              <p className="text-lg md:text-xl text-(--on-bg-medium) leading-relaxed max-w-lg">
                Europe's leading product engineering conference — 3 days of deep-dive workshops, visionary keynotes, and hands-on collaboration.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button asChild variant="filled" size="large">
                  <Link href="#tickets">Get Your Ticket</Link>
                </Button>
                <Button asChild variant="outlined" size="large">
                  <Link href="#schedule">View Schedule</Link>
                </Button>
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-(--outline) bg-(--card) text-sm">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M3 10h18" />
                    <path d="M8 2v4M16 2v4" />
                  </svg>
                  Jun 18–20, 2025
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-(--outline) bg-(--card) text-sm">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Berlin · CityCube
                </span>
              </div>

              <Countdown targetDate={new Date("June 18, 2025 09:00:00 GMT+2")} />
            </div>

            <div className="relative flex justify-center items-center">
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden border border-(--outline) shadow-lg bg-(--card)">
                <img
                  src="https://picsum.photos/seed/eventpro/800/600"
                  alt="EventPro visual"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section className="py-12 border-y border-(--outline) bg-(--card)">
        <Container>
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-(--on-bg-low) mb-6">
            Trusted by teams from
          </p>
          <div className="flex flex-wrap justify-center gap-8 opacity-60 hover:opacity-100 transition-opacity">
            {["TechCorp", "DataFlow", "CloudBase", "NexusAI", "PixelGrid", "OpenStack"].map(
              (name) => (
                <span key={name} className="h-8 px-4 rounded bg-(--bg) flex items-center font-semibold text-sm text-(--on-bg-low)">
                  {name}
                </span>
              )
            )}
          </div>
        </Container>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="py-20 md:py-28 bg-(--bg)">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-(--primary) mb-4">
                About the event
              </span>
              <h2 className="text-display-3 md:text-display-2 text-(--on-bg-high) mb-6 font-heading">
                Built by engineers, for engineers
              </h2>
              <div className="space-y-4 text-(--on-bg-medium) leading-relaxed">
                <p>
                  <strong>EventPro Summit</strong> brings together 5,000 product builders, engineering leaders, and design thinkers for three days of <strong>unfiltered learning</strong>. No sales pitches — just real-world case studies, live coding sessions, and candid conversations.
                </p>
                <p>
                  Now in its 6th year, the conference features <strong>50+ speakers</strong> across 4 tracks — Frontend, Platform, AI/ML, and Product Design — with dedicated workshop days and an expo floor showcasing the tools shaping the next decade.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-(--outline)">
                <div className="text-center">
                  <div className="text-3xl font-heading font-bold text-(--primary)">3</div>
                  <div className="text-sm text-(--on-bg-low) mt-1">Days</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-heading font-bold text-(--primary)">50+</div>
                  <div className="text-sm text-(--on-bg-low) mt-1">Speakers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-heading font-bold text-(--primary)">5k</div>
                  <div className="text-sm text-(--on-bg-low) mt-1">Attendees</div>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-(--outline) shadow-md">
              <img
                src="https://picsum.photos/seed/about/800/600"
                alt="About event"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ===== SPEAKERS ===== */}
      <section className="py-20 md:py-28 bg-(--card)">
        <Container>
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-(--primary) mb-4">
            Speakers
          </span>
          <h2 className="text-display-3 md:text-display-2 text-(--on-bg-high) mb-6 font-heading">
            Meet the lineup
          </h2>
          <p className="text-body-2 text-(--on-bg-medium) max-w-2xl mb-8">
            Industry leaders, open-source creators, and practitioners sharing what actually works.
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {["all", "keynote", "workshop", "panel"].map((filter) => (
              <button
                key={filter}
                onClick={() => setSpeakerFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${speakerFilter === filter
                    ? "bg-(--primary) text-white"
                    : "bg-(--bg) text-(--on-bg-low) hover:bg-(--state-hover)"
                  }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredSpeakers.map((speaker, idx) => (
              <Card key={idx} className="p-6 text-center border-(--outline) hover:shadow-lg transition-shadow">
                <div className="w-20 h-20 mx-auto rounded-full bg-(--bg) flex items-center justify-center text-3xl mb-4 border-2 border-(--outline)">
                  <img
                    src={`https://picsum.photos/seed/${speaker.name.replace(/\s/g, "")}/100/100`}
                    alt={speaker.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <h4 className="text-base font-bold">{speaker.name}</h4>
                <p className="text-sm text-(--on-bg-low)">{speaker.role}</p>
                <p className="text-xs text-(--primary) font-medium mt-1">{speaker.company}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== SCHEDULE ===== */}
      <section className="py-20 md:py-28 bg-(--bg)" id="schedule">
        <Container>
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-(--primary) mb-4">
            Schedule
          </span>
          <h2 className="text-display-3 md:text-display-2 text-(--on-bg-high) mb-6 font-heading">
            Three days, one focus
          </h2>
          <p className="text-body-2 text-(--on-bg-medium) max-w-2xl mb-8">
            Curated tracks for every role — from deep-dive code labs to strategic keynotes.
          </p>

          <div className="flex gap-2 mb-8 border-b border-(--outline) pb-2">
            {["1", "2", "3"].map((day) => (
              <button
                key={day}
                onClick={() => setActiveScheduleTab(day)}
                className={`px-4 py-2 text-sm font-semibold transition-colors ${activeScheduleTab === day
                    ? "text-(--primary) border-b-2 border-(--primary)"
                    : "text-(--on-bg-low) hover:text-(--on-bg-high)"
                  }`}
              >
                Day {day} · {["June 18", "June 19", "June 20"][Number(day) - 1]}
              </button>
            ))}
          </div>

          <div className="relative pl-12">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-(--outline)" />
            {activeScheduleTab === "1" && (
              <div className="space-y-8">
                <div>
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-sm font-bold text-(--primary) tabular-nums min-w-[72px]">09:00</span>
                    <span className="text-xs uppercase tracking-wider text-(--on-bg-low)">Opening</span>
                  </div>
                  <div className="p-4 bg-(--card) border border-(--outline) rounded-lg">
                    <h5 className="font-semibold">Welcome & Keynote: The Future of Product Engineering</h5>
                    <div className="text-sm text-(--on-bg-low) mt-1 flex flex-wrap gap-2">
                      <span>🎤 Dr. Yuki Tanaka</span>
                      <span>📍 Main Hall</span>
                      <Badge variant="glass-static" size="chip-small">Keynote</Badge>
                    </div>
                  </div>
                </div>
                {/* Add more slots similarly */}
              </div>
            )}
            {activeScheduleTab === "2" && <div className="text-(--on-bg-low)">Day 2 schedule placeholder</div>}
            {activeScheduleTab === "3" && <div className="text-(--on-bg-low)">Day 3 schedule placeholder</div>}
          </div>
        </Container>
      </section>

      {/* ===== TICKETS ===== */}
      <section className="py-20 md:py-28 bg-(--card)" id="tickets">
        <Container>
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-(--primary) mb-4">
            Tickets
          </span>
          <h2 className="text-display-3 md:text-display-2 text-(--on-bg-high) mb-6 font-heading">
            Choose your experience
          </h2>
          <p className="text-body-2 text-(--on-bg-medium) max-w-2xl mb-8">
            All prices in EUR. Early bird ends March 31, 2025.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                name: "Early Bird",
                price: "€399",
                period: "/ full access",
                features: ["All keynotes & sessions", "Workshop access (first-come)", "Coffee & lunch included", "Expo hall access", "Recordings (post-event)"],
                cta: "Get Early Bird",
              },
              {
                name: "Standard",
                price: "€599",
                period: "/ full access",
                features: ["All keynotes & sessions", "Guaranteed workshop seat", "Coffee & lunch included", "Expo hall + networking drinks", "Recordings (lifetime)"],
                cta: "Get Standard",
                popular: true,
              },
              {
                name: "VIP",
                price: "€999",
                period: "/ full access",
                features: ["All keynotes & sessions", "Priority workshop seat", "VIP lounge access", "Gourmet catering", "Front-row seating", "Exclusive dinner with speakers"],
                cta: "Get VIP",
              },
            ].map((tier, idx) => (
              <Card key={idx} className={`p-6 border-2 relative ${tier.popular ? "border-(--primary) shadow-lg" : "border-(--outline)"}`}>
                {tier.popular && (
                  <Badge variant="filled-static" size="chip-small" className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}
                <h4 className="text-xl font-bold">{tier.name}</h4>
                <div className="text-4xl font-bold my-4">
                  <span className="text-lg text-(--on-bg-low) align-super">{tier.price.split("€")[0]}</span>
                  {tier.price}
                  <span className="text-sm font-medium text-(--on-bg-low)">{tier.period}</span>
                </div>
                <ul className="space-y-2 mb-6 text-sm text-(--on-bg-medium)">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-(--success)">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button variant="filled" className="w-full">{tier.cta}</Button>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== VENUE ===== */}
      <section className="py-20 md:py-28 bg-(--bg)" id="venue">
        <Container>
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-(--primary) mb-4">
            Venue
          </span>
          <h2 className="text-display-3 md:text-display-2 text-(--on-bg-high) mb-6 font-heading">
            CityCube Berlin
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="aspect-[16/9] rounded-xl overflow-hidden border border-(--outline) bg-(--card) flex items-center justify-center">
              <img
                src="https://picsum.photos/seed/berlin/800/450"
                alt="Venue map"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-bold">Getting here</h4>
              <p className="text-(--on-bg-medium)">Messedamm 28, 14057 Berlin, Germany</p>
              <div className="space-y-2 text-sm text-(--on-bg-medium)">
                <div className="flex items-center gap-3">
                  <span className="text-(--on-bg-low)">🚇</span> U-Bahn: Kaiserdamm (U2) – 3 min walk
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-(--on-bg-low)">🚗</span> Parking: P1 & P2 on-site (€12/day)
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-(--on-bg-low)">✈️</span> Berlin Tegel (TXL) – 20 min taxi; BER – 40 min
                </div>
              </div>
              <div className="pt-4 border-t border-(--outline)">
                <h5 className="text-sm font-semibold uppercase tracking-wider text-(--on-bg-low) mb-3">
                  Nearby hotels
                </h5>
                <ul className="space-y-1 text-sm text-(--on-bg-medium)">
                  <li>InterCityHotel Berlin Hauptbahnhof</li>
                  <li>Mercure Hotel Berlin Messe</li>
                  <li>Hotel Berliner Bär</li>
                  <li>Novotel Berlin Am Tiergarten</li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== SPONSORS ===== */}
      <section className="py-20 md:py-28 bg-(--card)" id="sponsors">
        <Container>
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-(--primary) mb-4">
            Sponsors
          </span>
          <h2 className="text-display-3 md:text-display-2 text-(--on-bg-high) mb-6 font-heading">
            Backed by the best
          </h2>
          <p className="text-body-2 text-(--on-bg-medium) max-w-2xl mb-8">
            Global leaders who make this event possible.
          </p>

          {[
            { tier: "Platinum", logos: ["Vercel", "Datadog", "Stripe"] },
            { tier: "Gold", logos: ["Linear", "Notion", "Sentry", "Figma"] },
            { tier: "Silver", logos: ["ESLint", "Prisma", "PlanetScale"] },
            { tier: "Partners", logos: ["TechCrunch", "CSS-Tricks", "Smashing Mag", "Frontend Masters"] },
          ].map((group) => (
            <div key={group.tier} className="mb-8 last:mb-0">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-(--on-bg-low) mb-4 border-b border-(--outline) pb-2">
                {group.tier}
              </h4>
              <div className="flex flex-wrap gap-4">
                {group.logos.map((logo) => (
                  <span key={logo} className="h-10 px-6 rounded border border-(--outline) bg-(--bg) flex items-center font-semibold text-sm text-(--on-bg-low)">
                    {logo}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Container>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 md:py-28 bg-(--bg)" id="testimonials">
        <Container>
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-(--primary) mb-4">
            Testimonials
          </span>
          <h2 className="text-display-3 md:text-display-2 text-(--on-bg-high) mb-6 font-heading">
            What attendees say
          </h2>
          <p className="text-body-2 text-(--on-bg-medium) max-w-2xl mb-8">
            Real voices from the community.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "This conference reshaped how I think about product engineering. The workshops alone were worth the trip. Already booking for next year.",
                name: "Sarah Svensson",
                role: "Senior Engineer, Spotify",
                year: "2024",
              },
              {
                quote: "The level of practical, real-world content is unmatched. I came back with three new projects and a notebook full of ideas.",
                name: "Jamal Khoury",
                role: "CTO, Neatly Inc.",
                year: "2023, 2024",
              },
              {
                quote: "The diversity of perspectives — from enterprise architects to indie hackers — makes this the most valuable week of my year.",
                name: "Aiko Liu",
                role: "Lead Product Designer",
                year: "2024",
              },
            ].map((t, idx) => (
              <Card key={idx} className="p-6 border-(--outline)">
                <div className="flex gap-1 mb-4 text-(--warning)">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                </div>
                <p className="text-(--on-bg-medium) italic mb-6">“{t.quote}”</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-(--bg) flex items-center justify-center text-sm font-bold">
                    <img
                      src={`https://picsum.photos/seed/${t.name.replace(/\s/g, "")}/100/100`}
                      alt={t.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-(--on-bg-low)">{t.role}</div>
                    <div className="text-xs text-(--primary) mt-0.5">Attended {t.year}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-20 md:py-28 bg-(--card)" id="faq">
        <Container>
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-(--primary) mb-4">
            FAQ
          </span>
          <h2 className="text-display-3 md:text-display-2 text-(--on-bg-high) mb-6 font-heading">
            Everything you need to know
          </h2>
          <p className="text-body-2 text-(--on-bg-medium) max-w-2xl mb-8">
            Quick answers to common questions.
          </p>

          <div className="max-w-3xl mx-auto">
            <FAQItem
              question="What's included in my ticket?"
              answer="All tiers include full access to keynotes, breakout sessions, expo hall, and recorded talks. Workshop access varies by tier — guaranteed seats for Standard and VIP. Meals, coffee, and networking events are included for all attendees."
              defaultOpen
            />
            <FAQItem
              question="Can I get a refund?"
              answer="Full refunds are available up to 60 days before the event. Partial refunds (50%) are available up to 30 days before. Transfers to another attendee are free until 7 days before the event."
            />
            <FAQItem
              question="Is the venue wheelchair accessible?"
              answer="Yes, CityCube Berlin is fully wheelchair accessible with ramps, elevators, and accessible restrooms on every floor. Please contact us if you need specific accommodations."
            />
            <FAQItem
              question="What language are sessions in?"
              answer="All sessions are in English. No simultaneous translation is provided, but most speakers share slides and transcripts in advance."
            />
            <FAQItem
              question="Is there a dress code?"
              answer="No formal dress code. Most attendees wear smart casual. Bring a jacket for the evening networking events."
            />
            <FAQItem
              question="Will sessions be recorded?"
              answer="Yes, all main stage sessions are recorded and published within 48 hours. Workshop recordings are available for Standard and VIP ticket holders. Early Bird get access to a curated selection."
            />
            <FAQItem
              question="What food options are available?"
              answer="All dietary needs are accommodated — vegetarian, vegan, gluten-free, halal, and kosher options are available at every meal. Please specify your requirements during registration."
            />
            <FAQItem
              question="How can I contact the organizers?"
              answer="Email us at hello@eventpro.com or use the contact form on our website. We typically respond within 4 hours on weekdays."
            />
          </div>
        </Container>
      </section>

      {/* ===== NEWSLETTER / CTA ===== */}
      <section className="py-20 md:py-28 bg-(--bg) text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(51,109,255,0.06),transparent_70%)] pointer-events-none" />
        <Container className="relative z-10">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-(--primary) mb-4">
            Stay in the loop
          </span>
          <h2 className="text-display-3 md:text-display-2 text-(--on-bg-high) mb-6 font-heading">
            Don't miss early‑bird pricing
          </h2>
          <p className="text-body-2 text-(--on-bg-medium) max-w-2xl mx-auto mb-8">
            Get notified when tickets go on sale, speaker additions, and schedule updates. No spam — ever.
          </p>

          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks — you're subscribed!");
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-lg border border-(--outline) bg-(--card) px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-(--primary)"
              required
            />
            <Button type="submit" variant="filled" size="large">
              Notify Me
            </Button>
          </form>
          <p className="text-xs text-(--on-bg-low) mt-4">
            Your email stays private. Unsubscribe anytime. <Link href="#" className="text-(--primary) underline">Privacy policy</Link>.
          </p>
        </Container>
      </section>
    </div>
  );
}