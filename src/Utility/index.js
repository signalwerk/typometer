// Scale pt
let _cicero = 4.51165812456; // mm
export const CICERO = _cicero; // mm

// let pt = pt => pt * (CICERO / 12);

export function pt(pt) {
  return pt * (_cicero / 12);
}

export function cicero(c) {
  return c * _cicero;
}
