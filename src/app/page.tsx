export default function Home() {
  return (
    <main className="w-dvw h-dvh grid place-content-center sm:items-center">
      <article className="flex flex-col gap-7">
        <h1 className="flex flex-col text-center">
          <img
            src={'/logo.webp'}
            alt="logo"
            width={32}
            height={32}
            className="self-end mr-6 animate-pulse"
          />
          <span className="heading-lg">Nightstem</span>
        </h1>

        <span className="text-neutral-500">
          This page is under construction
        </span>
      </article>
    </main>
  );
}
