import { experience } from "@/data/experience";
import { destinations } from "@/data/navigation";
import Label from "./DestinationLabel";
import SystemMap from "./SystemMap";
import Pipeline from "./Pipeline";
export default function ExperienceOverlay() {
  return (
    <>
      {experience.map((job, i) => (
        <section
          key={job.id}
          id={job.id}
          className={
            "destination experience composed-destination composition-" + job.id
          }
        >
          <div className="content-column destination-copy">
            <Label index={i + 1} />
            <p className="meaning">{destinations[i + 1].meaning}</p>
            <h2>{job.title}</h2>
            <div className="job-identity">
              <h3>{job.company}</h3>
              {"team" in job && <p>{job.team}</p>}
              <p>{job.role}</p>
              <div className="job-meta">
                <span>{job.dates}</span>
                <span>{job.location}</span>
              </div>
            </div>
          </div>
          <div className="system-window"><SystemMap kind={i===0?"station":i===1?"mars":"jupiter"}/></div>
          <div className="destination-notes">
            <p className="summary">{job.summary}</p>
            <ul className="work-points">
              {job.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div className="scene-evidence">
            <div className="metrics">
              {job.metrics.map(([value, label]) => (
                <div key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="scene-bridge">
            <Pipeline steps={job.pipeline} />
            <div className="tags compact">
              {job.tech.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
