import { DetailedHTMLProps, HTMLAttributes } from 'react';

import cn from '@/utils/classnames';

export type KbdProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
>;

const Kbd = ({ className, ...props }: KbdProps) => (
  <kbd
    {...props}
    className={cn(
      'rounded border border-foreground/20 p-1.5 leading-[50%] shadow-2xl',
      className,
    )}
  />
);

export default Kbd;
