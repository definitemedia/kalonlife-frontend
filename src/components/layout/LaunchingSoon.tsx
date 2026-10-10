import type { ReactNode } from "react";

type LaunchingSoonProps = {
  status: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function LaunchingSoon({ status, title, description, children }: LaunchingSoonProps) {
  return (
    <div className="container page-shell launch-shell">
      <p className="launch-badge">{status}</p>
      <h1>{title}</h1>
      <p className="page-note launch-note">{description}</p>
      {children}
    </div>
  );
}
