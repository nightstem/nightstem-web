import cx from 'classnames';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type KbdProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
>;

export const Kbd = ({ className, ...props }: KbdProps) => (
  <kbd
    {...props}
    className={cx(
      'rounded shadow-2xl border border-foreground/20 p-1.5',
      className,
    )}
  />
);

export default Kbd;
