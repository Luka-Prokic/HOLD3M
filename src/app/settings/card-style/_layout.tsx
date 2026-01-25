import { Tabs } from "expo-router";
import { useSettingsStore } from "@/stores/settings/settingsStore";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
    const { theme } = useSettingsStore();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                headerShadowVisible: false,
                tabBarStyle: {
                    backgroundColor: theme.darkSurface,
                    height: 144,
                    paddingTop: 16,
                    // borderTopLeftRadius: 27,
                    // borderTopRightRadius: 27,
                    borderTopColor: "transparent",
                },
                tabBarLabelStyle: {
                    fontSize: 18,
                    fontWeight: "600",
                },
                tabBarIconStyle: {
                    height: 36,
                    width: 36,
                    alignItems: "center",
                    justifyContent: "center",
                },
                tabBarActiveTintColor: theme.lightSurface,
                tabBarInactiveTintColor: theme.lightSurface + "80",
            }}
        >
            <Tabs.Screen
                name="color"
                options={{
                    title: "COLOR",
                    tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? "color-fill" : "color-fill-outline"} color={color} size={32} />
                }}
            />

            <Tabs.Screen
                name="text"
                options={{
                    title: "TEXT",
                    tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? "text" : "text-outline"} color={color} size={32} />
                }}
            />

            <Tabs.Screen
                name="deck"
                options={{
                    title: "DECK",
                    tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? "albums" : "albums-outline"} color={color} size={32} style={{ transform: [{ rotate: "90deg" }] }} />
                }}
            />
        </Tabs>
    );
} 