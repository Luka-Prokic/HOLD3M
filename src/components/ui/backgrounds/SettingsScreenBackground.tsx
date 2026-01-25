import { useSettingsStore } from "@/stores/settings/settingsStore";
import { PremadeDiamondBackground } from "./PremadeDiamondBackground";
import { View } from "react-native";
import { hexToRGBA } from "@/utils/hexToRGBA";


export function SettingsScreenBackground() {
    const { accentColor, themeName, tintColor } = useSettingsStore();

    return (
        <View style={{
            flex: 1,
            position: "absolute", top: 0, left: 0, bottom: 0, right: 0,
            backgroundColor: tintColor
        }}>
            <View
                style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    alignItems: "center",
                    backgroundColor: hexToRGBA(accentColor, themeName === "dark" ? 0.4 : 0),
                }} >
                <PremadeDiamondBackground />
            </View>
        </View>
    );
}