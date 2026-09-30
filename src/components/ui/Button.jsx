import { memo } from 'react';
import Spinner from './Spinner.jsx';

/** Maps semantic variants onto the class names defined in the stylesheets. */
const VARIANT_CLASS = {
  default: '',
  primary: 'b',
  outline: 'ghost',
  header: 'gh',
  inverse: 'pri light',
  quiet: 'sm',
  danger: 'del',
  add: 'pri',
};

/**
 * Generic button used across the site and the admin portal.
 * Callers add layout classes (e.g. "btn") via className; `variant` only picks
 * the colour treatment so button styling lives in one place.
 */
function Button({
  variant = 'default',
  icon: Icon,
  iconSize = 16,
  loading = false,
  disabled = false,
  className = '',
  children,
  type = 'button',
  ...rest
}) {
  const variantClass = VARIANT_CLASS[variant] ?? '';
  return (
    <button
      type={type}
      className={`${variantClass} ${className}`.trim()}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? <Spinner size={iconSize} /> : Icon ? <Icon size={iconSize} aria-hidden="true" /> : null}
      {children}
    </button>
  );
}

export default memo(Button);
