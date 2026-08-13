import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ButtonProps {
  children: ReactNode; to?: string; href?: string; onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger"; size?: "sm" | "md" | "lg";
  icon?: boolean; className?: string; type?: "button" | "submit"; disabled?: boolean;
}

export default function Button({ children, to, href, onClick, variant = "primary", size = "md", icon = false, className = "", type = "button", disabled = false }: ButtonProps) {
  const base = "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline-offset-4 disabled:opacity-50 disabled:pointer-events-none";
  const sizes = size === "lg" ? "px-7 py-3.5 text-base" : size === "sm" ? "px-4 py-2 text-xs" : "px-5 py-2.5 text-sm";
  const variants: Record<string, string> = {
    primary: "bg-primary-600 text-white shadow-soft hover:bg-primary-700 hover:shadow-soft-lg hover:-translate-y-0.5",
    secondary: "bg-white text-primary-700 border border-primary-200 hover:border-primary-400 hover:bg-primary-50 hover:-translate-y-0.5",
    ghost: "text-white/95 border border-white/40 backdrop-blur-sm hover:bg-white/10 hover:-translate-y-0.5",
    danger: "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100",
  };
  const classes = `${base} ${sizes} ${variants[variant]} ${className}`;
  const content = (<>{children}{icon && <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />}</>);
  if (to) return <Link to={to} className={classes}>{content}</Link>;
  if (href) return <a href={href} className={classes} target="_blank" rel="noopener noreferrer">{content}</a>;
  return <button type={type} onClick={onClick} disabled={disabled} className={classes}>{content}</button>;
}
