// Scale pt
let cicero = 4.51165812456; // mm
export const CICERO = cicero; // mm

// let pt = pt => pt * (CICERO / 12);

export function pt(pt) {
  return pt * (cicero / 12);
}
