import { ArrowUpRight } from "lucide-react";
import { useInViewAnimation } from "../hooks/useInViewAnimation";

const strengths = [
  { number: "01", title: "AI 辅助创作", text: "将 AI 图像、视频与声音工具接入前期探索和镜头设计流程。", tools: "AI IMAGE / VIDEO / AUDIO" },
  { number: "02", title: "常规后期制作", text: "完成剪辑、基础包装、调色与声音整理，保持画面表达统一。", tools: "EDIT / MOTION / GRADE / SOUND" },
  { number: "03", title: "节奏与叙事", text: "从一句核心表达出发，组织镜头顺序、音乐情绪和信息节奏。", tools: "STORY / RHYTHM / MUSIC" },
  { number: "04", title: "多端版本交付", text: "按横版、竖版和社媒短切场景输出，协作过程保持可确认。", tools: "16:9 / 9:16 / SOCIAL" },
];

export function StrengthsSection() {
  const { ref, isVisible } = useInViewAnimation<HTMLElement>();
  return (
    <section className="strengths-section section-pad" ref={ref} id="strengths" aria-labelledby="strengths-title">
      <div className="content-wide">
        <div className={`strengths-heading reveal ${isVisible ? "is-visible" : ""}`}>
          <p className="section-kicker">个人优势</p>
          <h2 id="strengths-title" className="section-title">CAPABILITIES</h2>
          <p>AI 工作流与常规后期能力并行，根据项目目标选择更合适的制作方式。</p>
        </div>
        <div className="strength-grid">
          {strengths.map((strength, index) => (
            <article className={`strength-card ${strength.number === "01" ? "strength-card-featured" : ""} reveal ${isVisible ? "is-visible" : ""}`} style={{ animationDelay: `${100 + index * 80}ms` }} key={strength.number}>
              <span>{strength.number}</span>
              <h3>{strength.title}</h3>
              <p>{strength.text}</p>
              <small>{strength.tools}</small>
              <ArrowUpRight aria-hidden="true" />
            </article>
          ))}
          <a
            className={`strengths-portfolio-link reveal ${isVisible ? "is-visible" : ""}`}
            href="https://www.xinpianchang.com/u10875325"
            target="_blank"
            rel="noreferrer"
          >
            个人新片场链接
          </a>
        </div>
      </div>
    </section>
  );
}
