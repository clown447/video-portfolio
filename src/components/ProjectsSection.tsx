import { ArrowUpRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useInViewAnimation } from "../hooks/useInViewAnimation";

const projects = [
  {
    number: "01",
    category: "mix",
    label: "MIXED EDIT / 混剪",
    title: "混剪 Reel",
    description: "节奏、声音与画面情绪的混剪作品展示位。",
    detail: "本地预览可按需播放",
    image: "/assets/mixed-reel.webp",
    previewVideo: "/assets/mixed-reel.mp4",
  },
  {
    number: "02",
    category: "commercial",
    label: "COMMERCIAL / BRAND FILM",
    title: "长城坦克 × 非遗傩戏",
    description: "长城坦克品牌片，将非遗傩戏的仪式感与车型力量感并置呈现。",
    detail: "1 分 13 秒 / 1280 × 720",
    image: "/assets/commercial-tank.webp",
    previewVideo: "/assets/commercial-tank.mp4",
  },
  {
    number: "03",
    category: "commercial",
    label: "COMMERCIAL / CORPORATE",
    title: "外贸宣传片",
    description: "外贸企业宣传片，以业务场景与团队工作状态建立品牌信任。",
    detail: "2 分 32 秒 / 1280 × 720",
    image: "/assets/commercial-trade.webp",
    previewVideo: "/assets/commercial-trade.mp4",
  },
  {
    number: "04",
    category: "commercial",
    label: "COMMERCIAL / AUTOMOTIVE",
    title: "奥迪 Q7",
    description: "奥迪 Q7 品牌视觉短片，以城市夜景强化人物与驾驶情绪。",
    detail: "1 分 12 秒 / 1280 × 720",
    image: "/assets/commercial-audi-q7.webp",
    previewVideo: "/assets/commercial-audi-q7.mp4",
  },
  {
    number: "05",
    category: "commercial",
    label: "COMMERCIAL / PRODUCT",
    title: "华为 Pura80",
    description: "华为 Pura80 产品宣传片，以城市空间与产品语境串联品牌表达。",
    detail: "1 分 25 秒 / 1280 × 720",
    image: "/assets/commercial-huawei-pura80.webp",
    previewVideo: "/assets/commercial-huawei-pura80.mp4",
  },
  {
    number: "06",
    category: "aigc",
    label: "AIGC / CHARACTER",
    title: "KDA 2",
    description: "AIGC 角色视觉短片，围绕高饱和角色形象构建动态开场。",
    detail: "15 秒 / 1280 × 720",
    image: "/assets/aigc-kda.webp",
    previewVideo: "/assets/aigc-kda.mp4",
  },
  {
    number: "07",
    category: "aigc",
    label: "AIGC / SPORTS",
    title: "网球",
    description: "AIGC 运动视觉短片，利用低机位与高速瞬间强化力量感。",
    detail: "38 秒 / 1280 × 720 / 无声版本",
    image: "/assets/aigc-tennis.webp",
    previewVideo: "/assets/aigc-tennis.mp4",
  },
  {
    number: "08",
    category: "aigc",
    label: "AIGC / GAME AD",
    title: "游戏买量广告",
    description: "AIGC 游戏买量广告，以角色、UI 与转化节点组织信息节奏。",
    detail: "15 秒 / 1280 × 720",
    image: "/assets/aigc-game-ad.webp",
    previewVideo: "/assets/aigc-game-ad.mp4",
  },
  {
    number: "09",
    category: "aigc",
    label: "AIGC / VISUAL",
    title: "蝴蝶",
    description: "AIGC 时尚视觉短片，以花卉与人物特写构成梦境感镜头。",
    detail: "29 秒 / 1280 × 720",
    image: "/assets/aigc-butterfly.webp",
    previewVideo: "/assets/aigc-butterfly.mp4",
  },
] as const;

