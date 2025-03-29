export default function Button({
  children,
  variant = 'primary',
  size = 'small',
  className,
  ...rest
}) {
  function getVariantClass() {
    if (variant === 'primary') {
      return ' text-white bg-brand-primary ';
    }

    if (variant === 'ghost') {
      return 'bg-transparent text-brand-dark-blue';
    }

    if (variant === 'secondary') {
      return 'bg-brand-light-gray text-brand-dark-gray';
    }
  }

  function getSizeClass() {
    if (size === 'small') {
      return 'py-1 text-xs';
    }

    if (size === 'large') {
      return 'py-2 text-sm';
    }
  }

  return (
    <button
      className={`flex items-center justify-center gap-1 rounded-md px-3 font-semibold transition hover:opacity-75 ${getVariantClass()} ${getSizeClass()} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
