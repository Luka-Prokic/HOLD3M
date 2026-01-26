import { CenterCardSlider } from "@/components/ui/sliders/CenterCardSlider";
import { View } from "react-native";
import { useSettingsStore } from "@/stores/settings/settingsStore";
import { IText } from "@/components/ui/texts/IText";
import { WIDTH } from "@/utils/Dimensions";
import { tintColorInvert } from "@/utils/hexToRGBA";
import { HapticButton } from "@/components/ui/buttons/HapticButton";
import { CARD_TEXT_COLORS } from "@/stores/settings/constant";


export function CardTextColorSelector() {
    const { cardColors } = useSettingsStore();
    const selectedIndex = CARD_TEXT_COLORS.indexOf(cardColors.text);

    return (
        <View style={{ gap: 8 }}>
            <IText text="TEXT" white center />
            <CenterCardSlider
                data={CARD_TEXT_COLORS}
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