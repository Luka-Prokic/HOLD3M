import { useGameStore } from "@/stores/game/gameStore";
import Animated from "react-native-reanimated";
import { Card } from "@/stores/game/types";
import { WIDTH } from "@/utils/Dimensions";
import { useSettingsStore } from "@/stores/settings/settingsStore";
import { useCurrentShadowAnimation } from "@/stores/animation/utils/useCurrentShadowAnimation";

export function CurrentAnimatedShadow() {
    const { currentHand } = useGameStore();

    return (
        <Animated.View
            style={{
                flexDirection: "row",
                marginBottom: 64,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {currentHand.map((card: Card, index: number) => <Shadow key={card.id} index={index} />)}
        </Animated.View>
    );
}


function Shadow({ index }: { index: number }) {
    const { theme } = useSettingsStore();
    const animatedStyle = useCurrentShadowAnimation({ index });

    return (
        <Animated.View
            style={[
                {
                    width: WIDTH / 3,
                    height: 24,
                    backgroundColor: theme.darkSurface + "10",
                    borderRadius: 12,
                },
                animatedStyle,
            ]}
        >
        </Animated.View>
    );
}