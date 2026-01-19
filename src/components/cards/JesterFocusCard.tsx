import { useThemeStore } from "@/stores/themeStore";
import { WIDTH } from "@/utils/Dimensions";
import { Text, Pressable, TextInput } from "react-native";
import { useState } from "react";
import { useGameStore } from "@/stores/game/useGameStore";
import { router } from "expo-router";

export function JesterFocusCard() {
    const { addCard } = useGameStore();
    const { cardBackground, cardText } = useThemeStore();
    const cardHeight = (WIDTH - 48) * 1.4;
    const cardWidth = WIDTH - 48;

    const [text, setText] = useState("");
    const [focus, setFocus] = useState(false);

    function handleLongPress() {
        setFocus(false);
        addCard(text);
        // router.dismissTo("/hand");
    }

    return (
        <Pressable
            style={{ width: cardWidth, height: cardHeight, borderRadius: 16, padding: 8, backgroundColor: cardBackground }}
            onPress={() => setFocus(!focus)}
            onLongPress={handleLongPress}
        >
            <Text style={{ fontSize: 48, fontWeight: "bold", color: cardText }}>J</Text>
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