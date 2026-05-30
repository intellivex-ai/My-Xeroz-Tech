import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reusable GSAP ScrollTrigger animation hook.
 * Scopes all selectors to a container ref for clean component-level cleanup.
 * 
 * Usage:
 *   const containerRef = useScrollAnimations(setupFn, [deps]);
 *   <div ref={containerRef}>...</div>
 * 
 * The setupFn receives (ctx, container) where ctx is the gsap.context
 * and container is the DOM element.
 */
export function useScrollAnimations(setupFn, deps = []) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      setupFn(containerRef.current);
    }, containerRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return containerRef;
}

/**
 * Pre-built animation presets for common scroll patterns.
 * Each returns a config object for gsap.fromTo or gsap.to inside ScrollTrigger.
 */
export const scrollPresets = {
  // Fade up with slight scale
  fadeUpScale: (trigger, targets, options = {}) => {
    gsap.fromTo(
      targets,
      { y: 60, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: options.duration || 1,
        stagger: options.stagger || 0.15,
        ease: options.ease || "power3.out",
        scrollTrigger: {
          trigger,
          start: options.start || "top 85%",
          toggleActions: options.toggleActions || "play none none reverse",
        },
      }
    );
  },

  // Slide from left
  slideLeft: (trigger, targets, options = {}) => {
    gsap.fromTo(
      targets,
      { x: -80, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: options.duration || 1,
        stagger: options.stagger || 0,
        ease: options.ease || "power3.out",
        scrollTrigger: {
          trigger,
          start: options.start || "top 80%",
          toggleActions: options.toggleActions || "play none none reverse",
        },
      }
    );
  },

  // Slide from right
  slideRight: (trigger, targets, options = {}) => {
    gsap.fromTo(
      targets,
      { x: 80, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: options.duration || 1,
        stagger: options.stagger || 0,
        ease: options.ease || "power3.out",
        scrollTrigger: {
          trigger,
          start: options.start || "top 80%",
          toggleActions: options.toggleActions || "play none none reverse",
        },
      }
    );
  },

  // Parallax vertical shift (scrub-based)
  parallax: (trigger, targets, options = {}) => {
    gsap.fromTo(
      targets,
      { y: options.yStart || 40 },
      {
        y: options.yEnd || -40,
        ease: "none",
        scrollTrigger: {
          trigger,
          start: options.start || "top bottom",
          end: options.end || "bottom top",
          scrub: options.scrub || 1.2,
        },
      }
    );
  },

  // Horizontal parallax shift (scrub-based)
  parallaxX: (trigger, targets, options = {}) => {
    gsap.fromTo(
      targets,
      { x: options.xStart || -30 },
      {
        x: options.xEnd || 30,
        ease: "none",
        scrollTrigger: {
          trigger,
          start: options.start || "top bottom",
          end: options.end || "bottom top",
          scrub: options.scrub || 1.5,
        },
      }
    );
  },

  // Scale reveal (zoom in from small)
  scaleReveal: (trigger, targets, options = {}) => {
    gsap.fromTo(
      targets,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: options.duration || 1.2,
        stagger: options.stagger || 0.1,
        ease: options.ease || "power4.out",
        scrollTrigger: {
          trigger,
          start: options.start || "top 85%",
          toggleActions: options.toggleActions || "play none none reverse",
        },
      }
    );
  },

  // Clip text reveal (mask from bottom)
  clipReveal: (trigger, targets, options = {}) => {
    gsap.fromTo(
      targets,
      { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        opacity: 1,
        duration: options.duration || 1.2,
        stagger: options.stagger || 0.08,
        ease: options.ease || "power4.out",
        scrollTrigger: {
          trigger,
          start: options.start || "top 85%",
          toggleActions: options.toggleActions || "play none none reverse",
        },
      }
    );
  },

  // Rotate and fade in
  rotateIn: (trigger, targets, options = {}) => {
    gsap.fromTo(
      targets,
      { rotation: options.rotStart || -5, opacity: 0, y: 30 },
      {
        rotation: 0,
        opacity: 1,
        y: 0,
        duration: options.duration || 1.0,
        stagger: options.stagger || 0.12,
        ease: options.ease || "power3.out",
        scrollTrigger: {
          trigger,
          start: options.start || "top 85%",
          toggleActions: options.toggleActions || "play none none reverse",
        },
      }
    );
  },

  // Staggered fade with alternating directions
  staggerAlternate: (trigger, targets, options = {}) => {
    gsap.utils.toArray(targets).forEach((el, i) => {
      const fromX = i % 2 === 0 ? -60 : 60;
      gsap.fromTo(
        el,
        { x: fromX, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: options.duration || 1.0,
          delay: i * (options.stagger || 0.12),
          ease: options.ease || "power3.out",
          scrollTrigger: {
            trigger,
            start: options.start || "top 80%",
            toggleActions: options.toggleActions || "play none none reverse",
          },
        }
      );
    });
  },

  // Counter animation for numbers
  countUp: (trigger, targets, options = {}) => {
    gsap.utils.toArray(targets).forEach((el) => {
      const target = parseFloat(el.getAttribute("data-target") || 0);
      const start = parseFloat(el.getAttribute("data-start") || 0);
      const suffix = el.getAttribute("data-suffix") || "";
      const isDecimal = el.getAttribute("data-decimal") === "true";
      const obj = { value: start };

      gsap.to(obj, {
        value: target,
        duration: options.duration || 2.2,
        ease: options.ease || "power2.out",
        scrollTrigger: {
          trigger,
          start: options.start || "top 85%",
          toggleActions: options.toggleActions || "play none none reverse",
        },
        onUpdate: () => {
          el.textContent = isDecimal
            ? obj.value.toFixed(1) + suffix
            : Math.floor(obj.value) + suffix;
        },
      });
    });
  },

  // Draw a border/line from 0 width/height
  lineGrow: (trigger, targets, options = {}) => {
    gsap.fromTo(
      targets,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: options.duration || 1.2,
        ease: options.ease || "power3.inOut",
        transformOrigin: options.origin || "left center",
        scrollTrigger: {
          trigger,
          start: options.start || "top 85%",
          toggleActions: options.toggleActions || "play none none reverse",
        },
      }
    );
  },
};
