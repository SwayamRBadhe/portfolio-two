import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { destinations } from "@/data/navigation";
import Label from "./DestinationLabel";
import SystemMap from "./SystemMap";
import Pipeline from "./Pipeline";
export default function ProjectOverlay({ selected, setSelected, }: {
    selected: number;
    setSelected: (index: number) => void;
}) {
    return (<>
      {projects.slice(0, 2).map((p, i) => (<section id={i === 0 ? "projects" : "tenantlens"} key={p.slug} className={"destination project composed-destination composition-" + p.slug}>
          <div className="content-column destination-copy">
            <Label index={i + 4}/>
            <p className="meaning">{destinations[i + 4].meaning}</p>
            <h2>{p.name}</h2>
            <h3 className="project-subtitle">{p.subtitle}</h3>
          </div>
          <div className="system-window"><SystemMap kind={i===0?"ai-station":"tenant"} selected={selected} onSelect={setSelected}/></div>
          <div className="destination-notes">
            <p className="summary">{p.summary}</p>
            <div className="tags compact">
              {p.stack.map((t) => (<span key={t}>{t}</span>))}
            </div>
            <div className="discovery-links">
              <Link className="text-link" href={"/projects/" + p.slug}>
                Explore the engineering <ArrowUpRight size={17}/>
              </Link>
              <a className="text-link" href={p.github} target="_blank" rel="noopener noreferrer">
                GitHub <ArrowUpRight size={17}/>
              </a>
            </div>
            {i === 0 && (<p className="fine-print">
                An information and decision-support project. Not legal advice.
              </p>)}
          </div>
          <div className="scene-evidence">
            {p.metrics.length > 0 ? (<div className="metrics">
                {p.metrics.map(([v, l]) => (<div key={l}>
                    <strong>{v}</strong>
                    <span>{l}</span>
                  </div>))}
              </div>) : (<div className="moon-services" aria-label="TenantLens services">
                {projects[1].architecture.map(path => path[path.length - 1]).map((s, n) => (<button key={s} onClick={() => setSelected(n)} aria-pressed={selected === n} className={selected === n ? "selected" : ""}>
                    <span className="service-dot"/>
                    <span>{s}</span>
                    <ArrowUpRight size={14}/>
                  </button>))}
              </div>)}
          </div>
          {i === 0 && (<div className="scene-bridge dual-path">
              <p className="eyebrow">TWO PATHS. ONE APPLICATION.</p>
              <div className="reasoning-paths">
                {p.architecture.map((steps, n) => (<Pipeline steps={steps} key={n}/>))}
              </div>
            </div>)}
        </section>))}
    </>);
}
