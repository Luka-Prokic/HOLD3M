import { useSettingsStore } from "@/stores/settings/settingsStore";
import { Card } from "@/stores/game/types";
import { WIDTH } from "@/utils/Dimensions";
import { Text, View } from "react-native";
import { useGameStore } from "@/stores/game/gameStore";
import { isLightColor, mixColors, tintColorInvert } from "@/utils/hexToRGBA";
import { ShakyLongPress } from "./ShakyLongPress";
import { CardFace } from "./CardFace";
import { CardTag, CardTagRef } from "../ui/animations/CardTags";
import { useRef } from "react";


interface FocusCardProps {
    card: Card;
}

export function FocusCard({ card }: FocusCardProps) {
    const { cardColors, cardText, theme, tintColor } = useSettingsStore();
    const { heldCards, releaseCard, holdCard } = useGameStore();

    const successRef = useRef<CardTagRef>(null);
    const failRef = useRef<CardTagRef>(null);

    const isHeld = heldCards.some((heldCard) => heldCard.id === card.id);

    const cardHeight = (WIDTH - 48) * 1.4;
    const cardWidth = WIDTH - 48;

    const isItLightColor = isLightColor(cardColors.background);
    const backgroundColor = mixColors(cardColors.background, theme.select, isHeld ? (isItLightColor ? 0.8 : 0.2) : 0);
    const borderColor = tintColorInvert(cardColors.background, 0.2);

    function handleLongPress() {
        if (isHeld) {
            releaseCard(card.id);
        } else {
            holdCard(card.id);
        }
    }

    return (
        <View
            style={{
                width: cardWidth,
                height: cardHeight,
                position: "relative",
            }}
        >
            <ShakyLongPress
                onRelease={() => {
                    handleLongPress();
                    successRef.current?.trigger();
                }}
                onHoldFail={() => {
                    failRef.current?.trigger();
                }}>
                <View
                    style={{
                        width: cardWidth,
                        height: cardHeight,
                        borderRadius: 32,
                        // padding: 8,
                        overflow: "hidden",
                        backgroundColor,
                        borderWidth: 4,
                        borderTopWidth: 0,
                        borderLeftWidth: 1,
                        borderRightWidth: 3,
                        borderColor: borderColor,
                        shadowColor: theme.shadow,
                        shadowOffset: { width: 0, height: 32 },
                        shadowOpacity: 1,
                        shadowRadius: 8,
                        elevation: 8,
                        zIndex: 1,
                    }} >
                    <CardFace card={card} width={cardWidth} height={cardHeight} />
                    <Text style={{ fontSize: cardText.size, fontWeight: cardText.weight, fontFamily: cardText.family, color: cardColors.text }}>{card.text}</Text>
                </View>
            </ShakyLongPress>

            <CardTag
                ref={successRef}
                tag={isHeld ? "Held" : "unHeld"}
                color={tintColor}
                fadeInMs={200}
                visibleForMs={800}
            />

            <CardTag
                ref={failRef}
                tag="X"
                color={theme.error}
                fadeInMs={200}
                visibleForMs={600}
            />
        </View>
    );
}