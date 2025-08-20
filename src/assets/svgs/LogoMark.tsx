import cx from 'classnames';

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
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cx('text-primary-500', className)}
      {...ariaProps}
    >
      <rect
        width="219.719"
        height="192.283"
        transform="matrix(0.814781 0.579768 -0.80486 0.593464 154.761 0)"
        fill="currentColor"
      />
      <rect
        width="188.959"
        height="428.961"
        transform="matrix(0.814781 0.579768 -0.80486 0.593464 346.04 135.875)"
        fill="currentColor"
      />
    </svg>
  );
};

LogoMark.displayName = 'LogoMark';
export default LogoMark;
