import PropTypes from 'prop-types';
import { tv } from 'tailwind-variants';

export default function Button({
  children,
  color = 'primary',
  size = 'small',
  className,
  ...rest
}) {
  const button = tv({
    base: `flex items-center justify-center gap-1 rounded-md px-3 font-semibold transition hover:opacity-75`,
    variants: {
      color: {
        primary: 'bg-brand-primary text-white',
        ghost: 'bg-transparent text-brand-dark-blue',
        secondary: 'bg-brand-light-gray text-brand-dark-gray',
        danger: 'bg-brand-danger text-white',
      },
      size: {
        small: 'py-1 text-xs',
        large: 'py-2 text-sm',
      },
      disabled: {
        true: 'cursor-not-allowed opacity-50 hover:opacity-50',
      },
    },
    defaultVariants: {
      color: 'primary',
      size: 'small',
    },
  });

  return (
    <button
      className={button({ color, size, className, disabled: rest.disabled })}
      {...rest}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['primary', 'ghost', 'secondary', 'danger']),
  size: PropTypes.oneOf(['small', 'large']),
  className: PropTypes.string,
};
