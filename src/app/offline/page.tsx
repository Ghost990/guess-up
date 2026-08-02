import Link from "next/link";
import { Logo } from "@/components/game/Logo";

export default function OfflinePage() {
  return (
    <main className="offline-page">
      <section className="offline-card">
        <Logo />
        <p className="setup-tagline">OFFLINE</p>
        <h1>Nincs kapcsolat</h1>
        <p>
          A korábban megnyitott játék továbbra is működik. Csatlakozz újra, vagy nyisd meg a
          játékot a mentett alkalmazásból.
        </p>
        <div className="offline-actions">
          <Link className="primary-button" href="/new-game">Játék megnyitása</Link>
          <Link className="secondary-button" href="/">Kezdőlap</Link>
        </div>
      </section>
    </main>
  );
}
