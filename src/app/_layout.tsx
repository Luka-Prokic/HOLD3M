import { Stack } from 'expo-router/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { StatusBar } from 'expo-status-bar';
import { useThemeStore } from '@/stores/themeStore';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  const { theme, themeName } = useThemeStore();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <StatusBar style={themeName === "dark" ? "light" : "dark"} />
          <Stack
            screenOptions={{
              headerBackButtonDisplayMode: 'minimal',
              headerTitleAlign: 'center',
              headerTitle: '',
              headerStyle: {
                backgroundColor: theme.background,
              },
              headerShadowVisible: false,
              contentStyle: {
                backgroundColor: theme.background,
              },
            }}
          >
            <Stack.Screen
              name="index"
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="settings"
            />
            <Stack.Screen
              name="hand"
              options={{
                presentation: "fullScreenModal",
              }}
            />
            <Stack.Screen
              name="card"
            />
          </Stack>

        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}