import { AceButton } from "@/components/ui/buttons/AceButton";
import { useAnimationStore } from "@/stores/animation/animationStore";
import { useSettingsStore } from "@/stores/settings/settingsStore";
import { WIDTH } from "@/utils/Dimensions";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAvoidingView, Platform } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useGameStore } from "@/stores/game/gameStore";

export function KeyboardButtons() {
    const { theme, themeName, isAnimationsEnabled } = useSettingsStore();
    const { currentCardIndex, currentHand, addCard } = useGameStore();
    const { setHandAnimationPosition } = useAnimationStore();
    const themeType = themeName === "light" ? "accent" : "tint";

    function handleAddHabit() {
        const card = currentHand[currentCardIndex];
        addCard(card);
        setHandAnimationPosition("card");
    }

    function handleCollapseKeyboard() {
        setHandAnimationPosition("card");
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,

                width: WIDTH,
                zIndex: 1,
            }}
        >
            <Animated.View
                entering={isAnimationsEnabled ? FadeIn.duration(300).delay(200) : FadeIn.duration(10).delay(200)}
                style={{
                    paddingBottom: 16,
                    flexDirection: "row",
                    gap: 16,
                    paddingHorizontal: 16,
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <AceButton
                    title="Add Habit"
                    onPress={handleAddHabit}
                    themeType={themeType}
                    buttonStyle={{ flexGrow: 1 }}
                />

                <AceButton circle onPress={handleCollapseKeyboard}>
                    <Ionicons name="chevron-down" size={24} color={theme.lightSurface} />
                </AceButton>
            </Animated.View>
        </KeyboardAvoidingView>
    );
}