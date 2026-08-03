"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-(--bg) text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(51,109,255,0.06),transparent_70%)] pointer-events-none" />
      <Container className="relative z-10">
        <span className="inline-block text-xs font-heading font-semibold uppercase tracking-wider text-(--primary) mb-4">Будьте в курсе</span>
        <h2 className="text-display-3 md:text-display-2 font-heading text-(--on-bg-high) mb-6">Следите за новостями проекта</h2>
        <p className="text-body-2 font-sans text-(--on-bg-medium) max-w-2xl mx-auto mb-8">Подпишитесь, чтобы получать обновления о новых экспозициях, датах показа и эксклюзивных событиях.</p>
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => { e.preventDefault(); alert("Спасибо — вы подписаны!"); }}>
          <input type="email" placeholder="Ваш email" className="flex-1 rounded-lg border border-(--outline) bg-(--card) px-4 py-3 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-(--primary)" required />
          <Button type="submit" variant="filled" size="large" className="font-heading">Подписаться</Button>
        </form>
        <p className="text-xs font-sans text-(--on-bg-low) mt-4">Ваша почта в безопасности. Вы можете отписаться в любое время. <Link href="#" className="text-(--primary) underline">Политика конфиденциальности</Link>.</p>
      </Container>
    </section>
  );
}