const filters = [
  { value: "all", label: "全部" },
  { value: "mix", label: "混剪" },
  { value: "aigc", label: "AIGC" },
  { value: "commercial", label: "商业项目" },
] as const;

type Filter = (typeof filters)[number]["value"];

function ProjectItem({ project, index, categoryStart }: { project: (typeof projects)[number]; index: number; categoryStart: boolean }) {
  const { ref, isVisible } = useInViewAnimation<HTMLElement>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [previewRequested, setPreviewRequested] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const canPreview = Boolean(project.previewVideo);

  useEffect(() => {
    if (!previewRequested || !videoRef.current) return;
    videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  }, [previewRequested]);

  const togglePreview = () => {
    if (!canPreview) return;
    if (!previewRequested) {
      setPreviewRequested(true);
      return;
    }

    if (videoRef.current?.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  };

  return (
    <article className={`project-item ${index % 2 === 1 ? "project-item-reverse" : ""} ${categoryStart ? "project-item-category-start" : ""}`} ref={ref}>
      <div className={`project-media reveal ${isVisible ? "is-visible" : ""}`} style={{ animationDelay: "120ms" }}>
        <img
          className={previewRequested && isPlaying ? "is-covered" : ""}
          src={project.image}
          alt={`${project.title}作品封面`}
          loading="lazy"
          decoding="async"
        />
        {previewRequested && (
          <video
            ref={videoRef}
            className="project-preview-video"
            autoPlay
            controls
            loop
            muted
            playsInline
            preload="metadata"
            poster={project.image}
            src={project.previewVideo}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        )}
        <button
          className="project-preview-toggle"
          type="button"
          onClick={togglePreview}
          disabled={!canPreview}
          aria-label={canPreview ? `${isPlaying ? "暂停" : "播放"}${project.title}预览` : `${project.title}预览待接入`}
        >
          {isPlaying ? <Pause fill="currentColor" aria-hidden="true" /> : <Play fill="currentColor" aria-hidden="true" />}
        </button>
        <ArrowUpRight className="project-arrow" aria-hidden="true" />
      </div>
      <div className={`project-copy reveal ${isVisible ? "is-visible" : ""}`}>
        <span>{project.label} / {project.number}</span>
        <h3 className="display-face">{project.title}</h3>
        <p>{project.description}</p>
        <p className="project-detail">{project.detail}</p>
        <a href="#contact" className="project-link">咨询同类项目 <ArrowUpRight aria-hidden="true" /></a>
      </div>
    </article>
  );
}

export function ProjectsSection() {
  const { ref, isVisible } = useInViewAnimation<HTMLElement>();
  const [filter, setFilter] = useState<Filter>("all");
  const visibleProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter);

  return (
    <section className="projects-section section-pad" ref={ref} id="work" aria-labelledby="work-title">
      <div className="content-projects">
        <div className={`projects-heading reveal ${isVisible ? "is-visible" : ""}`}>
          <p className="section-kicker">SELECTED WORK / 09</p>
          <h2 id="work-title" className="section-title">精 选 项 目</h2>
          <p>按作品类型分别展示混剪、AIGC 和常规商业项目。<br className="projects-description-break" />AIGC 作品采用本地封面与点击后加载的正片，兼顾展示体验与页面加载速度。</p>
        </div>
        <div className={`project-filters reveal ${isVisible ? "is-visible" : ""}`} style={{ animationDelay: "100ms" }} role="tablist" aria-label="作品类型">
          {filters.map((item) => (
            <button
              type="button"
              role="tab"
              aria-selected={filter === item.value}
              className={filter === item.value ? "is-active" : ""}
              onClick={() => setFilter(item.value)}
              key={item.value}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="projects-stack">
          {visibleProjects.map((project, index) => {
            const categoryStart = filter === "all" && index > 0 && project.category !== visibleProjects[index - 1].category;
            return <ProjectItem project={project} index={index} categoryStart={categoryStart} key={project.number} />;
          })}
        </div>
      </div>
    </section>
  );
}
