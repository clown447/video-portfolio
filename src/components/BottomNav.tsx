import { ArrowUpRight } from "lucide-react";

export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="快捷导航">
      <a className="bottom-mark display-face" href="#top" aria-label="返回顶部">E</a>
      <a className="bottom-cta" href="#contact">联系合作 <ArrowUpRight aria-hidden="true" /></a>
    </nav>
  );
}
