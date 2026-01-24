import { View, ViewStyle, Text } from "react-native";
import { GlassCard } from "../ui/buttons/GlassCard";
import { HearthSwitch } from "../ui/buttons/HearthSwitch";
import { useThemeStore } from "@/stores/themeStore";


interface SwitchGlassOptionProps {
    title?: string;
    description?: string;
    value: boolean;
    onChange: (value: boolean) => void;
    style?: ViewStyle | ViewStyle[];
}

export function SwitchGlassOption({ title, description, value, onChange, style }: SwitchGlassOptionProps) {
    const { theme } = useThemeStore();

    return (
        <GlassCard style={{ gap: 8, ...style }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8, width: "100%" }}>
                {title && <Text style={{ fontSize: 20, fontWeight: "800", color: theme.text }}>{title}</Text>}
                <HearthSwitch value={value} onChange={onChange} />
            </View>
            {description && <Text style={{ fontSize: 18, fontWeight: "600", color: theme.text }}>{description}</Text>}
        </GlassCard >
    );
}