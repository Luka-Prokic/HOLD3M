import { View } from "react-native";
import { useSettingsStore } from "@/stores/settings/settingsStore";
import { IText } from "@/components/ui/texts/IText";
import { WIDTH } from "@/utils/Dimensions";
import { HapticButton } from "@/components/ui/buttons/HapticButton";
import { CardTextFamily } from "@/stores/settings/types";

const TEXT_FONTS: CardTextFamily[] = [
    "sans-serif",
    "serif",
    "monospace",
];

export function CardTextFontSelector() {
    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            {TEXT_FONTS.map((font) => (
                <CardTextFontCard key={font} font={font} />
            ))}
        </View>
    );
}

function CardTextFontCard({ font }: { font: CardTextFamily }) {
    const { cardText, setCardTextField, theme } = useSettingsStore();
    const unit = (WIDTH - 32) / 3;
    const isSelected = cardText.family === font;

    return (
        <HapticButton
            onPress={() => setCardTextField("family", font)}
            style={{
                width: unit,
                height: 54,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <IText text={font} style={{ fontFamily: font }} color={isSelected ? theme.lightSurface : theme.lightSurface + "80"} />
        </HapticButton>
    );
}