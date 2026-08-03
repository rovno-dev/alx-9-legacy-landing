"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArticleIcon, PublicIcon } from "@/components/icons";
import { Countdown } from "./shared";

export default function HeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Short fallback if iframe onLoad doesn't fire
    const timer = setTimeout(() => setVideoLoaded(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[calc(100dvh-70px)] flex items-center py-8 md:py-10 overflow-hidden border-b border-(--outline)">
      {/* Absolute Background Wrapper */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Preloader Overlay */}
        <div className={`absolute inset-0 bg-(--bg) z-10 transition-opacity duration-700 flex items-center justify-center ${videoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="flex flex-col items-center gap-4">
            <div className="size-12 border-4 border-(--primary) border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-heading text-(--on-bg-low) animate-pulse">Загрузка видео...</p>
          </div>
        </div>

        {/* 
          FIXED KINESCOPE EMBED CONTAINER
          Forces the iframe wrapper to break out of 16:9 boxes, scaling up to ensure 
          the inner media asset covers 100% of the viewport width and height.
        */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh]">
          <iframe
            src="https://kinescope.io/embed/wJ6WmWZCkVYZr6yEDvYmLo?autoplay=1&muted=1&loop=1"
            className={`absolute top-0 left-0 w-full h-full border-0 transition-opacity duration-700 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
            allow="autoplay; encrypted-media; fullscreen; accelerometer; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setVideoLoaded(true)}
            title="ALX-9 Promo Video"
          />
        </div>

        {/* Fallback Background Gradient */}
        <div className="absolute inset-0 bg-(--bg) opacity-20" />

        {/* Glow Effects */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_30%_20%,rgba(51,109,255,0.08),transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_70%_80%,rgba(51,109,255,0.06),transparent_70%)] pointer-events-none" />

        {/* Dark Tint Overlay for text readability */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-(--outline)/50 bg-(--card)/40 backdrop-blur-sm text-xs font-medium text-(--on-bg-low)">
              <Badge variant="glass-static" size="chip-small" className="font-heading">2030</Badge>
              <span className="font-sans text-white">Выставочный проект</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight tracking-tight text-white">
              <span className="text-(--primary)">ALX-9</span>
            </h1>
            <p className="text-lg md:text-xl font-sans text-gray-200 leading-relaxed max-w-lg">
              Интерактивная аудиовизуальная инсталляция на стыке искусства и технологий. Представлена на международной выставке современного искусства.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="filled" size="large" className="font-heading shadow-lg shadow-(--primary)/30">
                <Link href="#event">Узнать больше</Link>
              </Button>
              <Button asChild variant="outlined" size="large" className="font-heading bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-white/10">
                <Link href="#tickets">Купить билет</Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-(--outline)/50 bg-(--card)/40 backdrop-blur-sm text-white text-sm">
                <ArticleIcon className="size-4" />
                28 февраля 2030
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-(--outline)/50 bg-(--card)/40 backdrop-blur-sm text-white text-sm">
                <PublicIcon className="size-4" />
                Платформа 9
              </span>
            </div>
            <Countdown targetDate={new Date("February 28, 2030 19:00:00 GMT+2")} />
          </div>

          <div className="hidden lg:block lg:col-span-7" />
        </div>
      </Container>
    </section>
  );
}
