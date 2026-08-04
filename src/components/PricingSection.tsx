import { ArrowUpRight } from "lucide-react";
import { Button } from "./Button";
import { useInViewAnimation } from "../hooks/useInViewAnimation";

const cards = [
  { mode: "dark", eyebrow: "ONGOING / 01", title: "长期合作", description: "为持续内容需求建立统一的节奏、版本与交付流程。", details: "适合：品牌内容、栏目、社媒系列" },
  { mode: "light", eyebrow: "PROJECT / 02", title: "单次项目", description: "围绕一个明确目标，完成剪辑、字幕、声音与不同平台版本。", details: "范围与档期 / 待沟通确认" },
];

export function PricingSection() {
  const { ref, isVisible } = useInViewAnimation<HTMLElement>();
  return (
    <section className="service-section section-pad" ref={ref} id="services" aria-labelledby="services-title">
      <div className="content-wide service-heading">
        <p className={`section-kicker reveal ${isVisible ? "is-visible" : ""}`}>SERVICES / 01</p>
        <h2 id="services-title" className={`section-title reveal ${isVisible ? "is-visible" : ""}`} style={{ animationDelay: "80ms" }}>为每个项目，找到<br /><span className="display-face">刚刚好的速度。</span></h2>
      </div>
      <div className="service-grid content-wide">
        {cards.map((card, index) => (
          <article className={`service-card ${card.mode} reveal ${isVisible ? "is-visible" : ""}`} style={{ animationDelay: `${120 + index * 100}ms` }} key={card.title}>
            <p className="service-kicker">{card.eyebrow}</p>
            <h3>{card.title}</h3>
            <p className="service-description">{card.description}</p>
            <p className="service-detail">{card.details}</p>
            <div className="service-actions">
              <Button href="#contact" variant={card.mode === "dark" ? "secondary" : "tertiary"}>发起沟通 <ArrowUpRight aria-hidden="true" /></Button>
              <a href="#work" className="text-link">查看项目 <ArrowUpRight aria-hidden="true" /></a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
