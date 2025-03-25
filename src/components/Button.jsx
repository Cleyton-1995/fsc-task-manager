export default function Button({ children, variant = 'primary', ...rest }) {
  function getVariantClass() {
    if (variant === 'primary') {
      return ' text-white bg-[#00ADB5] ';
    }

    if (variant === 'ghost') {
      return 'bg-transparent text-[#818181]';
    }
  }

  return (
    <button
      className={`flex items-center gap-1 rounded-md px-3 py-1 text-xs font-semibold transition hover:opacity-75 ${getVariantClass()}`}
      {...rest}
    >
      {children}
    </button>
  );
}
