import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import Label from "./DestinationLabel";
export default function ProbeOverlay() {
  return (
    <>
      <section id="timelens" className="destination discovery">
        <div className="content-column">
          <Label index={7} />
          <p className="meaning">
            A smaller signal. A different kind of curiosity.
          </p>
          <h2>TimeLens</h2>
          <h3 className="project-subtitle">
            See the world on any
            <br />
            day in history.
          </h3>
          <div className="system-window probe-window" aria-hidden="true"/>
          <p className="summary">
            An experimental historical discovery project. A small exploration
            probe encountered along the way.
          </p>
          <div className="tags">
            {projects[2].stack.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <div className="discovery-links">
            <Link className="text-link" href="/projects/timelens">
              Project details <ArrowUpRight size={17} />
            </Link>
            <a
              className="text-link"
              href={projects[2].github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
