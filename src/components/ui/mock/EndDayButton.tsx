import { useGameStore } from "@/stores/game/gameStore";
import { AceButton } from "../buttons/AceButton";
import { useSettingsStore } from "@/stores/settings/settingsStore";
import { Ionicons } from "@expo/vector-icons";


export function EndDayButton() {
  const { finalizeHand, startNewHand } = useGameStore();
  const { theme } = useSettingsStore();

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