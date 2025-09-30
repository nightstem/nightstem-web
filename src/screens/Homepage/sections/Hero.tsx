import { Button } from '@/components/ui/Buttons';

const Hero = () => {
  return (
    <section className="relative grid screen-section items-center overflow-hidden pl-24">
      <div className="flex measure-body flex-col gap-7">
        <header className="flex flex-col gap-8">
          <h2 className="heading-xxl text-primary-500">
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
  );
};

Hero.displayName = 'Hero';
export default Hero;
