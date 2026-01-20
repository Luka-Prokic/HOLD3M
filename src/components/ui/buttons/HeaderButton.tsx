import { TouchableOpacityProps, ViewStyle } from "react-native";
import { AceButton } from "./AceButton";



interface HeaderButtonProps extends TouchableOpacityProps {
    title: string;
    children?: React.ReactNode;
    style?: ViewStyle | ViewStyle[];
    buttonStyle?: ViewStyle | ViewStyle[];
}
export function HeaderButton({ title, children, buttonStyle, ...touchableOpacityProps }: HeaderButtonProps) {
    return (
        <AceButton title={title} children={undefined} buttonStyle={buttonStyle} {...touchableOpacityProps} />
    );
}