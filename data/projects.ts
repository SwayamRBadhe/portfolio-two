export interface Project {
  slug: string;
  name: string;
  subtitle: string;
  summary: string;
  problem: string;
  stack: string[];
  architecture: string[][];
  decisions: string[];
  implementation: string[];
  metrics: [string, string][];
  outcome: string;
  github?: string;
}
export const projects: Project[] = [
  {
    slug: "clearpath-ai",
    github: "https://github.com/SwayamRBadhe/clearpath-ai",
    name: "ClearPath AI",
    subtitle: "US Immigration Assistant",
    summary:
      "A full-stack AI assistant bringing source-grounded retrieval and explainable machine learning into one application.",
    problem:
      "Immigration information is spread across detailed official documents. ClearPath combines retrieval from USCIS sources with a separate, explainable prediction path to make information easier to explore. It is an information tool, not legal advice.",
    stack: [
      "Python",
      "FastAPI",
      "React",
      "PostgreSQL",
      "LangChain",
      "FAISS",
      "Scikit-learn",
      "SHAP",
    ],
    architecture: [
      ["React", "FastAPI", "RAG", "FAISS", "4 USCIS documents"],
      ["React", "FastAPI", "Random Forest", "SHAP"],
    ],
    decisions: [
      "Separate document retrieval from model prediction so each reasoning path has a clear responsibility.",
      "Use FAISS vector search within a LangChain RAG pipeline for retrieval from official USCIS documents.",
      "Pair Random Forest predictions with SHAP explainability to make model behavior interpretable.",
    ],
    implementation: [
      "React provides the interface, with FastAPI connecting the two information paths.",
      "PostgreSQL supports the application data layer.",
      "The Random Forest model was trained on 25,480 cases.",
    ],
    metrics: [
      ["25,480", "training cases"],
      ["73.6%", "model accuracy"],
      ["4", "official USCIS documents"],
    ],
    outcome:
      "A unified application for exploring retrieved information and explainable model outputs.",
  },
  {
    slug: "tenantlens",
    github: "https://github.com/SwayamRBadhe/tenantlens",
    name: "TenantLens",
    subtitle: "Renter Protection Platform",
    summary:
      "One secured platform connecting three specialized services for a clearer view of rental decisions.",
    problem:
      "Rental decisions involve several distinct questions: review credibility, rent manipulation, and neighborhood safety. TenantLens brings these services together within a central renter protection platform.",
    stack: [
      "Java",
      "Spring Boot",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Spring Security",
      "JWT",
      "REST APIs",
    ],
    architecture: [
      [
        "Secured core (Spring Security / JWT)",
        "REST APIs",
        "Fake-review detection",
      ],
      [
        "Secured core (Spring Security / JWT)",
        "REST APIs",
        "Rent manipulation scoring",
      ],
      [
        "Secured core (Spring Security / JWT)",
        "REST APIs",
        "Neighborhood safety assessment",
      ],
    ],
    decisions: [
      "Keep the central platform distinct from its three specialized service responsibilities.",
      "Use Spring Security and JWT for the secured platform.",
      "Connect Java/Spring Boot and Python/FastAPI components through REST APIs.",
    ],
    implementation: [
      "A central platform coordinates fake-review detection, rent manipulation scoring, and neighborhood safety assessment.",
      "PostgreSQL is part of the platform data stack.",
    ],
    metrics: [],
    outcome: "A multi-service renter protection platform.",
  },
  {
    slug: "timelens",
    name: "TimeLens",
    subtitle: "See the world on any day in history.",
    summary:
      "A smaller exploration project focused on discovering the world through a historical date.",
    problem:
      "TimeLens explores a simple question: what might a chosen day reveal about the world in history?",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Wikidata", "Drizzle ORM"],
    architecture: [
      ["Next.js / TypeScript", "Historical discovery", "Wikidata"],
      ["Application data", "Drizzle ORM", "PostgreSQL"],
    ],
    decisions: [
      "Use a typed Next.js application with TypeScript.",
      "Use Wikidata as the historical information source.",
      "Use Drizzle ORM alongside PostgreSQL for the data layer.",
    ],
    implementation: [
      "An experimental historical discovery project built with Next.js, TypeScript, Wikidata, PostgreSQL, and Drizzle ORM.",
      "The public repository is available for implementation details.",
    ],
    metrics: [],
    outcome: "An experiment in historical exploration.",
    github: "https://github.com/SwayamRBadhe/timelens",
  },
];
