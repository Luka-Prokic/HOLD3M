import { CenterCardSlider } from "@/components/ui/sliders/CenterCardSlider";
import { GlassCard } from "@/components/ui/sliders/GlassCard";
import { Text, View } from "react-native";
import { useThemeStore } from "@/stores/themeStore";
import { HEIGHT, WIDTH } from "@/utils/Dimensions";
import { useBalletFont } from "@/utils/fonts/useBalletFont";


interface ColorComboPickerProps {
    title: string;
    tint: string;
    accent: string;
}

const data: ColorComboPickerProps[] = [
    {
        title: "Crimson",
        tint: "#FF8A78",
        accent: "#7A3E2A"
    },
    {
        title: "Lavender",
        tint: "#B7AEFF",
        accent: "#5747E5"
    },
    {
        title: "Mono",
        tint: "#8C867C",
        accent: "#2A2723"
    }
]


export function ColorComboPicker() {
    const { setAccentColor, setTintColor, tintColor, accentColor } = useThemeStore();


    const initialScrollIndex = data.findIndex(item => item.tint === tintColor && item.accent === accentColor);

    function handleSelect(item: ColorComboPickerProps) {
        setAccentColor(item.accent);
        setTintColor(item.tint);
    }

    return (
        <CenterCardSlider
            data={data}
            card={(props) => <ColorComboCard {...props} />}
            initialScrollIndex={initialScrollIndex}
            selectedIndex={0}
            onSelect={(index) => {
                handleSelect(data[index]);
            }}
            cardWidth={WIDTH}
            cardHeight={(WIDTH - 32) * 0.8}
            sliderWidth={WIDTH}
            hideDots
        />

    )
}


function ColorComboCard({ item }: { item: ColorComboPickerProps }) {
    const { fontFamily } = useBalletFont();
    const { theme } = useThemeStore();

    return (
        <GlassCard style={{ width: WIDTH - 32 }} horizontal>
            <Text
                style={{
                    fontFamily,
                    fontSize: 64,
                    color: theme.text,
                    textShadowColor: theme.text,
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: 0,
                    paddingHorizontal: 16
                }}>{item.title}</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", paddingHorizontal: 16 }}>
                {["tint", "accent"].map((type) => (
                    <View
                        key={type}
                        style={{
                            width: 88,
                            height: 88,
                            backgroundColor: item[type as keyof ColorComboPickerProps],
                            borderWidth: 0.2,
                            borderColor: theme.lightSurface,
                            borderBottomWidth: 1,
                            borderTopWidth: 1,
                            borderRadius: 44
                        }}
                    />
                ))}
            </View>
        </GlassCard>
    )
}