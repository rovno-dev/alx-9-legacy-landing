import { IconProps } from "@/utils/interfaces";

export default function LogotypeIcon({ width = 100, height = 90, style, className }: IconProps) {
  return (
    <svg className={className} style={style} width={width} height={height} viewBox="0 0 100 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Branches */}
      <path d="M 50 70 L 10 20 M 50 70 L 30 35 M 50 70 L 50 10 M 50 70 L 70 35 M 50 70 L 90 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

      {/* Nodes */}
      <circle cx="10" cy="20" r="4.5" fill="currentColor" />
      <circle cx="30" cy="35" r="4.5" fill="currentColor" />
      <circle cx="50" cy="10" r="4.5" fill="currentColor" />
      <circle cx="70" cy="35" r="4.5" fill="currentColor" />
      <circle cx="90" cy="20" r="4.5" fill="currentColor" />
    </svg>
  );
}