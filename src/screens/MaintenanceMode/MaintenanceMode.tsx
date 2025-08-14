import {
  Logo,
  LOGO_MODES,
  LOGO_SIZES,
  LOGO_ANIMATIONS,
} from '@/components/ui/Logo';

export const MaintenanceMode = () => {
  const version = process.env.NEXT_PUBLIC_APP_VERSION;

  return (
    <div className="relative w-full h-full grid place-content-center sm:items-center">
      <article className="relative flex flex-col gap-5 items-center text-center">
        <header className="flex flex-col text-center">
          <Logo
            mode={LOGO_MODES.FULL}
            size={LOGO_SIZES.LG}
            animation={LOGO_ANIMATIONS.PULSE}
          />
          <h1 className="sr-only">Nightstem</h1>
        </header>

        <p className="text-neutral-400">This page is under construction</p>
      </article>

      <span className="absolute bottom-4 right-4 text-caption text-neutral-400 font-mono">
        v{version}
      </span>
    </div>
  );
};

MaintenanceMode.displayName = 'MaintenanceMode';
export default MaintenanceMode;
