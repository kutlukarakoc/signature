import React, { useState, useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { SignatureProvider } from "./src/contexts/SignatureContext";
import { AppNavigator } from "./src/navigation/app-navigator";
import { SplashScreen } from "./src/screens/splash-screen";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  const onSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <SignatureProvider>
        {showSplash ? (
          <SplashScreen onFinish={onSplashFinish} />
        ) : (
          <AppNavigator />
        )}
      </SignatureProvider>
    </SafeAreaProvider>
  );
}
