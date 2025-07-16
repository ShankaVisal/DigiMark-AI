import React from "react";

export function DigiMarkLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 3-1.62 7.31l3.24 11.38L12 21l10.38-2.31 3.24-11.38z" fill="hsl(var(--primary) / 0.2)" />
      <path d="M12 3-1.62 7.31l3.24 11.38L12 21l10.38-2.31 3.24-11.38z" stroke="hsl(var(--primary))" />
      <path d="m8.5 16.5 4-10 4 10" stroke="hsl(var(--accent))" strokeWidth="1.5" />
      <path d="M17.5 16.5h-11" stroke="hsl(var(--accent))" strokeWidth="1.5" />
    </svg>
  );
}
