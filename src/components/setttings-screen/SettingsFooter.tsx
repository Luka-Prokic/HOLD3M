import { QueenButton } from "../ui/buttons/QueenButton";
import { Text } from "react-native";
import { router } from "expo-router";
import { useThemeStore } from "@/stores/themeStore";
import { useBalletFont } from "@/utils/fonts/useBalletFont";
import { Fragment } from "react";


export function SettingsFooter() {
    const { tintColor } = useThemeStore();
    const { fontFamily } = useBalletFont();

    return (
        <Fragment>
            <QueenButton
                title="Aboug Holdem."
                onPress={() => router.push("/settings/about-holdem")}
                themeType="accent"
                height={64}
                buttonStyle={{ borderRadius: 32 }}
            >
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: "600",
                        color: tintColor
                    }}>
                    About{" "}
                    <Text style={{
                        fontFamily,
                        fontSize: 32,
                        color: "#F1EFEA",
                        textShadowColor: "#F1EFEA",
                        textShadowOffset: { width: 1, height: 0 },
                        textShadowRadius: 0
                    }}>Holdem</Text>{" "}.</Text>
            </QueenButton>

        </Fragment >

    );
}