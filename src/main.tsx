import { domAnimation, LazyMotion, m, MotionConfig } from "motion/react";
import { ArrowDown, Mail } from "lucide-react";
import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { ExperienceSection } from "./components/ExperienceSection";
import { PartnerSection } from "./components/PartnerSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { StrengthsSection } from "./components/StrengthsSection";
import "./index.css";

const heroVideo = "/assets/hero-video.mp4";
const heroVideoFallback = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4";
const easeOut = [0.16, 1, 0.3, 1] as const;

function useFloatingNavigation() {
  const [isFloating, setIsFloating] = useState(false);

  useEffect(() => {
    let animationFrame = 0;

    const syncNavigation = () => {
      animationFrame = 0;
      setIsFloating((current) => {
        const next = window.scrollY > 24;
        return current === next ? current : next;
      });
    };

    const onScroll = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(syncNavigation);
    };

    syncNavigation();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return isFloating;
}

function PortfolioNavigation() {
  const isFloatingNavigation = useFloatingNavigation();

  return (
    <m.nav
      className={`portfolio-hero-nav layout-wide ${isFloatingNavigation ? "is-floating" : ""}`}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: easeOut }}
      aria-label="作品集导航"
    >
      <a className="portfolio-brand" href="#top" aria-label="作品集首页">
        <span className="portfolio-brand-mark" aria-hidden="true">J</span>
        <span>陈文杰</span>
      </a>
      <div className="portfolio-nav-links">
        <a href="#about">经历</a>
        <a href="#work">项目</a>
        <a href="#strengths">优势</a>
        <a href="#contact">联系</a>
      </div>
      <a className="portfolio-contact-link" href="#contact">
        <Mail aria-hidden="true" />
        <span>联系我</span>
      </a>
    </m.nav>
  );
}

function PortfolioHero() {
  return (
    <section className="portfolio-hero" id="top" aria-labelledby="portfolio-hero-title">

      <m.div
        className="portfolio-video-frame"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: easeOut }}
        aria-hidden="true"
      >
        <video autoPlay muted loop playsInline preload="metadata" poster="/assets/hero-poster.webp">
          <source src={heroVideo} type="video/mp4" />
          <source src={heroVideoFallback} type="video/mp4" />
        </video>
      </m.div>

      <m.div
        className="portfolio-hero-content layout-wide"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
        }}
      >
        <m.div className="portfolio-hero-meta" variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } } }}>
          <span>[PORTFOLIO]</span>
          <span>[COMMERCIAL EDITOR]</span>
          <span>[2026]</span>
        </m.div>

        <m.h1 id="portfolio-hero-title" className="portfolio-hero-title" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOut } } }}>
          ChenWenJie
        </m.h1>

        <m.div className="portfolio-hero-bottom" variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } } }}>
          <div className="portfolio-hero-services">
            <p>AIGC / TVC</p>
            <span>Commercial edits and visual stories<br />for brand communication.</span>
            <div className="portfolio-hero-actions">
              <a className="portfolio-primary-action" href="#work">开始查看 <span aria-hidden="true">&#8599;</span></a>
              <a className="portfolio-email-action" href="mailto:black406@126.com">black406@126.com</a>
            </div>
          </div>

          <div className="portfolio-hero-manifesto">
            <p><span>EDITING</span> IS NOT<br />DECORATION</p>
            <a href="#about" aria-label="查看个人经历"><ArrowDown aria-hidden="true" /></a>
          </div>
        </m.div>
      </m.div>
    </section>
  );
}

function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <div className="site-shell">
          <main>
            <PortfolioNavigation />
            <PortfolioHero />
            <ExperienceSection />
            <ProjectsSection />
            <StrengthsSection />
            <PartnerSection />
          </main>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}

createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
