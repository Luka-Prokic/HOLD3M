import { View } from "react-native";
import { useGameStore } from "@/stores/game/gameStore";
import { PreviewCard } from "../cards/PreviewCard";
import { WIDTH } from "@/utils/Dimensions";

export function CurrentHomeHand() {
    const { currentHand } = useGameStore();

    return (
        <View
            style={{
                width: "100%",
                height: 200,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {currentHand.map((card, index) => {
                const offset = index - 2;
                const distance = Math.abs(offset);

                const translateX = offset * 44;
                let translateY = 0;

                // Middle card highest, immediate neighbors slightly raised
                if (distance === 0) translateY = -34; // middle card up
                else if (distance === 1) translateY = -24; // next to middle slightly up

                const rotation = offset * 12;

                return (
                    <View
                        key={card.id}
                        style={{
                            position: "absolute",
                            transform: [
                                { translateX },
                                { translateY },
                                { rotate: `${rotation}deg` },
                            ],
                        }}
                    >
                        <PreviewCard
                            card={card}
                            width={WIDTH / 4}
                            privewOnly={true}
                        />
                    </View>
                );
            })}
        </View>
    );
}