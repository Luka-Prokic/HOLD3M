import { Text, View } from "react-native"
import { CenterCardSlider } from "@/components/ui/sliders/CenterCardSlider"
import { WIDTH } from "@/utils/Dimensions"
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { useSettingsStore } from "@/stores/settings/settingsStore";
import { useGameStore } from "@/stores/game/gameStore";

const TIME_STAMPS = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "24:00",
];

interface EndOfRoundSelectorProps {
    width?: number;
}

export function EndOfRoundSelector({ width = WIDTH - 64 }: EndOfRoundSelectorProps) {
    const { setEndOfRoundTime, endOfRoundTime } = useGameStore();
    const selectedIndex = TIME_STAMPS.indexOf(endOfRoundTime);

    function handleSelect(index: number) {
        setEndOfRoundTime(TIME_STAMPS[index]);
    }

    return (
        <View style={{ width, height: 108 }}>
            <View style={{ width: "100%", height: 54, borderRadius: 27, backgroundColor: "black", position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }} />
            <MaskedView
                maskElement={
                    <LinearGradient
                        colors={["transparent", "black", "black", "transparent"]}
                        locations={[0, 0.25, 0.75, 1]}
                        style={{ flex: 1 }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    />
                }
                style={{ zIndex: 1 }}
            >
                <CenterCardSlider
                    data={TIME_STAMPS}
                    card={({ item }) => <EndOfRoundCard item={item} width={width / 5} />}
                    selectedIndex={selectedIndex}
                    cardHeight={108}
                    cardWidth={width / 5}
                    sliderWidth={width}
                    contentContainerStyle={{ flexGrow: 0 }}
                    animationType="wheel"
                    hideDots
                    delayedSelect
                    selectDelay={200}
                    onSelect={handleSelect}
                />
            </MaskedView>
        </View>

    )
}

function EndOfRoundCard({ item, width }: { item: string, width: number }) {
    const { theme } = useSettingsStore();

    return <View style={{ width, height: 108, gap: 4, alignItems: "center" }} >
        <View style={{ width, height: 54, justifyContent: "center", alignItems: "center" }} >
            <View style={{ width: 4, height: 30, borderRadius: 2, backgroundColor: theme.lightSurface }} />
        </View>
        <Text style={{ fontSize: 18, fontWeight: "600", color: theme.text }}>
            {item}
        </Text>
    </View>
}