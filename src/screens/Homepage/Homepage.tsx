import Hero from '@/screens/Homepage/sections/Hero';

const Homepage = () => {
  return (
    <main className="screen-container">
      <h1 className="sr-only">Nightstem</h1>

      <Hero />
    </main>
  );
};

Homepage.displayName = 'Homepage';
export default Homepage;
