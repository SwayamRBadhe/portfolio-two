"use client";
import { createContext, useCallback, useContext } from "react";
import { sceneAnnotations } from "@/data/scene-annotations";

export const AnnotationRegistry = createContext<Map<string, HTMLDivElement> | null>(null);
export const annotationId = (index: number, title: string) => `${index}:${title}`;

function Annotation({ index, title, note }: { index: number; title: string; note?: string }) {
  const registry = useContext(AnnotationRegistry);
  const id = annotationId(index, title);
  const attach = useCallback((node: HTMLDivElement | null) => {
    if (node) registry?.set(id, node);
    else registry?.delete(id);
  }, [id, registry]);
  return <div ref={attach} className="spatial-label" data-annotation={id}>
    <strong>{title}</strong>{note && <span>{note}</span>}{index===3?<span className="lunar-label-stem"/>:<span className="scene-label-stem"/>}
  </div>;
}

/** DOM belongs to the page's existing React root. The scene only updates position styles. */
export default function SceneAnnotations({ enabled }: { enabled: boolean }) {
  return <div className="scene-annotations" aria-hidden="true" data-enabled={enabled}>
    {sceneAnnotations.map(annotation => <Annotation key={annotationId(annotation.index, annotation.title)} {...annotation} />)}
  </div>;
}
