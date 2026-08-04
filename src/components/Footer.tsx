import { ArrowUpRight } from "lucide-react";
import { Button } from "./Button";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main content-projects">
        <Button href="#contact">开始沟通 <ArrowUpRight aria-hidden="true" /></Button>
        <div className="footer-links">
          <div><a href="#services">服务</a><a href="#work">项目</a><a href="#about">关于</a></div>
          <div><a href="#contact">联系方式待接入</a><a href="#contact">社交链接待接入</a></div>
        </div>
      </div>
      <div className="copyright content-projects"><span>COMMERCIAL EDITING PORTFOLIO</span><span>2026 / PORTFOLIO V0</span></div>
    </footer>
  );
}
