import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { getSignaturesFromStorage } from "../utils/storage";
import { useSignatureContext } from "../contexts/SignatureContext";

export function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textPosition = useRef(new Animated.Value(20)).current;

  const { dispatch } = useSignatureContext();

  useEffect(() => {
    // Animation sequence
    const animateElements = async () => {
      // First animate the signature icon
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
      ]).start();

      // Then animate the text elements
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(textOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(textPosition, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start();
      }, 400);

      // Fetch saved signatures from storage
      const savedSignatures = await getSignaturesFromStorage();
      dispatch({ type: "SET_SIGNATURES", payload: savedSignatures || [] });

      // Finish the splash screen after the animation
      setTimeout(() => {
        onFinish();
      }, 2500);
    };

    animateElements();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={["#4a6ee0", "#7467ef"]}
        style={styles.background}
      >
        <View style={styles.content}>
          <Animated.View
            style={[
              styles.signatureContainer,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <Text style={styles.iconText}>✒️</Text>
          </Animated.View>

          <Animated.Text
            style={[
              styles.signatureText,
              {
                opacity: textOpacity,
                transform: [{ translateY: textPosition }],
              },
            ]}
          >
            Signature Generator
          </Animated.Text>

          <Animated.Text
            style={[
              styles.tagline,
              {
                opacity: textOpacity,
                transform: [{ translateY: textPosition }],
              },
            ]}
          >
            Create amazing signatures with AI
          </Animated.Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  signatureContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  iconText: {
    fontSize: 60,
  },
  signatureText: {
    fontSize: 32,
    fontWeight: "700",
    color: "white",
    marginBottom: 12,
  },
  tagline: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    paddingHorizontal: 40,
  },
});
