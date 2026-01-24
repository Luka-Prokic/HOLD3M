import { useSettingsStore } from "@/stores/settings/settingsStore";
import { WIDTH } from "@/utils/Dimensions";
import { Text, Pressable, TextInput } from "react-native";
import { useState } from "react";
import { useGameStore } from "@/stores/game/gameStore";
import { Card } from "@/stores/game/types";

interface JesterFocusCardProps {
    card: Card;
}

export function JesterFocusCard({ card }: JesterFocusCardProps) {
    const { addCard } = useGameStore();
    const { cardBackground, cardText, theme } = useSettingsStore();
    const cardHeight = (WIDTH - 48) * 1.4;
    const cardWidth = WIDTH - 48;

    const [text, setText] = useState("");
    const [focus, setFocus] = useState(false);

    function handleLongPress() {
        setFocus(false);
        addCard({ ...card, text });
    }

    return (
        <Pressable
            style={{
                width: cardWidth,
                height: cardHeight,
                borderRadius: 16,
                padding: 8,
                backgroundColor: cardBackground,
                borderWidth: 4,
                borderTopWidth: 0,
                borderLeftWidth: 1,
                borderRightWidth: 3,
                borderColor: theme.shadow,
                shadowColor: theme.shadow,
                shadowOffset: { width: 0, height: 32 },
                shadowOpacity: 1,
                shadowRadius: 8,
                elevation: 8,
                zIndex: 1,
            }}
            onPress={() => setFocus(!focus)}
            onLongPress={handleLongPress}
        >
            <Text style={{ fontSize: 48, fontWeight: "bold", color: cardText }}>X</Text>
            {focus ?
                <TextInput
                    style={{ fontSize: 24, color: cardText }}
                    value={text}
                    onChangeText={setText}
                    onBlur={() => setFocus(false)}
                    autoFocus
                />
                :
                <Text style={{ fontSize: 24, color: cardText }}>{text}</Text>}
        </Pressable>
    );
}