import { useInViewAnimation } from "../hooks/useInViewAnimation";

const capabilities = [
  {
    index: "01",
    label: "MOTION / COMPOSITING",
    name: ["AFTER", "EFFECTS"],
    skills: "动效包装 / 合成设计 / 字幕节奏",
  },
  {
    index: "02",
    label: "EDIT / NARRATIVE",
    name: ["PREMIERE PRO", "FINAL CUT PRO"],
    skills: "商业剪辑 / 叙事节奏 / 多版本输出",
  },
  {
    index: "03",
    label: "GRADE / FINISHING",
    name: ["DAVINCI", "RESOLVE"],
    skills: "调色 / 声音整理 / 成片交付",
  },
  {
    index: "04",
    label: "AIGC CREATION",
    name: ["熟练使用", "LibTV / Tapnow", "内的主流模型"],
    skills: "图像生成 / 视频生成 / 运镜控制 / 风格一致性",
  },
] as const;

export function ExperienceSection() {
  const { ref, isVisible } = useInViewAnimation<HTMLElement>();

  return (
    <section className="experience-section section-pad" ref={ref} id="about" aria-labelledby="experience-title">
      <div className="experience-grid content-wide">
        <div className={`experience-copy reveal ${isVisible ? "is-visible" : ""}`}>
          <p className="section-kicker">ABOUT / 01</p>
          <h2 id="experience-title" className="section-title">一名剪辑师，<br />擅长把需求整理成清晰、可执行的视觉结果。</h2>
          <div className="experience-description">
            <p>从事 TVC 商业广告剪辑，熟悉从策划到交付的完整流程。</p>
            <p>系统学习并实践 AI 工具，已完成多个 AIGC 视频与视觉项目。</p>
            <p>这是我使用 AI 工具开发的个人作品网站，<br />其中包含个人项目、AIGC 视频作品及相关实践案例。</p>
          </div>
        </div>
        <div className={`experience-stats reveal ${isVisible ? "is-visible" : ""}`} style={{ animationDelay: "180ms" }} aria-label="后期工具能力">
          {capabilities.map((capability) => (
            <article className={`tool-card ${capability.index === "04" ? "tool-card-ai" : ""}`} key={capability.index}>
              <span className="tool-card-index">{capability.index} / 04</span>
              <p className="tool-card-label">{capability.label}</p>
              <h3 className="tool-card-name">
                {capability.name.map((line) => <span key={line}>{line}</span>)}
              </h3>
              <p className="tool-card-skills">{capability.skills}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
