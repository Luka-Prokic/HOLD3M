import { Fragment } from "react";
import { router, Stack } from "expo-router";
import { ScreenContent } from "@/components/ui/utils/ScreenContent";
import { AceButton } from "@/components/ui/buttons/AceButton";
import { useThemeStore } from "@/stores/themeStore";
import { HeaderButton } from "@/components/ui/buttons/HeaderButton";
import { EndDayButton } from "@/components/ui/mock/EndDayButton";
import { View } from "react-native";

export default function Page() {
    const { setTheme } = useThemeStore();

    return (
        <Fragment>
            <Stack.Screen options={{
                headerRight: () => <HeaderButton title="Home" onPress={() => router.dismissTo("/")} />,
            }} />

            <ScreenContent edges={["top"]} >
                <View style={{ paddingHorizontal: 16, gap: 16 }}>
                    <EndDayButton />
                    <AceButton title="DARK" onPress={() => setTheme("dark")} />
                    <AceButton title="LIGHT" onPress={() => setTheme("light")} />
                    <AceButton title="Accent & Tint" onPress={() => router.push("/settings/accent-tint")} />
                </View>
            </ScreenContent>
        </Fragment >
    );
}
