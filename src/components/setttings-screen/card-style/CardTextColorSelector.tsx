import { CenterCardSlider } from "@/components/ui/sliders/CenterCardSlider";
import { Pressable, View } from "react-native";
import { useSettingsStore } from "@/stores/settings/settingsStore";
import { IText } from "@/components/ui/texts/IText";
import { WIDTH } from "@/utils/Dimensions";
import { tintColorInvert } from "@/utils/hexToRGBA";
import { HapticButton } from "@/components/ui/buttons/HapticButton";

export const TEXT_COLORS: string[] = [
    "#141414", // deep graphite black
    "#1E1E1E", // soft black
    "#2A2A2A", // charcoal
    "#2A2F3A", // blue-black ink
    "#1F2A44", // navy ink
    "#2B3A55", // faded denim ink
    "#3A2A2A", // dark warm brown ink
    "#4A2323", // dried red ink
    "#5A1F1F", // deep burgundy ink

    "#E0E0E0", // soft white
    "#F2F2F2", // paper white
    "#F4EEDC", // warm parchment
];

export function CardTextColorSelector() {
    const { cardColors } = useSettingsStore();
    const selectedIndex = TEXT_COLORS.indexOf(cardColors.text);
    return (
        <View style={{ gap: 8 }}>
            <IText text="TEXT" inverted center />
            <CenterCardSlider
                data={TEXT_COLORS}
                card={(item) => <CardTextColorCard color={item.item} />}
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

function CardTextColorCard({ color }: { color: string }) {
    const { cardColors, setCardColorsField } = useSettingsStore();
    const unit = WIDTH / 5 - 8;

    const isSelected = cardColors.text === color;

    const borderColor = tintColorInvert(color, isSelected ? 0.6 : 0.2);

    return (
        <HapticButton
            onPress={() => setCardColorsField("text", color)}
            style={{
                width: unit,
                height: unit,
                borderRadius: unit / 2,
                borderWidth: 4,
                borderColor: borderColor,
                backgroundColor: color,
            }}
        />
    );
}