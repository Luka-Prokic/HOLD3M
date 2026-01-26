import { CenterCardSlider } from "@/components/ui/sliders/CenterCardSlider";
import { View } from "react-native";
import { useSettingsStore } from "@/stores/settings/settingsStore";
import { IText } from "@/components/ui/texts/IText";
import { WIDTH } from "@/utils/Dimensions";
import { tintColorInvert } from "@/utils/hexToRGBA";
import { HapticButton } from "@/components/ui/buttons/HapticButton";
import { CARD_BACKGROUND_COLORS } from "@/stores/settings/constant";



export function CardBackgroundColorSelector() {
    const { cardColors } = useSettingsStore();
    const selectedIndex = CARD_BACKGROUND_COLORS.indexOf(cardColors.background);
    return (
        <View style={{ gap: 8 }}>
            <IText text="BACKGROUND" white center />
            <CenterCardSlider
                data={CARD_BACKGROUND_COLORS}
                card={(item) => <CardBackgroundColorCard color={item.item as string} />}
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