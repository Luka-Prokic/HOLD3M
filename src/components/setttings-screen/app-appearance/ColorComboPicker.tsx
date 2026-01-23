import { GlassCard } from "@/components/ui/sliders/GlassCard";
import { Text, View } from "react-native";
import { useThemeStore } from "@/stores/themeStore";
import { WIDTH } from "@/utils/Dimensions";
import { useBalletFont } from "@/utils/fonts/useBalletFont";
import { hexToRGBA } from "@/utils/hexToRGBA";


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
    },
    {
        title: "Eco",
        tint: "#8CB24A",
        accent: "#007F59"
    }
]


export function ColorComboPicker() {




    return (
        <View style={{ flexDirection: "row", width: "100%", gap: 8, flexWrap: "wrap" }}>
            {data.map((item) => (
                <ColorComboCard key={item.title} item={item} />
            ))}
        </View>
    )
}


function ColorComboCard({ item }: { item: ColorComboPickerProps }) {
    const { setAccentColor, setTintColor, tintColor, accentColor, themeName } = useThemeStore();
    const { fontFamily } = useBalletFont();
    const { theme } = useThemeStore();

    const isSelected = item.tint === tintColor && item.accent === accentColor;
    const glassTintColor = themeName === "light" ? accentColor : tintColor;

    function handleSelect(item: ColorComboPickerProps) {
        setAccentColor(item.accent);
        setTintColor(item.tint);
    }

    return (
        <GlassCard
            style={{
                width: (WIDTH - 48) / 2,
                padding: 0,
                backgroundColor: isSelected ? theme.select + "80" : hexToRGBA(glassTintColor as string, 0.4)
            }}
            onPress={() => handleSelect(item)}
        >
            <Text
                style={{
                    fontFamily,
                    fontSize: 48,
                    color: theme.text,
                    textShadowColor: theme.text,
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: 0,
                    width: "100%",
                    textAlign: "center",
                }}>{item.title}</Text>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                gap: 8,
                paddingHorizontal: 16,
                paddingBottom: 16,
            }}>
                {["tint", "accent"].map((type) => (
                    <View
                        key={type}
                        style={{
                            width: 54,
                            height: 54,
                            backgroundColor: item[type as keyof ColorComboPickerProps],
                            borderWidth: 0.2,
                            borderColor: theme.lightSurface,
                            borderBottomWidth: 1,
                            borderTopWidth: 1,
                            borderRadius: 44,
                        }}
                    />
                ))}
            </View>
        </GlassCard>
    )
}