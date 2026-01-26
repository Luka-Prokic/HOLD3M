import { useSettingsStore } from "@/stores/settings/settingsStore";
import { router } from "expo-router";
import { HEIGHT, WIDTH } from "@/utils/Dimensions";
import { Ionicons } from "@expo/vector-icons";
import { useGameStore } from "@/stores/game/gameStore";
import { HapticButton } from "../ui/buttons/HapticButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAnimationStore } from "@/stores/animation/animationStore";

export function CardFooter() {
    const { setHandAnimationPosition } = useAnimationStore();
    const { accentColor } = useSettingsStore();
    const { clearSelection } = useGameStore();
    const insets = useSafeAreaInsets();

    const footerHeight = HEIGHT - (insets.top + (WIDTH - 118) / 5 * 1.4 + (WIDTH - 32) * 1.4 + 64);

    function handlePress() {
        router.back();
        clearSelection();
        setHandAnimationPosition("hand");
    }
    return (

        <HapticButton style={{ width: WIDTH, height: footerHeight, alignItems: "center" }} onPress={handlePress} >
            <Ionicons name="chevron-down" size={96} color={accentColor} />
        </HapticButton>
    );
}