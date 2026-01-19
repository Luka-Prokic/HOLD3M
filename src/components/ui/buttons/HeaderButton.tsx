import { PressableProps, View, ViewStyle } from "react-native";
import { AceButton } from "./AceButton";



interface HeaderButtonProps extends PressableProps {
    title: string;
    children?: React.ReactNode;
    style?: ViewStyle | ViewStyle[];
    buttonStyle?: ViewStyle | ViewStyle[];
}
export function HeaderButton({ title, children, buttonStyle, ...props }: HeaderButtonProps) {
    return (
        <View style={{ paddingVertical: 8 }} >
            <AceButton title={title} children={undefined} buttonStyle={buttonStyle} {...props} />
        </View>
    );
}