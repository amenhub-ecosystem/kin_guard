export function generateOtp(length = 6) {
  return Array(length).fill("0").join("");
}
