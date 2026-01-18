import { Stack } from 'expo-router/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <BottomSheetModalProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerBackButtonDisplayMode: 'minimal',
            headerTitleAlign: 'center',
            headerTitle: '',
            headerTransparent: true,
            headerStyle: {
              backgroundColor: 'transparent',
            },
            headerShadowVisible: false,
            contentStyle: {
              backgroundColor: "white",
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
          />
          <Stack.Screen
            name="card"
          />
        </Stack>
      </BottomSheetModalProvider>
    </SafeAreaProvider>
  );
}