export function removeAccents(s: string) {
  return s
    .replace(/à/g, "a")
    .replace(/[èé]/g, "e")
    .replace(/í/g, "i")
    .replace(/[òó]/g, "o")
    .replace(/ú/g, "u");
}

export function getRandomChar() {
  const chars = "abcçdefghijklmnopqrstuvwxyz";
  return chars.charAt(Math.floor(Math.random() * chars.length));
}

export function getRandomValueOfArray<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}
