import { View } from "react-native";
import { useSettingsStore } from "@/stores/settings/settingsStore";
import { IText } from "@/components/ui/texts/IText";
import { WIDTH } from "@/utils/Dimensions";
import { HapticButton } from "@/components/ui/buttons/HapticButton";
import { CardTextWeight } from "@/stores/settings/types";
import { CARD_TEXT_WEIGHTS } from "@/stores/settings/constant";

export function CardTextWeightSelector() {
    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            {CARD_TEXT_WEIGHTS.map((weight: CardTextWeight) => (
                <CardTextWeightCard key={weight} weight={weight} />
            ))}
        </View>
    );
}

function CardTextWeightCard({ weight }: { weight: CardTextWeight }) {
    const { cardText, setCardTextField, theme } = useSettingsStore();
    const unit = (WIDTH - 32) / 4;
    const isSelected = cardText.weight === weight;

    return (
        <HapticButton
            onPress={() => setCardTextField("weight", weight)}
            style={{
                width: unit,
                height: 54,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <IText text="A" weight={weight} size={32} color={isSelected ? theme.lightSurface : theme.lightSurface + "80"} />
        </HapticButton>
    );
}