import { education, certification } from "@/data/education";
import { destinations } from "@/data/navigation";
import SystemMap from "./SystemMap";
import Label from "./DestinationLabel";
export default function EducationOverlay() {
  return (
    <section
      id="education"
      className="destination education composed-observatory"
    >
      <div className="content-column">
        <div className="education-intro">
          <Label index={6} />
          <p className="meaning">{destinations[6].meaning}</p>
          <h2>
            Grounded in knowledge.
            <br />
            <em>Open to what&apos;s next.</em>
          </h2>
        </div>
        <div className="system-window"><SystemMap kind="observatory"/></div>
        <div className="education-timeline">
          {[...education].reverse().map((e) => (
            <article key={e.degree}>
              <div className="timeline-point" aria-hidden="true" />
              <p className="job-meta">{e.dates}</p>
              <h3>{e.degree}</h3>
              <p>{e.institution}</p>
              <span className="education-result">{e.result}</span>
            </article>
          ))}
        </div>
        <div className="certification">
          <span className="certification-beacon" aria-hidden="true" />
          <h3>{certification}</h3>
        </div>
      </div>
    </section>
  );
}
