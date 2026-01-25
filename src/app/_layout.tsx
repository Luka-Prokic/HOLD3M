import { Stack } from 'expo-router/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { StatusBar } from 'expo-status-bar';
import { useSettingsStore } from '@/stores/settings/settingsStore';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  const { themeName, theme } = useSettingsStore();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <StatusBar style={themeName === "dark" ? "light" : "dark"} />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: theme.background,
              },
            }}
          >
            <Stack.Screen
              name="index"
            />
            <Stack.Screen
              name="settings"
            />
            <Stack.Screen
              name="hand"
              options={{
                presentation: "transparentModal",
                contentStyle: {
                  backgroundColor: "transparent",
                },
              }}
            />
            <Stack.Screen
              name="card"
              options={{
                presentation: "transparentModal",
                contentStyle: {
                  backgroundColor: "transparent",
                },
              }}
            />
            <Stack.Screen
              name="board"
            />
          </Stack>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}