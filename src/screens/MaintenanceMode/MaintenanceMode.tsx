import Logo, {
  LOGO_ANIMATIONS,
  LOGO_MODES,
  LOGO_SIZES,
} from '@/components/ui/Logo';
import { LinkButton } from '@/components/ui/Buttons';

const MaintenanceMode = () => {
  const version = process.env.NEXT_PUBLIC_APP_VERSION;

  return (
    <div className="relative grid min-h-dvh w-full place-items-center">
      <section
        aria-labelledby="mm-title"
        aria-describedby="mm-desc"
        className="grid w-full max-w-prose gap-8 px-6"
      >
        <header className="grid gap-2">
          <Logo
            mode={LOGO_MODES.HORIZONTAL}
            size={LOGO_SIZES.SM}
            animation={LOGO_ANIMATIONS.PULSE}
            aria-label="Nightstem"
          />

          <h1 id="mm-title" className="heading-lg">
            We&apos;ll be back soon
          </h1>
        </header>

        <p id="mm-desc" className="text-foreground/70">
          We&apos;re making quiet upgrades. Thanks for your patience.
        </p>

        <div className="flex gap-3">
          <LinkButton href="." isExternal>
            Try again
          </LinkButton>
        </div>

        <div className="flex items-center gap-1.5 border-t border-foreground/10 pt-3 text-caption text-foreground/60">
          <span>Service unavailable (503)</span>
          <span>•</span>
          <span>Please try again shortly.</span>
        </div>
      </section>

      {version && (
        <span className="absolute right-4 bottom-4 font-mono text-caption text-foreground/60">
          v{version}
        </span>
      )}
    </div>
  );
};

MaintenanceMode.displayName = 'MaintenanceMode';
export default MaintenanceMode;
