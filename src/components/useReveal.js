import { useEffect, useRef } from "react";

export function useReveal(options = {}) {
  const ref = useRef(null);
  const { threshold = 0.15, rootMargin = "0px", repeat = false } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          if (!repeat) observer.unobserve(el);
        } else if (repeat) {
          el.classList.remove("visible");
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, repeat]);

  return ref;
}
