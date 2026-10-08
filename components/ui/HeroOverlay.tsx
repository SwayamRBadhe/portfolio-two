import { ArrowDown, ArrowUpRight } from "lucide-react";
import { owner } from "@/data/navigation";
import SocialLinks from "./SocialLinks";
export default function HeroOverlay() {
  return (
    <>
      <section id="home" className="hero destination">
        <div className="hero-content">
          <div className="hero-location">
            <span /> {owner.location} <span className="location-rule" /> HOME
            BASE
          </div>
          <p className="owner-name">Swayam Rohidas Badhe</p>
          <h1>
            Engineering systems.
            <br />
            <em>Exploring intelligence.</em>
          </h1>
          <p className="hero-role">
            Software Engineer <span>/</span> Full Stack Developer <span>/</span>{" "}
            AI/ML
          </p>
          <p className="hero-intro">
            From production systems to applied AI.
            <br />A journey through the work, and the thinking behind it.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#experience">
              Begin journey <ArrowDown size={17} />
            </a>
            <a
              className="button secondary"
              href={owner.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume <ArrowUpRight size={17} />
            </a>
          </div>
          <SocialLinks />
        </div>
        <div className="hero-bottom">
          <span>A PERSONAL PORTFOLIO</span>
          <span>
            One continuous voyage.
            <br />
            <small>Explore at your own pace.</small>
          </span>
          <a href="#experience" aria-label="Scroll to experience">
            <ArrowDown size={24} strokeWidth={1} />
          </a>
        </div>
      </section>
    </>
  );
}
