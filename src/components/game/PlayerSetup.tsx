"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  AddGlyph,
  ArrowGlyph,
  CheckGlyph,
  DeleteGlyph,
  LayersGlyph,
  PlayersGlyph,
  TimerGlyph,
} from "@/components/icons";
import { EffectsSettings } from "@/components/effects/EffectsSettings";
import { PackScene } from "@/components/illustrations";
import { PackPicker } from "@/components/packs";
import { taskPackManifests, taskPackRegistry } from "@/content/packs";
import {
  createFreeEntitlementProvider,
  getPackSurfaceAttributes,
  resolvePackPickerItems,
} from "@/lib/packs";
import { getDefaultPackId } from "@/lib/game/wordPacks";
import { CategoryBadge } from "./CategoryBadge";
import { HowToPlay } from "./HowToPlay";
import { LanguageSwitch } from "./LanguageSwitch";
import { Logo } from "./Logo";
import { messages } from "@/i18n/translations";
import { useGameStore } from "@/stores/gameStore";
import type { Category, Difficulty } from "@/types";
import type { PackPickerItem } from "@/types/packs";

const PLAYER_STORAGE_KEY = "guessup-player-names";
const roundOptions = [1, 2, 3, 4] as const;
const durationOptions = [30000, 45000, 60000, 90000] as const;
const standardDifficultyOptions: Difficulty[] = ["easy", "medium", "hard"];
const englishDifficultyOptions: Difficulty[] = [
  "lowEnglish",
  "easy",
  "medium",
  "challenging",
  "hard",
];
const englishOnlyDifficulties: Difficulty[] = ["lowEnglish", "challenging"];
const categoryOptions: Category[] = ["draw", "explain", "signal"];

interface PlayerDraft {
  id: string;
  name: string;
}

let nextDraftId = 0;

function createDraft(name = ""): PlayerDraft {
  nextDraftId += 1;
  return { id: `player-draft-${nextDraftId}`, name };
}

function loadSavedPlayers(): PlayerDraft[] {
  if (typeof window === "undefined") return [createDraft(), createDraft()];
  try {
    const value = JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY) ?? "null");
    if (Array.isArray(value) && value.length >= 2) {
      return value.slice(0, 8).map((name) => createDraft(String(name)));
    }
  } catch {
    // A malformed convenience value should never block game setup.
  }
  return [createDraft(), createDraft()];
}

