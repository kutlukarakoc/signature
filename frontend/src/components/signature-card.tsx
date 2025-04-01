import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Share,
  Alert,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Signature } from "../types";
import { ThemeColors } from "../utils/config";
import { useSignatureContext } from "../contexts/SignatureContext";
import { removeSignatureFromStorage } from "../utils/storage";

interface SignatureCardProps {
  signature: Signature;
}

export function SignatureCard({ signature }: SignatureCardProps) {
  const { dispatch } = useSignatureContext();
  
  const downloadSignature = async () => {
    try {
      // Request permissions
      const { status } = await MediaLibrary.requestPermissionsAsync();
      
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "Unable to save signature without gallery permission."
        );
        return;
      }

      // Create a file URL in the device's cache directory
      const fileUri = FileSystem.cacheDirectory + `signature-${signature.id}.png`;

      // Download the image
      const { uri } = await FileSystem.downloadAsync(
        signature.imageUrl,
        fileUri
      );

      // Save to media library
      await MediaLibrary.saveToLibraryAsync(uri);
      
      // Success notification
      Alert.alert("Success!", "Signature saved to your gallery");
    } catch (error) {
      console.error("Error saving signature to gallery:", error);
      Alert.alert("Error", "An error occurred while saving the signature");
    }
  };

  const shareSignature = async () => {
    try {
      // Create a file URL in the device's cache directory
      const fileUri = FileSystem.cacheDirectory + `signature-${signature.id}.png`;

      // Download the image
      const { uri } = await FileSystem.downloadAsync(
        signature.imageUrl,
        fileUri
      );

      // Share the image
      await Share.share({
        url: uri,
        message: `Check out this signature I created with AI!`,
        title: `AI Generated Signature`,
      });
    } catch (error) {
      console.error("Error sharing signature:", error);
      Alert.alert("Error", "An error occurred while sharing the signature");
    }
  };
  
  const deleteSignature = async () => {
    Alert.alert(
      "Delete Signature",
      "Are you sure you want to delete this signature?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              // Remove from storage
              await removeSignatureFromStorage(signature.id);
              
              // Remove from context
              dispatch({ 
                type: "REMOVE_SIGNATURE", 
                payload: signature.id 
              });
            } catch (error) {
              console.error("Error deleting signature:", error);
              Alert.alert("Error", "Failed to delete signature");
            }
          }
        }
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: signature.imageUrl }}
        style={styles.signatureImage}
        resizeMode="contain"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.prompt} numberOfLines={2}>
          {signature.prompt}
        </Text>
        <Text style={styles.date}>{formatDate(signature.createdAt)}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={deleteSignature}
        >
          <Feather name="trash-2" size={20} color={ThemeColors.error} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={downloadSignature}
        >
          <Feather name="download" size={20} color={ThemeColors.primaryText} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={shareSignature}>
          <Feather name="share" size={20} color={ThemeColors.primaryText} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const { width } = Dimensions.get("window");
const cardWidth = width * 0.9;

const styles = StyleSheet.create({
  card: {
    backgroundColor: ThemeColors.card,
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    width: cardWidth,
    maxWidth: 500,
    alignSelf: "center",
  },
  signatureImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    backgroundColor: ThemeColors.surface,
  },
  infoContainer: {
    marginTop: 12,
  },
  prompt: {
    fontSize: 16,
    fontWeight: "500",
    color: ThemeColors.primaryText,
  },
  date: {
    fontSize: 14,
    color: ThemeColors.secondaryText,
    marginTop: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
  },
  actionButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginLeft: 8,
    backgroundColor: ThemeColors.surface,
  },
  deleteButton: {
    backgroundColor: ThemeColors.surface,
  },
});
