import { Mail, Phone } from "lucide-react";
import { useInViewAnimation } from "../hooks/useInViewAnimation";

export function PartnerSection() {
  const { ref, isVisible } = useInViewAnimation<HTMLElement>();

  return (
    <section className="partner-section" ref={ref} id="contact" aria-labelledby="contact-title">
      <div className={`partner-card layout-wide reveal ${isVisible ? "is-visible" : ""}`}>
        <header className="contact-heading">
          <h2 id="contact-title" className="contact-display">CONTACT</h2>
          <p className="contact-eyebrow">联系方式</p>
        </header>

        <div className="contact-content">
          <p className="contact-statement">
            期待与品牌、产品和<br className="contact-break-medium" />市场团队一起，把<br className="contact-break-wide" />视觉<br className="contact-break-medium" />做得更有辨识度。
          </p>

          <div className="contact-actions" aria-label="联系入口">
            <a className="contact-email" href="mailto:black406@126.com">
              <Mail aria-hidden="true" />
              <span>发送邮件</span>
            </a>
            <a className="contact-phone" href="tel:191xxxx8943">
              <Phone aria-hidden="true" />
              <span>191 XXXX 8943</span>
            </a>
          </div>
        </div>

        <footer className="contact-footer" aria-label="个人信息">
          <span>陈文杰 / Visual Designer</span>
          <span>Visual Communication / Brand / Campaign</span>
        </footer>
      </div>
    </section>
  );
}
