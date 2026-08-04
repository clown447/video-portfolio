import type { AnchorHTMLAttributes, PropsWithChildren } from "react";

type ButtonVariant = "primary" | "secondary" | "tertiary";
type ButtonProps = PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: ButtonVariant }>;

export function Button({ children, className = "", variant = "primary", ...props }: ButtonProps) {
  return <a className={`button button-${variant} ${className}`} {...props}>{children}</a>;
}
