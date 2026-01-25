import { CenterCardSlider } from "@/components/ui/sliders/CenterCardSlider";
import { View } from "react-native";
import { useSettingsStore } from "@/stores/settings/settingsStore";
import { IText } from "@/components/ui/texts/IText";
import { WIDTH } from "@/utils/Dimensions";
import { tintColorInvert } from "@/utils/hexToRGBA";
import { HapticButton } from "@/components/ui/buttons/HapticButton";

export const BACKGROUND_COLORS: string[] = [
    "#F0ECE6", // soft off-white
    "#E6E2DC", // warm paper
    "#DAD7D2", // light parchment
    "#3B2F3A", // muted plum
    "#2F3B36", // deep forest green
    "#2E3A4A", // desaturated navy
    "#4A2E2E", // dark burgundy
    "#3A3A40", // warm dark gray
    "#2A2A2D", // charcoal
    "#1C1C1E", // deep graphite black
];

export function CardBackgroundColorSelector() {
    const { cardColors } = useSettingsStore();
    const selectedIndex = BACKGROUND_COLORS.indexOf(cardColors.background);
    return (
        <View style={{ gap: 8 }}>
            <IText text="BACKGROUND" inverted center />
            <CenterCardSlider
                data={BACKGROUND_COLORS}
                card={(item) => <CardBackgroundColorCard color={item.item} />}
                selectedIndex={selectedIndex}
                cardWidth={WIDTH / 5}
                cardHeight={70}
                sliderHeight={70}
                sliderWidth={WIDTH}
                animationType="flat"
                hideDots
            />
        </View>
    );
}

function CardBackgroundColorCard({ color }: { color: string }) {
    const { cardColors, setCardColorsField } = useSettingsStore();
    const unit = WIDTH / 5 - 8;

    const isSelected = cardColors.background === color;
    const borderColor = tintColorInvert(color, isSelected ? 0.6 : 0.2);

    return (
        <HapticButton
            onPress={() => setCardColorsField("background", color)}
            style={{
                width: unit,
                height: unit,
                borderRadius: unit / 2,
                borderWidth: 4,
                borderColor: borderColor,
                backgroundColor: color
            }} />
    );
}