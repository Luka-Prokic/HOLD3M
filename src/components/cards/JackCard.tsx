import { useSettingsStore } from "@/stores/settings/settingsStore";
import { Card } from "@/stores/game/types";
import { WIDTH } from "@/utils/Dimensions";
import { useGameStore } from "@/stores/game/gameStore";
import { isLightColor, mixColors, tintColorInvert } from "@/utils/hexToRGBA";
import { ShakyLongPress } from "./TestCard";
import Animated, { FadeInDown, SlideOutUp } from "react-native-reanimated";
import { CardFace } from "./CardFace";

interface JackCardProps {
    card: Card;
    onPress?: () => void;
    width?: number;
    privewOnly?: boolean;
    noHold?: boolean;
}

export function JackCard({ card, onPress, width = WIDTH / 3, privewOnly = false, noHold = false }: JackCardProps) {
    const { cardColors, theme } = useSettingsStore();
    const { holdCard, heldCards, releaseCard } = useGameStore();
    const { isAnimationsEnabled } = useSettingsStore();

    const isHeld = heldCards.some((c) => c.id === card.id);
    const isJester = card.repetition === -1;

    const cardWidth = width;
    const cardHeight = cardWidth * 1.4;

    const isItLightColor = isLightColor(cardColors.background);
    const backgroundColor = mixColors(cardColors.background, theme.select, isHeld ? (isItLightColor ? 0.4 : 0.2) : 0);
    const borderColor = tintColorInvert(cardColors.background, 0.2);

    function handlePress() {
        if (privewOnly) return;
        onPress?.();
    }

    function handleLongPress() {
        if (privewOnly || noHold) return;
        if (isHeld) {
            releaseCard(card.id);
        } else {
            holdCard(card.id);
        }
    }

    return (
        <ShakyLongPress onRelease={handleLongPress} onPress={handlePress} disableHold={noHold || isJester}>
            <Animated.View
                entering={isAnimationsEnabled ? FadeInDown.delay(100) : undefined}
                exiting={isAnimationsEnabled ? SlideOutUp : undefined}
                style={{
                    width: cardWidth,
                    height: cardHeight,
                    backgroundColor,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 16,
                    borderWidth: 4,
                    borderTopWidth: 0,
                    borderLeftWidth: 1,
                    borderRightWidth: 3,
                    borderColor: borderColor,
                    overflow: "hidden",
                }}
            >
                <CardFace card={card} width={cardWidth - 8} height={cardHeight - 8} />
            </Animated.View >
        </ShakyLongPress>
    );
}