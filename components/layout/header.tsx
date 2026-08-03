"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import Link from "next/link";
import Logotype from "./logotype/logotype";
import { Button } from "../ui/button";
import { NavLink } from "./nav-link";
import { GithubLogotypeMonoIcon } from "../icons/logotypes/github-logotype-mono-icon";
import { ROUTES } from "@/utils/constants/routes";

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

  const starsDisplay = loading ? "…" : stars !== null ? stars.toLocaleString() : "—";

  return (
    <header
      className="h-[70px] fixed top-0 left-0 right-0 w-full z-50 
      flex items-center bg-(--card-glass) backdrop-blur-glass border-b border-b-(--card-glass)"
    >
      <Container className="flex justify-between items-center relative">
        <div className="flex items-center gap-8">
          <Link href="/">
            <Logotype className="!h-[30px] sm:h-[40px]" />
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

          {/* Burger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="block md:hidden p-2 space-y-1.5 focus:outline-none"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Navigation Overlay */}
        <div
          className={`fixed top-[70px] left-0 right-0 bottom-0 bg-(--bg)/95 backdrop-blur-md border-t border-(--outline) p-6 flex flex-col gap-6 transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            } md:hidden`}
        >
          <nav className="flex flex-col gap-4 text-lg font-heading text-(--on-bg-high)">
            <Link href="#about" onClick={() => setIsMobileMenuOpen(false)}>Концепция</Link>
            <Link href="#event" onClick={() => setIsMobileMenuOpen(false)}>Мероприятие</Link>
            <Link href="#schedule" onClick={() => setIsMobileMenuOpen(false)}>Программа</Link>
            <Link href="#tickets" onClick={() => setIsMobileMenuOpen(false)}>Билеты</Link>
          </nav>
          <Button
            asChild
            variant="outlined"
            className="w-full justify-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <a href="https://github.com/rovno-dev/alx-9-legacy-landing" target="_blank">
              <GithubLogotypeMonoIcon className="size-4" /> GitHub
            </a>
          </Button>
        </div>
      </Container>
    </header>
  );
}
