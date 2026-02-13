import { useState, useMemo, useRef, useEffect } from "react";
import "./App.css";

function LoveEnvelope({ onFirstOpen }) {
  const [stage, setStage] = useState("closed");

  const handleClick = () => {
    if (stage === "closed") {
      onFirstOpen?.(); // start music
      setStage("opening");
      setTimeout(() => setStage("open"), 800);
    } else if (stage === "open") {
      setStage("closed");
    }
  };

  return (
    <div
      className="envelope-wrapper"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      aria-label={stage === "open" ? "Close love letter" : "Open love letter"}
    >
      <p className="envelope-hint">
        {stage === "open" ? "Tap to close 💌" : "Tap to open 💌"}
      </p>

      <div
        className={`letter-clip ${
          stage !== "closed" ? "letter-clip--open" : ""
        }`}
      >
        <div className={`letter ${stage === "open" ? "letter-out" : ""}`}>
          <div className="letter-inner">
            <span className="letter-heart">❤️</span>
            <h2 className="letter-title">My Love Letter</h2>
            <p className="letter-body">
              I don't need a special day to love you… but I'm grateful I get to
              celebrate you today. Thank you for being my happiness, my best
              friend, and my home. I love you more than words can say.
            </p>
            <p className="letter-sign">— Forever yours 🌸</p>
          </div>
        </div>

        <div className={`envelope ${stage}`}>
          <div className="envelope-back" />
          <div className="envelope-flap-left" />
          <div className="envelope-flap-right" />
          <div className="envelope-flap-bottom" />
          <div className="envelope-flap-top" />
          <div
            className={`envelope-seal ${stage !== "closed" ? "seal-open" : ""}`}
          >
            ❤
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const audioRef = useRef(null);

  useEffect(() => {
    const startMusic = () => {
      const audio = audioRef.current;
      if (!audio) return;

      audio.volume = 0;
      audio.play().catch(() => {});

      let vol = 0;
      const fade = setInterval(() => {
        vol += 0.05;
        if (vol >= 1) {
          vol = 1;
          clearInterval(fade);
        }
        audio.volume = vol;
      }, 60);

      window.removeEventListener("click", startMusic);
      window.removeEventListener("scroll", startMusic);
      window.removeEventListener("touchstart", startMusic);
    };

    window.addEventListener("click", startMusic);
    window.addEventListener("scroll", startMusic);
    window.addEventListener("touchstart", startMusic);

    return () => {
      window.removeEventListener("click", startMusic);
      window.removeEventListener("scroll", startMusic);
      window.removeEventListener("touchstart", startMusic);
    };
  }, []);

  const firstDate = new Date("2025-12-14");
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - firstDate.getTime());
  const daysTogether = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  /* MUSIC PLAYER WITH FADE-IN */
  const playMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0;
    audio.play().catch(() => {});

    let vol = 0;
    const fade = setInterval(() => {
      vol += 0.05;
      if (vol >= 1) {
        vol = 1;
        clearInterval(fade);
      }
      audio.volume = vol;
    }, 60);
  };

  const photos = ["/photos/pic1.jpg", "/photos/pic2.jpg", "/photos/pic3.jpg"];

  const hearts = useMemo(() => {
    return Array.from({ length: 20 }).map(() => ({
      left: Math.random() * 85,
      size: 10 + Math.random() * 24,
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
      >
        <div className={`card-inner ${open ? "flipped" : ""}`}>
          <div className="card-front">
            <div className="heart-icon"></div>
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
          Happy Valentine's Day
          <br /> &amp; Happy Monthsary
        </h1>
        <h2 className="subtitle">
          Celebrating <span className="day-count">{daysTogether}</span> days of
          love
        </h2>
      </header>

      {/* AUDIO PLAYER */}
      <audio ref={audioRef} src="/valentine.mp3" loop />

      <section className="gallery">
        {photos.map((photo, i) => (
          <FlipCard key={i} photo={photo} />
        ))}
      </section>

      {/* PASS PLAY FUNCTION */}
      <LoveEnvelope onFirstOpen={playMusic} />

      <div className="hearts" aria-hidden="true">
        {hearts.map((h, i) => (
          <div
            key={i}
            className="heart"
            style={{
              left: h.left + "vw",
              fontSize: h.size + "px",
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
