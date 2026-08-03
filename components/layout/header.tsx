"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import Link from "next/link";
import Logotype from "./logotype/logotype";
import { Button } from "../ui/button";
import { NavLink } from "./nav-link";
import { GithubLogotypeMonoIcon } from "../icons/logotypes/github-logotype-mono-icon";
import { ROUTES } from "@/utils/constants/routes";
import LogotypeIcon from "./logotype/logotype-icon";

export default function Header() {
  const [stars, setStars] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStars() {
      try {
        const res = await fetch(
          "https://api.github.com/repos/niyazgim/unideka-ui-template"
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
    <header className="fixed top-0 left-0 right-0 z-50 h-[70px] bg-(--card-glass) backdrop-blur-glass border-b border-(--card-glass) px-6 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <Logotype className="h-14" />
      </Link>
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-(--on-bg-low)">
        <Link href="#about" className="hover:text-(--primary) transition-colors">Концепция</Link>
        <Link href="#event" className="hover:text-(--primary) transition-colors">Мероприятие</Link>
        <Link href="#schedule" className="hover:text-(--primary) transition-colors">Программа</Link>
        <Link href="#tickets" className="hover:text-(--primary) transition-colors">Билеты</Link>
        <Link href="#faq" className="hover:text-(--primary) transition-colors">FAQ</Link>
      </nav>
      <Button asChild variant="filled" size="small" className="font-heading">
        <Link href="#tickets">Купить билет</Link>
      </Button>
    </header>
  );
}