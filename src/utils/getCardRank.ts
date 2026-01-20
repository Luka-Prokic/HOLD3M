export function getCardRank(repetition: number): number {
  if (repetition === -1) return -1; // signal Jester
  const baseValue = 2;
  const maxValue = 14; // Ace
  const rank = baseValue + repetition;

  return rank > maxValue ? maxValue : rank;
}

export function getCardRankLetter(value: number): string {
  if (value === -1) return "X"; // Jester
  if (value >= 2 && value <= 10) return String(value);

  switch (value) {
    case 11: return "J";
    case 12: return "Q";
    case 13: return "K";
    case 14: return "A";
    default: return "?";
  }
}

export function getCardRankLetterFromRep(repetition: number): string {
  return getCardRankLetter(getCardRank(repetition));
}