import { useSettingsStore } from "@/stores/settings/settingsStore";
import { QueenButton } from "./QueenButton";

interface AccentTintButtonProps {
    title: string;
    tint: string;
    accent: string;
}

export function AccentTintButton({ title, tint, accent }: AccentTintButtonProps) {
    const { accentColor, tintColor, setAccentColor, setTintColor } = useSettingsStore();

    const isSelected = accentColor === accent && tintColor === tint;

    function handlePress() {
        setAccentColor(accent);
        setTintColor(tint);
    }

    return <QueenButton title={title} onPress={handlePress} themeType={isSelected ? "accent" : "default"} />
}