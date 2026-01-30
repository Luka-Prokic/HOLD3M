import { IText } from "../ui/texts/IText";
import { useSettingsStore } from "@/stores/settings/settingsStore";
import { useBalletFont } from "@/utils/fonts/useBalletFont";
import { router } from "expo-router";
import { AceButton } from "../ui/buttons/AceButton";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";


interface RoundPreviewHeaderProps {
    title: string;
}

export function RoundPreviewHeader({ title }: RoundPreviewHeaderProps) {
    const { theme } = useSettingsStore();
    const { fontFamily } = useBalletFont();
    const { isAnimationsEnabled } = useSettingsStore();

    function handlePress() {
        router.back();
    }
    return (
        <Animated.View
            entering={isAnimationsEnabled ? FadeIn.duration(400).delay(400) : undefined}
            style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: 16,
                paddingRight: 24,
                paddingTop: 16,
            }}>
            <IText
                text={title}
                size={48}
                color={theme.lightSurface}
                style={{
                    fontFamily,
                    shadowColor: theme.lightSurface,
                    shadowOffset: { width: 0.5, height: 0 },
                    shadowOpacity: 1,
                    shadowRadius: 0,
                    elevation: 4,
                    textAlign: "center",
                    height: 74,
                    paddingHorizontal: 8,
                }} />

            <AceButton title="Back" onPress={handlePress} circle >
                <Ionicons name="close" size={32} color={theme.lightSurface} />
            </AceButton>
        </Animated.View>
    )
}