export function PlayerSetup() {
  const language = useGameStore((state) => state.language);
  const setLanguage = useGameStore((state) => state.setLanguage);
  const setupGame = useGameStore((state) => state.setupGame);
  const [players, setPlayers] = useState(loadSavedPlayers);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [roundsPerPlayer, setRoundsPerPlayer] = useState(2);
  const [roundDuration, setRoundDuration] =
    useState<(typeof durationOptions)[number]>(60000);
  const [categories, setCategories] = useState<Category[]>(categoryOptions);
  const [selectedPackId, setSelectedPackId] = useState(() => getDefaultPackId(language));
  const [packItems, setPackItems] = useState<readonly PackPickerItem[]>([]);
  const copy = messages[language];
  const selectedPack = taskPackRegistry.getById(selectedPackId);
  const packSurface = getPackSurfaceAttributes(selectedPack);
  const languageDifficultyOptions =
    language === "en" ? englishDifficultyOptions : standardDifficultyOptions;
  const difficultyOptions = selectedPack
    ? languageDifficultyOptions.filter((option) =>
        selectedPack.compatibility.difficulties.includes(option),
      )
    : languageDifficultyOptions;

  const validNames = players.map((player) => player.name.trim()).filter(Boolean);
  const hasDuplicates =
    new Set(validNames.map((name) => name.toLocaleLowerCase(language))).size !==
    validNames.length;
  const canStart = validNames.length >= 2 && !hasDuplicates && categories.length > 0;
  const totalTasks = validNames.length * roundsPerPlayer;

  useEffect(() => {
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(validNames));
  }, [validNames]);

  useEffect(() => {
    let active = true;
    const manifests = taskPackManifests.filter((manifest) => manifest.locale === language);
    const entitlementProvider = createFreeEntitlementProvider(manifests);
    void resolvePackPickerItems(manifests, entitlementProvider).then((items) => {
      if (active) setPackItems(items);
    });
    return () => {
      active = false;
    };
  }, [language]);

  const updatePlayer = (index: number, value: string) => {
    setPlayers((drafts) =>
      drafts.map((draft, playerIndex) =>
        playerIndex === index ? { ...draft, name: value } : draft,
      ),
    );
  };

  const removePlayer = (index: number) => {
    setPlayers((drafts) => drafts.filter((_, playerIndex) => playerIndex !== index));
  };

  const toggleCategory = (category: Category) => {
    setCategories((current) => {
      if (current.includes(category)) {
        return current.length === 1 ? current : current.filter((item) => item !== category);
      }
      return categoryOptions.filter((item) => [...current, category].includes(item));
    });
  };

  const handleLanguageChange = (nextLanguage: typeof language) => {
    const nextPackId = getDefaultPackId(nextLanguage);
    const nextPack = taskPackRegistry.getById(nextPackId);
    const nextDifficulty = nextLanguage === "hu" && englishOnlyDifficulties.includes(difficulty)
      ? "easy"
      : difficulty;
    setSelectedPackId(nextPackId);
    setDifficulty(
      nextPack?.compatibility.difficulties.includes(nextDifficulty)
        ? nextDifficulty
        : nextPack?.compatibility.difficulties[0] ?? "easy",
    );
    setLanguage(nextLanguage);
  };

  const handlePackSelect = (packId: string) => {
    const manifest = taskPackRegistry.getById(packId);
    if (!manifest || manifest.locale !== language) return;
    setSelectedPackId(packId);
    if (!manifest.compatibility.difficulties.includes(difficulty)) {
      setDifficulty(manifest.compatibility.difficulties[0]);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canStart) return;
    setupGame({
      playerNames: validNames,
      difficulty,
      roundsPerPlayer,
      roundDuration,
      language,
      packId: selectedPackId,
      categories,
    });
  };

  return (
    <main className="setup-page" {...packSurface}>
      <header className="topbar">
        <Logo />
        <div className="topbar-actions">
          <EffectsSettings language={language} compact />
          <HowToPlay language={language} />
          <LanguageSwitch language={language} onChange={handleLanguageChange} />
        </div>
      </header>

      <div className="setup-layout">
        <section className="setup-intro" aria-labelledby="setup-title">
          <p className="setup-tagline">{copy.setup.tagline}</p>
          <h1 id="setup-title">{copy.setup.title}</h1>
          <p className="setup-subtitle">{copy.setup.subtitle}</p>

          {selectedPack ? (
            <div className="setup-pack-art" aria-hidden="true">
              <PackScene
                coverAsset={selectedPack.visualTheme.coverAsset}
                variant="setup"
              />
            </div>
          ) : null}

          <div className="rules-list">
            <h2>{copy.setup.rulesTitle}</h2>
            <ol>
              {copy.setup.rules.map((rule, index) => (
                <li key={rule}>
                  <span>{index + 1}</span>
                  <p>{rule}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <form className="setup-form" onSubmit={handleSubmit}>
          <section className="form-section" aria-labelledby="players-title">
            <div className="section-heading">
              <span className="section-icon"><PlayersGlyph aria-hidden="true" size={19} /></span>
              <div>
                <h2 id="players-title">{copy.setup.players}</h2>
                <p>{copy.setup.minPlayers}</p>
              </div>
              <strong>{validNames.length}/8</strong>
            </div>

            <div className="player-list">
              {players.map((player, index) => (
                <div className="player-field" key={player.id}>
                  <span aria-hidden="true">{index + 1}</span>
                  <label className="sr-only" htmlFor={`player-${index}`}>
                    {copy.setup.playerPlaceholder} {index + 1}
                  </label>
                  <input
                    id={`player-${index}`}
                    value={player.name}
                    maxLength={20}
                    autoComplete="off"
                    placeholder={`${copy.setup.playerPlaceholder} ${index + 1}`}
                    onChange={(event) => updatePlayer(index, event.target.value)}
                  />
                  {players.length > 2 && (
                    <button
                      type="button"
                      className="icon-button"
                      aria-label={`${copy.setup.removePlayer}: ${player.name || index + 1}`}
                      onClick={() => removePlayer(index)}
                    >
                      <DeleteGlyph aria-hidden="true" size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {hasDuplicates && <p className="form-error">{copy.setup.duplicateNames}</p>}
            {players.length < 8 && (
              <button
                type="button"
                className="text-button"
                onClick={() => setPlayers((drafts) => [...drafts, createDraft()])}
              >
                <AddGlyph aria-hidden="true" size={18} />
                {copy.setup.addPlayer}
              </button>
            )}
          </section>

          <section className="form-section" aria-labelledby="difficulty-title">
            <div className="form-section-heading">
              <h2 id="difficulty-title">{copy.setup.difficulty}</h2>
            </div>
            <div
              className="segmented-grid segmented-grid--difficulty"
              role="radiogroup"
              aria-labelledby="difficulty-title"
            >
              {difficultyOptions.map((option) => {
                const optionCopy = copy.setup.difficultyOptions[option];
                return (
                  <label key={option}>
                    <input
                      type="radio"
                      name="difficulty"
                      value={option}
                      checked={difficulty === option}
                      onChange={() => setDifficulty(option)}
                    />
                    <span>
                      <strong>{optionCopy.label}</strong>
                      <small>{optionCopy.description}</small>
                    </span>
                  </label>
                );
              })}
            </div>
          </section>

          <section
            className="form-section"
            role="group"
            aria-labelledby="language-title"
          >
            <div className="form-section-heading">
              <h2 id="language-title">{copy.setup.gameLanguage}</h2>
              <p className="field-hint">{copy.setup.languageHint}</p>
            </div>
            <LanguageSwitch language={language} onChange={handleLanguageChange} />
          </section>

          <section className="form-section form-section--packs">
            <PackPicker
              items={packItems}
              selectedPackId={selectedPackId}
              copy={{
                heading: copy.setup.pack.heading,
                emptyMessage: copy.setup.pack.empty,
                card: {
                  selectLabel: copy.setup.pack.select,
                  selectedLabel: copy.setup.pack.selected,
                  lockedLabel: copy.setup.pack.locked,
                  audienceLabels: copy.setup.pack.audiences,
                },
              }}
              onSelect={handlePackSelect}
            />
          </section>

          <section
            className="form-section"
            role="group"
            aria-labelledby="rounds-title"
          >
            <div className="form-section-heading">
              <h2 id="rounds-title">{copy.setup.roundsPerPlayer}</h2>
              <p className="field-hint">{copy.setup.roundsHint}</p>
            </div>
            <div className="choice-row">
              {roundOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={roundsPerPlayer === option}
                  onClick={() => setRoundsPerPlayer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <p className="selection-summary">
              <LayersGlyph aria-hidden="true" size={17} />
              {copy.setup.totalTasks(totalTasks)}
            </p>
          </section>

          <section
            className="form-section"
            role="group"
            aria-labelledby="duration-title"
          >
            <div className="form-section-heading">
              <h2 id="duration-title">{copy.setup.duration}</h2>
            </div>
            <div className="choice-row choice-row--duration">
              {durationOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={roundDuration === option}
                  onClick={() => setRoundDuration(option)}
                >
                  <TimerGlyph aria-hidden="true" size={16} />
                  {option / 1000} {copy.setup.seconds}
                </button>
              ))}
            </div>
          </section>

          <section
            className="form-section"
            role="group"
            aria-labelledby="categories-title"
          >
            <div className="form-section-heading">
              <h2 id="categories-title">{copy.setup.categories}</h2>
            </div>
            <div className="category-choices">
              {categoryOptions.map((category) => (
                <button
                  key={category}
                  type="button"
                  data-category={category}
                  aria-pressed={categories.includes(category)}
                  onClick={() => toggleCategory(category)}
                >
                  <CategoryBadge category={category} language={language} />
                  {categories.includes(category) && <CheckGlyph aria-hidden="true" size={18} />}
                </button>
              ))}
            </div>
          </section>

          <div className="start-area">
            <button className="primary-button" type="submit" disabled={!canStart}>
              {copy.setup.start}
              <ArrowGlyph aria-hidden="true" size={20} />
            </button>
            {!canStart && !hasDuplicates && <p>{copy.setup.startHint}</p>}
          </div>
        </form>
      </div>
    </main>
  );
}
