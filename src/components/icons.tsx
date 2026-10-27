import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function SendIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M21 3L10 14M21 3l-7 18-4-7-7-4z" />
    </svg>
  );
}

export function InstagramIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function MenuIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M4 8h16M4 16h16" />
    </svg>
  );
}

export function CloseIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function ChevronIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function PlusIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function CheckIcon(props: P) {
  return (
    <svg {...base} strokeWidth={2.25} {...props}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export function DashIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M7 12h10" />
    </svg>
  );
}

export function ArrowIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function PlayIcon(props: P) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M8 5.5v13l10.5-6.5z" />
    </svg>
  );
}

/** Process-step icons. */
export const stepIcons: Record<string, (p: P) => React.ReactElement> = {
  idea: (p) => (
    <svg {...base} {...p}>
      <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1.1 2V16h5v-.2c.1-.8.5-1.5 1.1-2A6 6 0 0 0 12 3z" />
    </svg>
  ),
  script: (p) => (
    <svg {...base} {...p}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </svg>
  ),
  voice: (p) => (
    <svg {...base} {...p}>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </svg>
  ),
  visuals: (p) => (
    <svg {...base} {...p}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="12" cy="10" r="3" />
      <path d="M6.5 19.5a6 6 0 0 1 11 0" />
    </svg>
  ),
  edit: (p) => (
    <svg {...base} {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 15h18M8 15v4M14 15v4M7 9h5" />
    </svg>
  ),
  publish: (p) => (
    <svg {...base} {...p}>
      <path d="M21 3L10 14M21 3l-7 18-4-7-7-4z" />
    </svg>
  ),
};
