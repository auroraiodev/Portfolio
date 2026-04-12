"use client";

import { ReactNode, ButtonHTMLAttributes, CSSProperties } from "react";
import "./Button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
}

export const Button = ({ 
  children, 
  variant = "primary", 
  className = "", 
  style,
  ...props 
}: ButtonProps) => {
  return (
    <button 
      className={`ui-button ui-button-${variant} ${className}`}
      style={style}
      {...props}
    >
      <span className="ui-button-content">{children}</span>
      <div className="ui-button-ripple"></div>
    </button>
  );
};
