import { View } from "react-native";
import { AceButton } from "./AceButton";



interface HeaderButtonProps {
    title: string;
    onPress: () => void;
}
export function HeaderButton({ title, onPress }: HeaderButtonProps) {
    return (
        <View style={{ paddingVertical: 8 }} >
            <AceButton title={title} onPress={onPress} />
        </View>
    );
}