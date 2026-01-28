import { View, Text } from "react-native";
import { QueenButton } from "../ui/buttons/QueenButton";
import { IText } from "../ui/texts/IText";
import { useSettingsStore } from "@/stores/settings/settingsStore";
import { HAND_RANKS_CHEATSHEET, type HandRankCheatsheet } from "@/stores/game/constants";


export default function HandRankBoard() {
    const { theme } = useSettingsStore();

    return (
        <View style={{ padding: 16, gap: 8 }}>
            {HAND_RANKS_CHEATSHEET.map((rank: HandRankCheatsheet) => (
                <QueenButton key={rank.rank} gradientStyle={{ paddingHorizontal: 0 }} >
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                        <Text
                            style={{
                                fontSize: 24,
                                fontWeight: "600",
                                color: theme.darkSurface,
                                shadowColor: theme.darkSurface,
                                shadowOffset: { width: 1, height: 0 },
                                shadowOpacity: 1,
                                shadowRadius: 0,
                                elevation: 4,
                                paddingHorizontal: 8,
                            }}>
                            {rank.rank
                            }</Text>
                        <IText text={rank.example.join("")} style={{ paddingRight: 8 }} black />
                    </View>
                </QueenButton>
            ))}
        </View>
    )
}