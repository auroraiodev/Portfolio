"use client";

import { ReactNode, ButtonHTMLAttributes, CSSProperties } from "react";
import "./Button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = ({ 
  children, 
  variant = "primary", 
  size = "md",
  className = "", 
  style,
  ...props 
}: ButtonProps) => {
  return (
    <button 
      className={`ui-button ui-button-${variant} ui-button-${size} ${className}`}
      style={style}
      {...props}
    >
      <span className="ui-button-content">{children}</span>
      <div className="ui-button-ripple"></div>
    </button>
  );
};
