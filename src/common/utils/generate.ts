export function randomSixCode(): string {
  return Math.random().toString().slice(2, 8).padStart(6, '0');
}
