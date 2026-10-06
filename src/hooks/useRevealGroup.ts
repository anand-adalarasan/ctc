import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../utils/motion";

// Reveals every descendant matching `selector` (adds `.is-visible`) the first
// time it scrolls into view. Unlike useRevealOnScroll, each element is
// observed independently, so a long page reveals band by band.
export function useRevealGroup<T extends HTMLElement>(selector: string) {
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reveals = Array.from(container.querySelectorAll<HTMLElement>(selector));

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      reveals.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12%", threshold: 0.12 }
    );

    reveals.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [selector]);

  return containerRef;
}
