import { useGameStore } from "@/stores/game/useGameStore";
import { AceButton } from "../buttons/AceButton";


export function EndDayButton() {
    const { finalizeHand, startNewHand } = useGameStore();

  function handleEndDay() {
    finalizeHand();
    setTimeout(() => {
      startNewHand();
    }, 100);
  }
    return (
        <AceButton title="End Day" onPress={handleEndDay} />
    );
}