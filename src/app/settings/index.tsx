import { Fragment } from "react";
import { router, Stack } from "expo-router";
import { ScreenContent } from "@/components/ui/utils/ScreenContent";
import { AceButton } from "@/components/ui/buttons/AceButton";
import { useThemeStore } from "@/stores/themeStore";
import { HeaderButton } from "@/components/ui/buttons/HeaderButton";

export default function Page() {
    const { setTheme } = useThemeStore();

    return (
        <Fragment>
            <Stack.Screen options={{
                headerRight: () => <HeaderButton title="Deck" onPress={() => router.dismissTo("/")} />,
            }} />

            <ScreenContent edges={["top"]} style={{ paddingHorizontal: 16 }}>
                <AceButton title="DARK" onPress={() => setTheme("dark")} />
                <AceButton title="LIGHT" onPress={() => setTheme("light")} />
                <AceButton title="Accent & Tint" onPress={() => router.push("/settings/accent-tint")} />
            </ScreenContent>
        </Fragment >
    );
}
