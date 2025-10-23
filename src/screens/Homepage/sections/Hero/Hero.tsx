import { Button } from '@/components/ui/Buttons';
import cn from '@/utils/classnames';

const Hero = () => {
  return (
    <div className="grid screen-section items-center justify-start overflow-hidden px-2 lg:pl-24">
      <section className="relative screen-container max-w-fit">
        <div
          className={cn(
            'absolute top-1/2 left-1/2 -z-10 -translate-1/2',
            'aspect-square max-square-size rounded-full',
            'bg-radial from-primary-500/15 from-0% to-primary-500/0 to-100% blur-2xl',
          )}
        />

        <div className="flex measure-body flex-col gap-7">
          <header className="flex flex-col gap-8">
            <h2 className="heading-xl text-primary-500 md:heading-xxl">
              Quiet software grows at night.
            </h2>

            <p>A studio for focused software, built after hours.</p>
          </header>

          <div className="flex gap-4">
            <Button>Learn more</Button>
            <Button variant="outlined" color="secondary">
              View work
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
