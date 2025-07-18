const GradientDollarIcon = ({
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
      <linearGradient id="dollarGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#60a5fa" /> {/* from-blue-400 */}
        <stop offset="100%" stopColor="#2563eb" /> {/* to-blue-600 */}
      </linearGradient>
    </defs>

    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="url(#dollarGradient)"
      strokeWidth="2"
    />
    <text
      x="12"
      y="16"
      textAnchor="middle"
      fill="url(#dollarGradient)"
      fontSize="14"
      fontWeight="bold"
    >
      $
    </text>
  </svg>
);

export default GradientDollarIcon;
