export const MAXIMUM_FRACTION_DIGITS = 6;

export const PRESSURE_TABLE = {
  atm: {
    value: 1,
    label: "기압 (atm)",
  },
  Pa: {
    value: 101325,
    label: "파스칼 (Pa)",
  },
  hPa: {
    value: 1013.25,
    label: "헥토파스칼 (hPa)",
  },
  kPa: {
    value: 101.325,
    label: "킬로파스칼 (kPa)",
  },
  MPa: {
    value: 0.101325,
    label: "메가파스칼 (MPa)",
  },
  dynecm2: {
    value: 1013250,
    label: "dyne/cm²",
  },
  mb: {
    value: 1013.25,
    label: "밀리바 (mb)",
  },
  bar: {
    value: 1.01325,
    label: "바 (bar)",
  },
  kgfcm2: {
    value: 1.033227,
    label: "kgf/cm²",
  },
  psi: {
    value: 14.696,
    label: "프사이 (psi)",
  },
  mmHg: {
    value: 760,
    label: "수은주밀리미터 (mmHg)",
  },
  inHg: {
    value: 29.92126,
    label: "inchHg",
  },
  mmH2O: {
    value: 10332.275,
    label: "수주밀리미터 (mmH₂O)",
  },
  inchH2O: {
    value: 406.782188,
    label: "inchH₂O",
  },
} as const;
