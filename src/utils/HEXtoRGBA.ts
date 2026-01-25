export function hexToRGBA(hex: string, alpha: number) {
  let r = 0,
    g = 0,
    b = 0;

  // Expand shorthand hex codes like #FFF to #FFFFFF
  if (hex.length === 4) {
    hex = "#" + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }

  // Convert hex to RGB
  if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function tintColorLight(hex: string, amount = 0.8) {
  // amount: 0 = original, 1 = white
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  const newR = Math.round(r + (255 - r) * amount);
  const newG = Math.round(g + (255 - g) * amount);
  const newB = Math.round(b + (255 - b) * amount);

  return (
    "#" +
    newR.toString(16).padStart(2, "0") +
    newG.toString(16).padStart(2, "0") +
    newB.toString(16).padStart(2, "0")
  );
}

export function isLightColor(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return (r * 299 + g * 587 + b * 114) / 1000 > 180;
}

export function tintColorDark(hex: string, amount = 0.8) {
  // amount: 0 = original, 1 = black
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  const newR = Math.round(r * (1 - amount));
  const newG = Math.round(g * (1 - amount));
  const newB = Math.round(b * (1 - amount));

  return (
    "#" +
    newR.toString(16).padStart(2, "0") +
    newG.toString(16).padStart(2, "0") +
    newB.toString(16).padStart(2, "0")
  );
}

export function tintColorInvert(hex: string, amount = 0.8) {
  if (isLightColor(hex)) {
    return tintColorDark(hex, amount);
  }

  return tintColorLight(hex, amount);
}

export function mixColors(
  colorA: string,
  colorB: string,
  ratio = 0.5 // 0 = all A, 1 = all B
) {
  const rA = parseInt(colorA.slice(1, 3), 16);
  const gA = parseInt(colorA.slice(3, 5), 16);
  const bA = parseInt(colorA.slice(5, 7), 16);

  const rB = parseInt(colorB.slice(1, 3), 16);
  const gB = parseInt(colorB.slice(3, 5), 16);
  const bB = parseInt(colorB.slice(5, 7), 16);

  const mix = (a: number, b: number) =>
    Math.round(a * (1 - ratio) + b * ratio);

  return (
    "#" +
    mix(rA, rB).toString(16).padStart(2, "0") +
    mix(gA, gB).toString(16).padStart(2, "0") +
    mix(bA, bB).toString(16).padStart(2, "0")
  );
}