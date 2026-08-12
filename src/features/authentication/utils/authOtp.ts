export function generateOtp(length = 6) {
  return Array.from({ length }, () => String(Math.floor(Math.random() * 10))).join("");
}
