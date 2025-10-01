export const calcPriceCR = ({ duration=30, extras=[] } = {}) => {
  const base = 12;
  const byDuration = Math.ceil(duration/15)*3;
  const byExtras = (extras.length)*2;
  return base + byDuration + byExtras;
};