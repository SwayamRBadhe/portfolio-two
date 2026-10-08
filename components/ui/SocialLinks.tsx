import { Github, Linkedin, ArrowUpRight } from "lucide-react";
import { owner } from "@/data/navigation";
export default function SocialLinks() {
  return (
    <div className="social-links">
      <a href={owner.github} target="_blank" rel="noopener noreferrer">
        <Github size={15} /> GitHub <ArrowUpRight size={13} />
      </a>
      <a href={owner.linkedin} target="_blank" rel="noopener noreferrer">
        <Linkedin size={15} /> LinkedIn <ArrowUpRight size={13} />
      </a>
    </div>
  );
}
