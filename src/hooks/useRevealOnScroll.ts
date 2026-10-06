import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../utils/motion";

type RevealOptions = {
  childSelector?: string;
  staggerChildren?: boolean;
  staggerStepMs?: number;
  visibleClassName?: string;
  runOnce?: boolean;
};

export function useRevealOnScroll<T extends HTMLElement>({
  childSelector = "[data-reveal-child]",
  staggerChildren = false,
  staggerStepMs = 90,
  visibleClassName = "is-visible",
  runOnce = true
}: RevealOptions = {}) {
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    if (staggerChildren) {
      element
        .querySelectorAll<HTMLElement>(childSelector)
        .forEach((child, index) => {
          child.style.setProperty("--reveal-delay", `${index * staggerStepMs}ms`);
        });
    }

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      element.classList.add(visibleClassName);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add(visibleClassName);

          if (runOnce) {
            observer.disconnect();
          }
        } else if (!runOnce) {
          element.classList.remove(visibleClassName);
        }
      },
      {
        rootMargin: "0px 0px -80px 0px",
        threshold: 0.12
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [childSelector, runOnce, staggerChildren, staggerStepMs, visibleClassName]);

  return elementRef;
}
