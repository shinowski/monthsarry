import { useState, useMemo, useEffect } from "react";
import "./App.css";

export default function App() {
  const firstDate = new Date("2025-12-14");
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - firstDate.getTime());
  const daysTogether = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  useEffect(() => {
    const startMusic = () => {
      const audio = document.getElementById("song");
      if (audio) {
        audio.play().catch(() => {});
        window.removeEventListener("click", startMusic);
        window.removeEventListener("touchstart", startMusic);
      }
    };

    window.addEventListener("click", startMusic);
    window.addEventListener("touchstart", startMusic);

    return () => {
      window.removeEventListener("click", startMusic);
      window.removeEventListener("touchstart", startMusic);
    };
  }, []);

  const photos = ["/photos/pic1.jpg", "/photos/pic2.jpg", "/photos/pic3.jpg"];

  const hearts = useMemo(() => {
    return Array.from({ length: 20 }).map(() => ({
      left: Math.random() * 100,
      size: 10 + Math.random() * 30,
      duration: 8 + Math.random() * 12,
      opacity: 0.25 + Math.random() * 0.5,
      delay: Math.random() * 8,
    }));
  }, []);

  function FlipCard({ photo }) {
    const [open, setOpen] = useState(false);

    return (
      <div
        className="card"
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => e.key === "Enter" && setOpen(!open)}
        tabIndex={0}
        role="button"
        aria-label="Click to reveal photo"
      >
        <div className={`card-inner ${open ? "flipped" : ""}`}>
          <div className="card-front">
            <div className="heart-icon">❤</div>
            <p className="click-text">Click me 💋</p>
          </div>
          <div className="card-back">
            <img src={photo} alt="Us" loading="lazy" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="hero">
        <h1 className="floating-text">
          Happy Valentine's Day<br className="title-break" /> &amp; Happy Monthsary ❤️
        </h1>
        <h2 className="subtitle">
          Celebrating <span className="day-count">{daysTogether}</span> days of love 💖
        </h2>
      </header>

      <audio id="song" src="/valentine.mp3" loop />

      <section className="gallery" aria-label="Our photos">
        {photos.map((photo, i) => (
          <FlipCard key={i} photo={photo} />
        ))}
      </section>

      <section className="note" aria-label="Love letter">
        <h2>My Love Letter 💌</h2>
        <p>
          I don't need a special day to love you… but I'm grateful I get to
          celebrate you today. Thank you for being my happiness, my best friend,
          and my home. I love you more than words can say.
        </p>
      </section>

      <div className="hearts" aria-hidden="true">
        {hearts.map((h, i) => (
          <div
            key={i}
            className="heart"
            style={{
              left: h.left + "vw",
              width: h.size,
              height: h.size,
              opacity: h.opacity,
              animationDuration: h.duration + "s",
              animationDelay: h.delay + "s",
            }}
          />
        ))}
      </div>
    </div>
  );
}
