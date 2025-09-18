export const hashIndex = (seed: string, max: number) => {
  if (!seed || max <= 1) return 0;

  let h = 5381;
  for (let i = 0; i < seed.length; i += 1) h = (h * 33) ^ seed.charCodeAt(i);
  return Math.abs(h) % max;
};

export default hashIndex;
