export const MaintenanceMode = () => {
  const version = process.env.NEXT_PUBLIC_APP_VERSION;

  return (
    <main className="relative w-dvw h-dvh bg-black overflow-hidden text-white grid place-content-center sm:items-center">
      <article className="relative flex flex-col gap-5 items-center text-center">
        <header className="flex flex-col text-center">
          <img
            src={'/logo.webp'}
            alt="logo"
            width={32}
            height={32}
            className="self-end animate-pulse"
          />
          <h1 className="heading-lg">Nightstem</h1>
        </header>

        <span className="text-neutral-500 text-sm tracking-wide">
          This page is under construction
        </span>
      </article>

      <span className="absolute bottom-4 right-4 text-xs text-neutral-400 opacity-60 font-mono">
        v{version}
      </span>
    </main>
  );
};

MaintenanceMode.displayName = 'MaintenanceMode';
export default MaintenanceMode;
