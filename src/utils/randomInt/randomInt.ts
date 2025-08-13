export const randomInt = (max: number) => {
  if (max <= 1) return 0;
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return Math.floor((buf[0] / 2 ** 32) * max);
};

export default randomInt;
