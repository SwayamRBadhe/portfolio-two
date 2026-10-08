"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X, Search } from "lucide-react";
import { destinations, navigation, owner } from "@/data/navigation";
export default function Navigation({ detail = false }: { detail?: boolean }) {
  const [menu, setMenu] = useState(false);
  const [palette, setPalette] = useState(false);
  const [query, setQuery] = useState("");
  const trigger = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((v) => !v);
      }
      if (e.key === "Escape") {
        setPalette(false);
        setMenu(false);
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);
  useEffect(() => {
    if (palette) {
      input.current?.focus();
      const before = document.body.style.overflow;
      const returnFocus = trigger.current;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = before;
        returnFocus?.focus();
      };
    }
  }, [palette]);
  const prefix = detail ? "/" : "";
  const actions = [
    ...destinations.map((d, i) => ({
      name: [
        "Home",
        "D&D Motor Systems",
        "Accenture",
        "iConsult",
        "ClearPath AI",
        "TenantLens",
        "Education",
        "TimeLens",
        "Contact",
      ][i],
      href: prefix + "#" + d.id,
    })),
    { name: "Skills", href: prefix + "#skills" },
    { name: "Resume", href: owner.resume },
    { name: "GitHub", href: owner.github },
    { name: "LinkedIn", href: owner.linkedin },
  ];
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="header">
        <Link href="/" className="brand" aria-label="Swayam Badhe home">
          <span className="brand-orbit" />
          SB<span className="brand-caption">SWAYAM BADHE</span>
        </Link>
        <nav
          className={menu ? "main-nav open" : "main-nav"}
          aria-label="Primary navigation"
        >
          {navigation.map((n) => (
            <Link
              href={prefix + n.href}
              key={n.name}
              onClick={() => setMenu(false)}
            >
              {n.name}
            </Link>
          ))}
          <a className="mobile-social" href={owner.github}>
            GitHub
          </a>
          <a className="mobile-social" href={owner.linkedin}>
            LinkedIn
          </a>
        </nav>
        <div className="nav-actions">
          <button
            ref={trigger}
            className="command-trigger"
            onClick={() => setPalette(true)}
            aria-label="Search navigation (Control or Command K)"
          >
            <Search size={15} />
            <kbd>Ctrl K</kbd>
          </button>
          <a
            className="resume-link"
            href={owner.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume <ArrowUpRight size={14} />
          </a>
          <button
            className="menu-toggle"
            onClick={() => setMenu(!menu)}
            aria-label={menu ? "Close navigation" : "Open navigation"}
            aria-expanded={menu}
          >
            {menu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>
      {palette && (
        <div className="palette-backdrop" onClick={() => setPalette(false)}>
          <div
            ref={dialog}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation console"
            className="palette"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                const elements =
                  dialog.current?.querySelectorAll<HTMLElement>(
                    "input,button,a",
                  );
                if (!elements?.length) return;
                const first = elements[0],
                  last = elements[elements.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                  e.preventDefault();
                  last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                  e.preventDefault();
                  first.focus();
                }
              }
            }}
          >
            <div className="palette-search">
              <Search size={18} />
              <input
                ref={input}
                aria-label="Search destinations and links"
                placeholder="Where would you like to go?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                onClick={() => setPalette(false)}
                aria-label="Close navigation console"
              >
                <X size={18} />
              </button>
            </div>
            <div className="palette-results">
              {actions
                .filter((a) =>
                  a.name.toLowerCase().includes(query.toLowerCase()),
                )
                .map((a) => (
                  <a
                    key={a.name}
                    href={a.href}
                    onClick={() => {
                      setPalette(false);
                      setQuery("");
                    }}
                  >
                    {a.name}
                    <ArrowUpRight size={15} />
                  </a>
                ))}
              {!actions.some((a) =>
                a.name.toLowerCase().includes(query.toLowerCase()),
              ) && <p>No matching destinations.</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
