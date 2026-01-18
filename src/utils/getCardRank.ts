export function getCardRank(repetition: number): number {
    // Repetition starts at 0 → value 2
    const baseValue = 2;
    const maxValue = 14; // Ace
    const rank = baseValue + repetition;
  
    return rank > maxValue ? maxValue : rank;
  }