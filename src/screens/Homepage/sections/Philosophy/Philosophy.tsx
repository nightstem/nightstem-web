import cn from '@/utils/classnames';

const Philosophy = () => {
  return (
    <div className="grid screen-section items-center justify-end overflow-hidden px-2 lg:pr-24">
      <section className="relative screen-container">
        <div
          className={cn(
            'absolute top-1/2 left-1/2 -z-10 -translate-1/2',
            'aspect-square max-square-size rounded-full',
            'bg-radial from-secondary-500/15 from-0% to-secondary-500/0 to-100% blur-2xl',
          )}
        />

        <div className="flex measure-body flex-col gap-7">
          <h2 className="heading-lg md:text-right md:heading-xl">
            Built After Hours
          </h2>

          <p className="w-full max-w-[48ch] md:text-right">
            Nightstem is a studio for focused software. We value clarity and
            intent over noise and distraction. Built after hours, our projects
            are shaped with care and designed to last.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Philosophy;
