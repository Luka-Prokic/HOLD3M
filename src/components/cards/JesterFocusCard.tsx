import { useSettingsStore } from "@/stores/settings/settingsStore";
import { WIDTH } from "@/utils/Dimensions";
import { Text, Pressable, TextInput } from "react-native";
import { Fragment, useEffect, useState } from "react";
import { Card } from "@/stores/game/types";
import { tintColorInvert } from "@/utils/hexToRGBA";
import { useAnimationStore } from "@/stores/animation/animationStore";
import { useGameStore } from "@/stores/game/gameStore";

interface JesterFocusCardProps {
    card: Card;
}

export function JesterFocusCard({ card }: JesterFocusCardProps) {
    const { cardColors, theme, cardText } = useSettingsStore();
    const { setHandAnimationPosition, handAnimationPosition } = useAnimationStore();
    const { writeOnJester } = useGameStore();

    const cardHeight = (WIDTH - 48) * 1.4;
    const cardWidth = WIDTH - 48;

    const borderColor = tintColorInvert(cardColors.background, 0.2);

    const [isFocused, setIsFocused] = useState(false);

    function handlePress() {
        setIsFocused(true);
        setHandAnimationPosition("focus");
    }

    function handleBlur() {
        setIsFocused(false);
        setHandAnimationPosition("card");
    }

    useEffect(() => {
        if (handAnimationPosition !== "focus") {
            setIsFocused(false);
        }
    }, [handAnimationPosition]);

    return (
        <Fragment>
            <Pressable
                style={{
                    width: cardWidth,
                    height: cardHeight,
                    borderRadius: 32,
                    padding: 8,
                    backgroundColor: cardColors.background,
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
                }}
                onPress={handlePress}
            >
                <Text style={{ fontSize: 48, fontWeight: "800", color: cardColors.text }}>X</Text>
                {isFocused ?
                    <TextInput
                        style={{ fontSize: cardText.size, fontWeight: cardText.weight, fontFamily: cardText.family, color: cardColors.text }}
                        value={card.text}
                        onBlur={handleBlur}
                        onChangeText={(text) => writeOnJester(card, text)}
                        autoFocus
                    />
                    :
                    <Text style={{ fontSize: cardText.size, fontWeight: cardText.weight, fontFamily: cardText.family, color: cardColors.text }}>{card.text}</Text>}
            </Pressable>
        </Fragment>

    );
}