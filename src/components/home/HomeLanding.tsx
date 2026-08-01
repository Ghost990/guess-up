"use client";

import Link from "next/link";
import { useEffect } from "react";
import { CategoryBadge } from "@/components/game/CategoryBadge";
import { LanguageSwitch } from "@/components/game/LanguageSwitch";
import { Logo } from "@/components/game/Logo";
import {
  ArrowGlyph,
  PhoneGlyph,
  PlayersGlyph,
  TimerGlyph,
  TrophyGlyph,
} from "@/components/icons";
import { PackScene } from "@/components/illustrations";
import { messages } from "@/i18n/translations";
import { useGameStore } from "@/stores/gameStore";

const categories = ["draw", "explain", "signal"] as const;
const stepIcons = [PlayersGlyph, PhoneGlyph, TimerGlyph, TrophyGlyph];
const worlds = [
  { id: "classic", asset: "classic-hungarian-party" },
  { id: "movies", asset: "movies-cinema-reel" },
  { id: "series", asset: "series-episode-screen" },
  { id: "gaming", asset: "gaming-pixel-arcade" },
] as const;

export function HomeLanding() {
  const language = useGameStore((state) => state.language);
  const setLanguage = useGameStore((state) => state.setLanguage);
  const copy = messages[language].home;

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <main className="home-page">
      <header className="home-topbar">
        <Link className="brand-link" href="/" aria-label={copy.homeLabel}>
          <Logo />
        </Link>
        <div className="home-topbar__actions">
          <a className="home-nav-link" href="#how-it-works">
            {copy.navigation.howItWorks}
          </a>
          <LanguageSwitch language={language} onChange={setLanguage} compact />
          <Link className="home-nav-cta" href="/new-game">
            {copy.navigation.newGame}
            <ArrowGlyph aria-hidden="true" size={17} />
          </Link>
        </div>
      </header>

      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero__copy">
          <p className="home-kicker">{copy.hero.kicker}</p>
          <h1 id="home-title">{copy.hero.title}</h1>
          <p className="home-hero__description">{copy.hero.description}</p>
          <div className="home-hero__actions">
            <Link className="primary-button home-link-button" href="/new-game">
              {copy.hero.primaryAction}
              <ArrowGlyph aria-hidden="true" size={21} />
            </Link>
            <a className="secondary-button home-link-button" href="#how-it-works">
              {copy.hero.secondaryAction}
            </a>
          </div>
        </div>

        <div className="home-hero__board" aria-label={copy.hero.previewLabel}>
          <div className="home-hero__art" aria-hidden="true">
            <PackScene coverAsset="classic-hungarian-party" variant="setup" />
          </div>
          <div className="home-hero__category-strip">
            {categories.map((category) => (
              <CategoryBadge key={category} category={category} language={language} />
            ))}
          </div>
          <p>{copy.hero.previewCaption}</p>
        </div>
      </section>

      <section className="home-section home-how" id="how-it-works" aria-labelledby="how-title">
        <div className="home-section__heading">
          <h2 id="how-title">{copy.howItWorks.title}</h2>
          <p>{copy.howItWorks.intro}</p>
        </div>
        <ol className="home-how__steps">
          {copy.howItWorks.steps.map((step, index) => {
            const Icon = stepIcons[index] ?? PlayersGlyph;
            return (
              <li key={step.title}>
                <span className="home-how__icon" aria-hidden="true">
                  <Icon size={30} />
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="home-section home-categories" aria-labelledby="categories-story-title">
        <div className="home-section__heading">
          <h2 id="categories-story-title">{copy.categories.title}</h2>
          <p>{copy.categories.intro}</p>
        </div>
        <div className="home-categories__grid">
          {categories.map((category) => (
            <article key={category} className="home-category-card" data-category={category}>
              <CategoryBadge category={category} language={language} />
              <h3>{copy.categories.items[category].title}</h3>
              <p>{copy.categories.items[category].description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section home-worlds" aria-labelledby="worlds-title">
        <div className="home-section__heading">
          <h2 id="worlds-title">{copy.worlds.title}</h2>
          <p>{copy.worlds.intro}</p>
        </div>
        <div className="home-worlds__shelf">
          {worlds.map((world) => (
            <article className="home-world-card" key={world.id}>
              <div className="home-world-card__art" aria-hidden="true">
                <PackScene coverAsset={world.asset} variant="cover" />
              </div>
              <h3>{copy.worlds.items[world.id].title}</h3>
              <p>{copy.worlds.items[world.id].description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-final-cta" aria-labelledby="final-cta-title">
        <div>
          <h2 id="final-cta-title">{copy.finalCta.title}</h2>
          <p>{copy.finalCta.description}</p>
        </div>
        <Link className="primary-button home-link-button" href="/new-game">
          {copy.finalCta.action}
          <ArrowGlyph aria-hidden="true" size={21} />
        </Link>
      </section>

      <footer className="home-footer">
        <Logo compact />
        <p>{copy.footer}</p>
      </footer>
    </main>
  );
}
