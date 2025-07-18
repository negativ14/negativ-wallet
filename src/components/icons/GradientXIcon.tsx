const GradientXIcon = ({
  className = "",
  width = 28,
  height = 28,
}: {
  className?: string;
  width?: number | string;
  height?: number | string;
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="xGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#60a5fa" /> {/* from-blue-400 */}
        <stop offset="100%" stopColor="#2563eb" /> {/* to-blue-600 */}
      </linearGradient>
    </defs>

    <path
      d="M16.88 3H20.5L13.75 10.18L21.75 21H15.44L10.64 14.92L5 21H1.38L8.53 13.38L1 3H7.44L11.75 8.6L16.88 3Z"
      stroke="url(#xGradient)"
      strokeWidth="1.5"
      fill="url(#xGradient)"
    />
  </svg>
);

export default GradientXIcon;
