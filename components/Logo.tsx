// The mark: a form box with three filled lines — the one shape the whole site is built on.
export default function Logo({ size = 34 }: { size?: number }) {
  return (
    <svg viewBox="0 0 34 34" width={size} height={size} aria-hidden="true">
      <rect x="1" y="1" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="7" y="8" width="20" height="3" fill="currentColor" />
      <rect x="7" y="15.5" width="14" height="3" fill="currentColor" />
      <rect x="7" y="23" width="20" height="3" fill="currentColor" />
    </svg>
  );
}
