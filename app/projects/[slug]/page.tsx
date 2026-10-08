import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { projects } from "@/data/projects";
import Navigation from "@/components/ui/Navigation";
import Pipeline from "@/components/ui/Pipeline";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return {
    alternates: process.env.NEXT_PUBLIC_SITE_URL
      ? {
          canonical: new URL(
            `/projects/${slug}`,
            process.env.NEXT_PUBLIC_SITE_URL,
          ).toString(),
        }
      : undefined,
    title: "Swayam Badhe",
    description: p?.summary,
  };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  return (
    <>
      <Navigation detail />
      <main id="main" className={"project-page " + slug}>
        <div className="detail-orb" aria-hidden="true" />
        <header className="detail-header">
          <Link
            className="text-link"
            href={"/#" + (slug === "clearpath-ai" ? "projects" : slug)}
          >
            <ArrowLeft size={16} /> Back to the journey
          </Link>
          <p className="eyebrow">PROJECT / {project.subtitle}</p>
          <h1>{project.name}</h1>
          <p className="detail-lead">{project.summary}</p>
          {project.github && (
            <a
              className="button secondary"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              View source on GitHub <ArrowUpRight size={16} />
            </a>
          )}
        </header>
        <div className="detail-body">
          <aside className="detail-nav" aria-label="Project sections">
            {[
              "Overview",
              "Problem",
              "Architecture",
              "Engineering Decisions",
              "Technology",
              "Implementation",
              "Metrics",
              "Outcome",
            ]
              .filter((s) => s !== "Metrics" || project.metrics.length > 0)
              .map((s) => (
                <a key={s} href={"#" + s.toLowerCase().replaceAll(" ", "-")}>
                  {s}
                </a>
              ))}
          </aside>
          <div className="detail-content">
            <section id="overview">
              <h2>Overview</h2>
              <p>{project.summary}</p>
            </section>
            <section id="problem">
              <h2>Problem</h2>
              <p>{project.problem}</p>
            </section>
            <section id="architecture">
              <h2>Architecture</h2>
              {project.architecture.map((steps, i) => (
                <Pipeline key={i} steps={steps} />
              ))}
            </section>
            <section id="engineering-decisions">
              <h2>Engineering Decisions</h2>
              <ul>
                {project.decisions.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </section>
            <section id="technology">
              <h2>Technology</h2>
              <div className="tags">
                {project.stack.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </section>
            <section id="implementation">
              <h2>Implementation</h2>
              <ul>
                {project.implementation.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </section>
            {project.metrics.length > 0 && (
              <section id="metrics">
                <h2>Metrics</h2>
                <div className="metrics">
                  {project.metrics.map(([v, l]) => (
                    <div key={l}>
                      <strong>{v}</strong>
                      <span>{l}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
            <section id="outcome">
              <h2>Outcome</h2>
              <p>{project.outcome}</p>
            </section>
            <Link className="text-link" href="/#contact">
              Connect with Swayam <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
