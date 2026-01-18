import { Stack } from 'expo-router/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { StatusBar } from 'expo-status-bar';
import { useThemeStore } from '@/stores/themeStore';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  const { themeName } = useThemeStore();

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
                backgroundColor: "transparent",
              },
              headerShadowVisible: false,
              headerTransparent: true,
              contentStyle: {
                backgroundColor: "transparent",
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
                presentation: "transparentModal",
              }}
            />
            <Stack.Screen
              name="card"
              options={{
                presentation: "transparentModal",
              }}
            />
          </Stack>

        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}