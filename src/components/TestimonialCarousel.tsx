import { ChevronLeft, ChevronRight, Film, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useInViewAnimation } from "../hooks/useInViewAnimation";

const notes = [
  { step: "01", title: "先定义一句话", body: "每支片子先确认观众看完应该记住什么，再决定镜头、音乐与信息出现的顺序。", icon: Film },
  { step: "02", title: "先交节奏草案", body: "在调色和细节包装之前，优先对齐结构与情绪，减少后期返工。", icon: Star },
  { step: "03", title: "交付适配版本", body: "横版、竖版、短切与字幕版按发布场景拆分，核心表达保持一致。", icon: Film },
  { step: "04", title: "反馈有清晰节点", body: "每轮反馈聚焦一个目标，素材、文字、声音与画面修改均可追溯。", icon: Star },
  { step: "05", title: "上线前做一次复核", body: "检查字幕、节奏、音量和平台画幅，确保成片在真实场景中有效。", icon: Film },
];

export function TestimonialCarousel() {
  const { ref, isVisible } = useInViewAnimation<HTMLElement>();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const next = () => setCurrent((value) => (value + 1) % notes.length);
  const previous = () => setCurrent((value) => (value - 1 + notes.length) % notes.length);

  useEffect(() => {
    if (isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(next, 3800);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="process-section section-pad" ref={ref} aria-labelledby="process-title">
      <div className="process-header content-wide">
        <div>
          <p className={`section-kicker reveal ${isVisible ? "is-visible" : ""}`}>WORKFLOW / 02</p>
          <h2 id="process-title" className={`section-title reveal ${isVisible ? "is-visible" : ""}`} style={{ animationDelay: "80ms" }}>合作如何<span className="display-face">推进。</span></h2>
        </div>
        <div className={`process-controls reveal ${isVisible ? "is-visible" : ""}`} style={{ animationDelay: "150ms" }}>
          <span className="process-count">{String(current + 1).padStart(2, "0")} / {String(notes.length).padStart(2, "0")}</span>
          <button type="button" onClick={previous} aria-label="上一条工作说明"><ChevronLeft aria-hidden="true" /></button>
          <button type="button" onClick={next} aria-label="下一条工作说明"><ChevronRight aria-hidden="true" /></button>
        </div>
      </div>
      <div className={`carousel-window content-wide reveal ${isVisible ? "is-visible" : ""}`} style={{ animationDelay: "200ms" }} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        <div className="carousel-track" style={{ transform: `translate3d(-${current * 100}%, 0, 0)` }}>
          {notes.map((note) => {
            const Icon = note.icon;
            return <article className="process-card" key={note.step}><Icon className="process-icon" aria-hidden="true" /><p className="process-step">STEP / {note.step}</p><h3>{note.title}</h3><p>{note.body}</p></article>;
          })}
        </div>
      </div>
    </section>
  );
}
