import cn from '@/utils/classnames';

type LogoMarkProps = {
  className?: string;
  title?: string;
  decorative?: boolean;
};

export const LogoMark = ({
  className,
  title = 'Nightstem',
  decorative,
}: LogoMarkProps) => {
  const ariaProps = decorative
    ? { 'aria-hidden': true }
    : { role: 'img' as const, 'aria-label': title };

  return (
    <svg
      fill="none"
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-primary-500', className)}
      {...ariaProps}
    >
      <path
        d="M346.04 135.875L500 245.427L161.185 495.252C157.629 497.874 151.828 497.923 148.228 495.362L0.786259 390.448L346.04 135.875Z"
        fill="currentColor"
      />
      <path
        d="M148.322 4.74771C151.878 2.12562 157.68 2.07657 161.279 4.63814L333.785 127.386L179.023 241.499L9.54552e-05 114.113L148.322 4.74771Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default LogoMark;
