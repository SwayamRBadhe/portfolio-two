"use client";
import HeroOverlay from "./ui/HeroOverlay";
import ExperienceOverlay from "./ui/ExperienceOverlay";
import ProjectOverlay from "./ui/ProjectOverlay";
import EducationOverlay from "./ui/EducationOverlay";
import ProbeOverlay from "./ui/ProbeOverlay";
import ContactOverlay from "./ui/ContactOverlay";
import dynamic from "next/dynamic";
import { Component, useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useMotionValue, useReducedMotion, motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Navigation from "./ui/Navigation";
import SceneAnnotations, { AnnotationRegistry } from "./ui/SceneAnnotations";
import SkillsSystem from "./ui/SkillsSystem";
import { destinations } from "@/data/navigation";
import { beltProgress } from "./space/asteroidLayout";
import { progressAtScroll } from "./space/JourneyController";
const SpaceCanvas = dynamic(() => import("./space/SpaceCanvas"), {
  ssr: false,
});
class SceneBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
export default function Journey({ year }: { year: number }) {
  const progress = useMotionValue(0);
  const focusOffsets = useRef<number[]>(Array(9).fill(0));
  const reduced = !!useReducedMotion();
  const [mobile, setMobile] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [beltActive, setBeltActive] = useState(false);
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState(0);
  const [annotations] = useState(() => new Map<string, HTMLDivElement>());
  const onFailure = useCallback(() => setFailed(true), []);
  useEffect(() => {
    const media = matchMedia("(max-width: 900px)");
    const sync = () => setMobile(media.matches);

    media.addEventListener("change", sync);
    const setupFrame = requestAnimationFrame(() => {
      sync();
      try {
        const canvas = document.createElement("canvas");
        if (!canvas.getContext("webgl2") && !canvas.getContext("webgl"))
          setFailed(true);
        else {
          const context = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
          context?.getExtension("WEBGL_lose_context")?.loseContext();
          setReady(true);
        }
      } catch {
        setFailed(true);
      }
    });
    return () => {
      cancelAnimationFrame(setupFrame);
      media.removeEventListener("change", sync);
    };
  }, []);
  useEffect(() => {
    let anchors: number[] = [];
    let frame = 0;
    const measure = () => {
      focusOffsets.current = destinations.map(d => {
        const section = document.getElementById(d.id);
        const stage = section?.querySelector<HTMLElement>(".system-window");
        return section && stage && stage.offsetHeight>0 ? stage.getBoundingClientRect().top + window.scrollY + stage.offsetHeight/2 - (section.offsetTop + section.offsetHeight/2) : 0;
      });
      anchors = destinations.map((d) =>
        Math.max(
          0,
          (document.getElementById(d.id)?.offsetTop ?? 0) +
            (document.getElementById(d.id)?.offsetHeight ?? 0) / 2 -
            window.innerHeight / 2,
        ),
      );
    };
    const update = () => {
      frame = 0;
      const value = progressAtScroll(window.scrollY, anchors);
      progress.set(value);
      const belt = document.getElementById("skills");
      const flight=belt?.querySelector<HTMLElement>(".belt-flight"),cockpit=belt?.querySelector<HTMLElement>(".belt-cockpit");
      const travel=flight&&cockpit?beltProgress(flight.getBoundingClientRect().top,flight.offsetHeight,cockpit.offsetHeight):0;
      setBeltActive(!!flight && travel>.065 && travel<.91);
      setActive(Math.min(8, Math.round(value * 8)));
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    measure();
    scroll();
    const resize = () => {
      measure();
      scroll();
    };
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", resize);
    const observer = new ResizeObserver(resize);
    observer.observe(document.body);
    return () => {
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", resize);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [progress]);
  return (
    <AnnotationRegistry.Provider value={annotations}>
      <Navigation />
      <div
        className={
          ready && !failed ? "space-environment has-webgl" : "space-environment"
        }
        aria-hidden="true"
        data-destination={destinations[active].id}
      >
        <div className={"fallback-world world-" + active}>
          <div className="fallback-planet" />
        </div>
        {ready && (
          <SceneBoundary onFailure={onFailure}>
            <SpaceCanvas
              model={{ progress, reduced, mobile, focusOffsets, beltActive }}
              selected={selected}
              onFailure={onFailure}
              disabled={failed}
            />
          </SceneBoundary>
        )}
      </div>
      <SceneAnnotations enabled={ready && !failed && !beltActive} />
      <div className="window-edge" aria-hidden="true" />
      <aside className="journey-rail" aria-label="Journey destinations">
        {destinations.map((d, i) => (
          <a
            href={"#" + d.id}
            key={d.id}
            aria-label={d.label + " — " + d.name}
            aria-current={!beltActive && active === i ? "location" : undefined}
          >
            <span />
            {!beltActive && active === i && <small>{d.name}</small>}
          </a>
        ))}
      </aside>
      <div className="flight-caption" aria-hidden="true">
        <span>{beltActive ? "Technology belt / Engineering toolkit" : destinations[active].label}</span>
        <span>
          SCROLL TO TRAVEL <ArrowDown size={12} />
        </span>
      </div>
      <main id="main" data-scene-enhanced={ready && !failed}>
        <HeroOverlay />
        <ExperienceOverlay />
        <ProjectOverlay selected={selected} setSelected={setSelected} />
        <SkillsSystem webglAvailable={ready && !failed} />
        <EducationOverlay />
        <ProbeOverlay />
        <ContactOverlay year={year} />
      </main>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
    </AnnotationRegistry.Provider>
  );
}
