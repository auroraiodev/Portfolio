"use client";

import { ReactNode, CSSProperties } from "react";
import "./Card.css";

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const Card = ({ children, className = "", style }: CardProps) => {
  return (
    <div className={`ui-card ${className}`} style={style}>
      {children}
    </div>
  );
};
