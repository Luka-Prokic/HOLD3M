import { useSettingsStore } from "@/stores/settings/settingsStore";
import { WIDTH } from "@/utils/Dimensions";
import { Text, Pressable, TextInput } from "react-native";
import { Fragment, useState } from "react";
import { useGameStore } from "@/stores/game/gameStore";
import { Card } from "@/stores/game/types";
import { tintColorInvert } from "@/utils/hexToRGBA";
import { useAnimationStore } from "@/stores/animation/animationStore";

interface JesterFocusCardProps {
    card: Card;
}

export function JesterFocusCard({ card }: JesterFocusCardProps) {
    const { addCard } = useGameStore();
    const { cardColors, theme, cardText } = useSettingsStore();
    const { setHandAnimationPosition } = useAnimationStore();
    const cardHeight = (WIDTH - 48) * 1.4;
    const cardWidth = WIDTH - 48;

    const borderColor = tintColorInvert(cardColors.background, 0.2);

    const [text, setText] = useState("");
    const [focus, setFocus] = useState(false);

    function handleLongPress() {
        setFocus(false);
        addCard({ ...card, text });
    }


    function handleBlur() {
        setHandAnimationPosition("card");
        setFocus(false);
    }

    function handlePress() {
        if (focus) {
            handleBlur();
        } else {
            setFocus(true);
            setHandAnimationPosition("focus");
        }
    }

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
                onLongPress={handleLongPress}
            >
                <Text style={{ fontSize: 48, fontWeight: "800", color: cardColors.text }}>X</Text>
                {focus ?
                    <TextInput
                        style={{ fontSize: cardText.size, fontWeight: cardText.weight, fontFamily: cardText.family, color: cardColors.text }}
                        value={text}
                        onChangeText={setText}
                        onBlur={handleBlur}
                        autoCorrect
                        spellCheck
                        textContentType="none"
                        keyboardType="default"
                        autoFocus
                    />
                    :
                    <Text style={{ fontSize: cardText.size, fontWeight: cardText.weight, fontFamily: cardText.family, color: cardColors.text }}>{text}</Text>}
            </Pressable>
        </Fragment>

    );
}