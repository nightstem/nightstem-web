import cx from 'classnames';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type KbdProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
>;

const Kbd = ({ className, ...props }: KbdProps) => (
  <kbd
    {...props}
    className={cx(
      'rounded border border-foreground/20 p-1.5 leading-[50%] shadow-2xl',
      className,
    )}
  />
);

export default Kbd;
