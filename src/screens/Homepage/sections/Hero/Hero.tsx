import { Button } from '@/components/ui/Buttons';
import { cn } from '@/lib/utils';

const Hero = () => {
  return (
    <section className="relative grid screen-section items-center overflow-hidden px-2 lg:pl-24">
      <div
        className={cn(
          'absolute -top-3/12 -left-1/2 -z-10 md:top-0 md:-left-1/5',
          'aspect-square max-square-size rounded-full',
          'bg-radial from-primary-500/15 from-0% to-primary-500/0 to-100% blur-2xl',
        )}
      />

      <div className="screen-container">
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
      </div>
    </section>
  );
};

export default Hero;
