import React from 'react';
import { Stack } from 'expo-router';
import { AppProvider } from '@/providers/AppProvider';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};


export default function RootLayout() {
  return (
  <AppProvider>
    <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
  </AppProvider>
  );
}
