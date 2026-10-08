import { ArrowRight } from "lucide-react";
export default function Pipeline({ steps }: { steps: readonly string[] }) {
  return (
    <ol className="pipeline" aria-label="Architecture flow">
      {steps.map((step, i) => (
        <li key={step}>
          <span>{step}</span>
          {i < steps.length - 1 && <ArrowRight size={13} aria-hidden="true" />}
        </li>
      ))}
    </ol>
  );
}
