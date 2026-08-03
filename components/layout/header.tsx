"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import Link from "next/link";
import Logotype from "./logotype/logotype";
import { Button } from "../ui/button";
import { NavLink } from "./nav-link";
import { GithubLogotypeMonoIcon } from "../icons/logotypes/github-logotype-mono-icon";

export default function Header() {
  const [stars, setStars] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchStars() {
      try {
        const res = await fetch(
          "https://api.github.com/repos/rovno-dev/alx-9-legacy-landing"
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setStars(data.stargazers_count);
      } catch {
        setStars(null);
      } finally {
        setLoading(false);
      }
    }
    fetchStars();
  }, []);

  // Lock scrolling when mobile modal menu is active
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const starsDisplay = loading ? "…" : stars !== null ? stars.toLocaleString() : "—";

  return (
    <>
      <header
        className="h-[70px] fixed top-0 left-0 right-0 w-full z-50 
        flex items-center bg-(--card-glass) backdrop-blur-md border-b border-(--outline)/30"
      >
        <Container className="flex justify-between items-center relative">
          <div className="flex items-center gap-8">
            <Link href="/">
              <Logotype className="!h-[30px] sm:h-[40px] w-auto" />
            </Link>

            <nav className="hidden md:flex gap-4 text-sm font-heading text-(--on-bg-low)">
              <NavLink href="#about">Концепция</NavLink>
              <NavLink href="#event">Мероприятие</NavLink>
              <NavLink href="#schedule">Программа</NavLink>
              <NavLink href="#tickets">Билеты</NavLink>
            </nav>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Button
              asChild
              variant="outlined"
              size="small"
              className="hidden sm:flex gap-2 border-primary/30 hover:border-primary text-xs px-3 py-1 h-8"
            >
              <a
                href="https://github.com/rovno-dev/alx-9-legacy-landing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <GithubLogotypeMonoIcon className="size-4" />
                <span className="hidden sm:inline">GH repo</span>
                <span className="text-(--on-bg-low) text-[10px]">·</span>
                <span className="font-mono text-[10px]">{starsDisplay} ⭐</span>
              </a>
            </Button>

            {/* Open Burger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="block md:hidden p-2 space-y-1.5 focus:outline-none text-(--on-bg-high)"
              aria-label="Open menu"
            >
              <span className="block w-6 h-0.5 bg-current" />
              <span className="block w-6 h-0.5 bg-current" />
              <span className="block w-6 h-0.5 bg-current" />
            </button>
          </div>
        </Container>
      </header>

      {/* 
        FIXED FULLSCREEN GLASS OVERLAY 
        Uses native design tokens (`var(--card)`) mixed with a glass blur layout matrix 
      */}
      <div
        className={`fixed inset-0 w-full h-full z-[100] bg-color-mix(in srgb, var(--card), transparent 15%) backdrop-blur-xl transition-all duration-300 flex flex-col justify-between p-8 md:hidden ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Header section inside menu for branding and custom clear close trigger action */}
        <div className="flex justify-between items-center w-full">
          <Link href="/">
            <Logotype className="!h-[30px] sm:h-[40px] w-auto" />
          </Link>

          {/* Close Action Trigger matching screenshot element parameters */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-(--on-bg-high) hover:opacity-80 transition-opacity focus:outline-none"
            aria-label="Close menu"
          >
            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Large Scale Display Links Navigation Blocks */}
        <nav className="flex flex-col gap-6 text-3xl font-heading tracking-wide text-(--on-bg-high) my-auto pl-2">
          <Link href="#about" className="hover:text-(--primary) transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Концепция</Link>
          <Link href="#event" className="hover:text-(--primary) transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Мероприятие</Link>
          <Link href="#schedule" className="hover:text-(--primary) transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Программа</Link>
          <Link href="#tickets" className="hover:text-(--primary) transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Билеты</Link>
        </nav>

        {/* Bottom Menu Action Items Container Block */}
        <div className="w-full space-y-4">
          <Button
            asChild
            variant="outlined"
            className="w-full justify-center h-12 text-sm border-(--outline)/60 text-(--on-bg-high) bg-white/5 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <a href="https://github.com/rovno-dev/alx-9-legacy-landing" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <GithubLogotypeMonoIcon className="size-4" />
              <span>GitHub Repository</span>
              <span className="font-mono text-xs opacity-60">({starsDisplay} ⭐)</span>
            </a>
          </Button>
        </div>
      </div>
    </>
  );
}
