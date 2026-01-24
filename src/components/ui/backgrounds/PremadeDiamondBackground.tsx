import { useSettingsStore } from "@/stores/settings/settingsStore";
import { WIDTH } from "@/utils/Dimensions";
import { hexToRGBA } from "@/utils/hexToRGBA";
import { DiamondTileBackground } from "./DiamondTileBackground";



export function PremadeDiamondBackground() {
    const { theme, themeName } = useSettingsStore();
    const squareSize = WIDTH / 6;
    const squareColor = hexToRGBA(theme.background, themeName === "dark" ? 0.05 : 0.1);
    return (
        <DiamondTileBackground
            columns={6}
            rows={64}
            ratio={1.25}
            squareSize={squareSize}
            color={squareColor}
            style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}
        />
    );
}