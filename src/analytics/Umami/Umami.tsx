import Script from 'next/script';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const Umami = () => {
  if (IS_PRODUCTION) return null;

  return (
    <Script
      defer
      src="https://cloud.umami.is/script.js"
      data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
    />
  );
};

Umami.displayName = 'Umami';
export default Umami;
