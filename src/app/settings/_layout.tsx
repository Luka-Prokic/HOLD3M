import { Stack } from 'expo-router/stack';
import { useThemeStore } from '@/stores/themeStore';

export default function Layout() {
  const { theme } = useThemeStore();
  return (
    <Stack
      screenOptions={{
        headerBackButtonDisplayMode: 'minimal',
        headerTitleAlign: 'center',
        title: '',
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
        name="accent-tint"
        options={{
          presentation: "modal",
        }}
      />
    </Stack>
  );
}