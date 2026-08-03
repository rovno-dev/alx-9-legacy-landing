import Link from "next/link";
import { Container } from "@/components/ui/container";
import Logotype from "./logotype/logotype";
import { ThemeSwitcher } from "./theme-switcher";
import {
  TelegramLogotypeMonoIcon,
  VKLogotypeMonoIcon,
  DprofileLogotypeMonoIcon,
  PinterestLogotypeMonoIcon,
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import LogotypeIcon from "./logotype/logotype-icon";

function SocialMediaIcons({ className }: { className?: string }) {
  const socialIcons = [
    { icon: <TelegramLogotypeMonoIcon />, href: "https://t.me/rovno_dev" },
    { icon: <VKLogotypeMonoIcon />, href: "https://vk.com/rovno_dev" },
    { icon: <DprofileLogotypeMonoIcon />, href: "https://dprofile.ru/rovno_dev" },
    { icon: <PinterestLogotypeMonoIcon />, href: "https://pinterest.com/rovno_dev" },
  ];

  return (
    <div className={className}>
      <div className="flex gap-1">
        {socialIcons.map((item, key) => (
          <Button variant="text" key={key} size="icon-large" asChild>
            <Link href={item.href} target="_blank" rel="noopener noreferrer">
              {item.icon}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-(--bg) border-t border-(--outline) py-16 mt-auto">
      <Container>
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <LogotypeIcon className="h-6 w-auto" />
              <span className="font-heading font-bold text-xl">ALX-9</span>
            </div>
            <p className="text-sm font-sans text-(--on-bg-low) max-w-xs">
              Демонстрационный проект, созданный в рамках портфолио. Все совпадения с реальными событиями и организациями случайны.
            </p>
            <ThemeSwitcher />
          </div>
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-(--on-bg-low) mb-4">Навигация</h4>
            <ul className="space-y-2 font-sans text-sm">
              <li><Link href="#about" className="hover:text-(--primary) transition-colors">Концепция</Link></li>
              <li><Link href="#event" className="hover:text-(--primary) transition-colors">Что ждет</Link></li>
              <li><Link href="#schedule" className="hover:text-(--primary) transition-colors">Программа</Link></li>
              <li><Link href="#tickets" className="hover:text-(--primary) transition-colors">Билеты</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-(--on-bg-low) mb-4">Информация</h4>
            <ul className="space-y-2 font-sans text-sm">
              <li><Link href="#" className="hover:text-(--primary) transition-colors">Политика конфиденциальности</Link></li>
              <li><Link href="#" className="hover:text-(--primary) transition-colors">Условия использования</Link></li>
              <li><Link href="#" className="hover:text-(--primary) transition-colors">Контактная информация</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-(--on-bg-low) mb-4">Социальные сети</h4>
            <ul className="space-y-2 font-sans text-sm">
              <li><Link href="#" className="flex items-center gap-2 hover:text-(--primary) transition-colors"><TelegramLogotypeMonoIcon className="size-4" /> Telegram</Link></li>
              <li><Link href="#" className="flex items-center gap-2 hover:text-(--primary) transition-colors"><VKLogotypeMonoIcon className="size-4" /> VKontakte</Link></li>
              <li><Link href="#" className="flex items-center gap-2 hover:text-(--primary) transition-colors"><DprofileLogotypeMonoIcon className="size-4" /> Dprofile</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-(--outline) pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-(--on-bg-low)">
          <span>&copy; 2030 ALX-9. Демонстрационный проект.</span>
          <span>Design & Code: Niyaz Gimadiev</span>
        </div>
      </Container>
    </footer>
  );
}