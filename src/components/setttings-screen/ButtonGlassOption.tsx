import { ViewStyle } from "react-native";
import { GlassCard } from "../ui/buttons/GlassCard";
import { Paragraph, ParagraphProps } from "../ui/texts/Paragraph";
import { Ionicons } from "@expo/vector-icons";
import { QueenButton, QueenButtonProps } from "../ui/buttons/QueenButton";
import { WIDTH } from "@/utils/Dimensions";


interface ButtonGlassOptionProps {
    icon?: keyof typeof Ionicons.glyphMap;
    title?: string;
    description?: string;
    label?: string;
    onPress: () => void;
    style?: ViewStyle | ViewStyle[];
    buttonConfig?: QueenButtonProps;
    paragraphConfig?: ParagraphProps;
}

export function ButtonGlassOption({ icon, title, description, label, onPress, style, buttonConfig, paragraphConfig }: ButtonGlassOptionProps) {

    return (
        <GlassCard style={{ gap: 8, ...style }}>
            <Paragraph icon={icon} title={title} description={description} {...paragraphConfig} />
            {label && <QueenButton title={label} onPress={onPress} width={WIDTH - 64} {...buttonConfig} />}
        </GlassCard >
    );
}