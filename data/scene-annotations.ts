import { experience } from "./experience";
import { projects } from "./projects";
import { education, certification } from "./education";
// Secondary scene copy reuses the professional records; geometry owns only placement.
export const stationNotes = [
  "PHP / MySQL - " + experience[0].metrics[0].join(" "),
  experience[0].metrics[2].join(" "),
  "Git-based organization",
  "Modernization while operational",
];
export const reasoningAnnotations = [
  { labels: ["USCIS documents", "FAISS", "RAG"], notes: [projects[0].metrics[2].join(" "), "Vector search", "LangChain retrieval"] },
  { labels: ["Random Forest", "SHAP", "Explainable output"], notes: ["Predictive model", "Model explainability", "Application-ready explanation"] },
];
export const observationTitles = ["Diploma outpost", "Bachelor’s station", "Master’s observatory"];
export const architectureNotes = [
["Request entry", "Spring MVC endpoints", "Request handling", "Business logic", "JPA / Hibernate", "Indexes / query optimization"],
["Source corpus", "LangChain extraction", "Vector representations", "Vector index", "Meaning-based lookup", "LangGraph validation"],
];
export const tenantServices = projects[1].architecture.map(path => path[path.length - 1]);

export const sceneAnnotations: {index:number;title:string;note?:string}[] = [
  ...experience.flatMap((job,j)=>job.pipeline.map((title,n)=>({index:j+1,title,note:j===0?stationNotes[n]:architectureNotes[j-1][n]}))),
  ...reasoningAnnotations.flatMap(path=>path.labels.map((title,n)=>({index:4,title,note:path.notes[n]}))),
  {index:4,title:"ClearPath AI",note:"Deep-space AI research station"},
  ...projects[0].metrics.map(([title,note])=>({index:4,title,note})),
  {index:5,title:"TenantLens platform",note:"Spring Security / JWT"},
  ...tenantServices.map((title,n)=>({index:5,title,note:`Moon ${n+1} / REST API`})),
  ...observationTitles.map((title,n)=>({index:6,title,note:education[2-n].dates})),
  {index:6,title:"AWS certification beacon",note:certification},
  {index:7,title:"Historical discovery",note:"TimeLens / Wikidata"},
];
