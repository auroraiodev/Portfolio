"use client";

import { ReactNode, CSSProperties } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

export const Container = ({
  children,
  className = "",
  style,
  size = "lg",
}: ContainerProps) => {
  const maxWidths = {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    full: "100%",
  };

  return (
    <div
      className={`ui-container ${className}`}
      style={{
        maxWidth: maxWidths[size],
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
        width: "100%",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
