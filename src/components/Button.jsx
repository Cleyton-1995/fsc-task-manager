import { tv } from 'tailwind-variants';

export default function Button({
  children,
  color = 'primary',
  size = 'small',
  className,
  ...rest
}) {
  const button = tv({
    base: 'flex items-center justify-center gap-1 rounded-md px-3 font-semibold transition hover:opacity-75',
    variants: {
      color: {
        primary: 'bg-brand-primary text-white',
        ghost: 'bg-transparent text-brand-dark-blue',
        secondary: 'bg-brand-light-gray text-brand-dark-gray',
      },
      size: {
        small: 'py-1 text-xs',
        large: 'py-2 text-sm',
      },
    },
    defaultVariants: {
      color: 'primary',
      size: 'small',
    },
  });

  return (
    <button className={button({ color, size, className })} {...rest}>
      {children}
    </button>
  );
}
