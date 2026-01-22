import { useGameStore } from "@/stores/game/useGameStore";
import { AceButton } from "../buttons/AceButton";
import { useThemeStore } from "@/stores/themeStore";
import { Ionicons } from "@expo/vector-icons";


export function EndDayButton() {
  const { finalizeHand, startNewHand } = useGameStore();
  const { theme } = useThemeStore();

  function handleEndDay() {
    finalizeHand();
    setTimeout(() => {
      startNewHand();
    }, 100);
  }
  return (
    <AceButton title="Day Reset" onPress={handleEndDay} style={{ marginTop: 8 }} circle>
      <Ionicons name="globe-outline" size={32} color={theme.lightSurface} />
    </AceButton>
  );
}