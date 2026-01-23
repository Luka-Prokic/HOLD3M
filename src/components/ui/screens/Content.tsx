import { WIDTH } from "@/utils/Dimensions";
import { StyleProp, View, ViewStyle } from "react-native";


interface ContentProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}


export function Content({ children, style }: ContentProps) {
    return (
        <View style={[{ width: WIDTH, padding: 16, gap: 32 }, style]}>
            {children}
        </View>

    );
}