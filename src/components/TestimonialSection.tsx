import { Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useInViewAnimation } from "../hooks/useInViewAnimation";

export function TestimonialSection() {
  const { ref, isVisible } = useInViewAnimation<HTMLElement>();
  const portraitRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const element = portraitRef.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let active = false;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!active) return;
      const rect = element.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      setOffset(Math.max(-54, Math.min(54, ((window.innerHeight / 2 - center) / window.innerHeight) * 100)));
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      if (active) schedule();
    }, { threshold: 0 });

    observer.observe(element);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="quote-section section-pad" ref={ref} id="about" aria-labelledby="about-title">
      <div className="quote-grid content-wide">
        <div className="quote-copy">
          <Quote className={`reveal ${isVisible ? "is-visible" : ""}`} style={{ animationDelay: "100ms" }} aria-hidden="true" />
          <h2 id="about-title" className={`quote-title reveal ${isVisible ? "is-visible" : ""}`} style={{ animationDelay: "180ms" }}>
            剪辑不是把画面拼在一起，<br />而是把注意力带到<span className="display-face">最重要的那一刻。</span>
          </h2>
          <p className={`quote-author reveal ${isVisible ? "is-visible" : ""}`} style={{ animationDelay: "260ms" }}>剪辑理念 / portfolio v0</p>
          <div className={`quote-marks reveal ${isVisible ? "is-visible" : ""}`} style={{ animationDelay: "340ms" }} aria-label="服务方向">
            <span>BRAND FILM</span><span>COMMERCIAL</span><span>SOCIAL CUTS</span>
          </div>
        </div>
        <div className={`portrait-wrap reveal ${isVisible ? "is-visible" : ""}`} style={{ animationDelay: "420ms" }} ref={portraitRef}>
          <div className="portrait-placeholder" style={{ transform: `translate3d(0, ${offset}px, 0)` }}>
            <img src="/assets/marquee-07.webp" alt="剪辑师肖像素材待替换" loading="lazy" decoding="async" />
            <span>PORTRAIT / MEDIA PENDING</span>
          </div>
        </div>
      </div>
    </section>
  );
}
