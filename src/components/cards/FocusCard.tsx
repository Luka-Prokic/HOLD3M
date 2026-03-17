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
    const { cardColors, themeName, theme, tintColor, accentColor } = useSettingsStore();
    const { heldCards, releaseCard, holdCard } = useGameStore();

    const successRef = useRef<CardTagRef>(null);
    const failRef = useRef<CardTagRef>(null);

    const isHeld = heldCards.some((heldCard) => heldCard.id === card.id);

    const cardHeight = (WIDTH - 48) * 1.4;
    const cardWidth = WIDTH - 48;

    const tagColor = themeName === "light" ? accentColor : tintColor;
    const tagTextColor = themeName === "light" ? tintColor : accentColor;

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
                    <CardText card={card} />
                    <CardFace card={card} width={cardWidth} height={cardHeight} />

                </View>
            </ShakyLongPress>

            <CardTag
                ref={successRef}
                tag={isHeld ? "Held" : "unHeld"}
                color={tagColor}
                textColor={tagTextColor}
                top={16}
            />

            <CardTag
                ref={failRef}
                tag="X"
                color={theme.darkSurface}
                textColor={theme.lightSurface}
                top={16}
            />
        </View>
    );
}


function CardText({ card }: { card: Card }) {
    const { cardColors, cardText } = useSettingsStore();

    return (
        <View style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 16,
        }}>
            <Text style={{
                fontSize: cardText.size,
                fontWeight: cardText.weight,
                fontFamily: cardText.family,
                color: cardColors.text,
                textAlign: "center",
            }}>{card.text}</Text>
        </View>
    );
}