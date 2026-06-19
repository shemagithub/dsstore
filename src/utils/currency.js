export const CURRENCY_CODE = "RFW";

export const formatRFW = (amount) =>
  `${Number(amount).toLocaleString("en-RW")} ${CURRENCY_CODE}`;
