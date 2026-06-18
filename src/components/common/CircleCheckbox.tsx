interface CircleCheckboxProps {
  checked: boolean;
  onChange: () => void;
}

export function CircleCheckbox({ checked, onChange }: CircleCheckboxProps) {
  return (
    <button
      onClick={onChange}
      className="relative w-5 h-5 flex-shrink-0 cursor-pointer group"
      title={checked ? '标记未完成' : '标记完成'}
    >
      <svg width="20" height="20" viewBox="0 0 20 20">
        {/* Outer circle */}
        <circle
          cx="10"
          cy="10"
          r="9"
          fill="none"
          stroke={checked ? 'var(--accent)' : 'var(--border)'}
          strokeWidth="1.5"
          className="transition-colors duration-200"
        />
        {/* Fill on hover */}
        {!checked && (
          <circle
            cx="10"
            cy="10"
            r="9"
            fill="var(--accent)"
            opacity="0"
            className="group-hover:opacity-10 transition-opacity duration-200"
          />
        )}
        {/* Checkmark */}
        {checked && (
          <>
            <circle
              cx="10"
              cy="10"
              r="9"
              fill="var(--accent)"
            />
            <path
              d="M6 10l3 3 5-5"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )}
      </svg>
    </button>
  );
}
