import "./StatusBadge.css";

// The tone decides the colour. Screens pick the tone that matches the status.
export type BadgeTone = "neutral" | "success" | "warning" | "danger";

type StatusBadgeProps = {
  label: string;
  tone?: BadgeTone;
};

export function StatusBadge({ label, tone = "neutral" }: StatusBadgeProps) {
  return <span className={`status-badge status-badge-${tone}`}>{label}</span>;
}