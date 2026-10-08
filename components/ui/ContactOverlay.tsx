import { ArrowUpRight, Mail, FileText } from "lucide-react";
import { owner } from "@/data/navigation";
import Label from "./DestinationLabel";
import SocialLinks from "./SocialLinks";
export default function ContactOverlay({ year }: { year: number }) {
  return (
    <>
      <section id="contact" className="destination contact">
        <div className="content-column">
          <Label index={8} />
          <p className="meaning">Every journey comes back to people.</p>
          <h2>
            Let&apos;s build
            <br />
            <em>what comes next.</em>
          </h2>
          <p className="contact-name">{owner.name}</p>
          <p className="summary">
            Software engineering, full-stack development, and applied AI.
            <br />
            {owner.location}
          </p>
          <a className="email-link" href={"mailto:" + owner.email}>
            {owner.email}
            <ArrowUpRight size={20} />
          </a>
          <div className="contact-actions">
            <a className="button primary" href={"mailto:" + owner.email}>
              <Mail size={16} /> Email
            </a>
            <a
              className="button secondary"
              href={owner.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText size={16} /> Resume
            </a>
          </div>
          <SocialLinks />
        </div>
        <footer>
          <span>© {year} Swayam Rohidas Badhe</span>
          <a href="#home">
            Back to Earth <ArrowUpRight size={14} />
          </a>
        </footer>
      </section>
    </>
  );
}
