import { Fragment } from "react";
import { router, Stack } from "expo-router";
import { ScreenContent } from "@/components/ui/utils/ScreenContent";
import { AceButton } from "@/components/ui/buttons/AceButton";
import { useThemeStore } from "@/stores/themeStore";

export default function Page() {
    const { setTheme } = useThemeStore();

    return (
        <Fragment>
            <Stack.Screen options={{
                headerRight: () => <AceButton title="Back" onPress={() => router.dismissTo("/")} />,
            }} />

            <ScreenContent >
                <AceButton title="DARK" onPress={() => setTheme("dark")} />
                <AceButton title="LIGHT" onPress={() => setTheme("light")} />
            </ScreenContent>
        </Fragment >
    );
}
