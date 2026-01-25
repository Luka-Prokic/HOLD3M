import { View } from "react-native";
import { useSettingsStore } from "@/stores/settings/settingsStore";
import { IText } from "@/components/ui/texts/IText";
import { WIDTH } from "@/utils/Dimensions";
import { HapticButton } from "@/components/ui/buttons/HapticButton";
import { CardTextSize } from "@/stores/settings/types";
import { CARD_TEXT_SIZES } from "@/stores/settings/constant";

export function CardTextSizeSelector() {
    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            {CARD_TEXT_SIZES.map((size: CardTextSize) => (
                <CardTextSizeCard key={size} size={size} />
            ))}
        </View>
    );
}

function CardTextSizeCard({ size }: { size: CardTextSize }) {
    const { cardText, setCardTextField, theme } = useSettingsStore();
    const unit = (WIDTH - 32) / 4;
    const isSelected = cardText.size === size;

    return (
        <HapticButton
            onPress={() => setCardTextField("size", size)}
            style={{
                width: unit,
                height: 54,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <IText text="Aa" size={size} color={isSelected ? theme.lightSurface : theme.lightSurface + "80"} />
        </HapticButton>
    );
}