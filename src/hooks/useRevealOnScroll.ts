import { useEffect, useRef } from "react";

export function useRevealOnScroll<T extends HTMLElement>() {
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      element.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          observer.disconnect();
        }
      },
      {
        rootMargin: "0px 0px -80px 0px",
        threshold: 0.12
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return elementRef;
}
