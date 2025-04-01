import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Share,
  Dimensions,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Feather } from '@expo/vector-icons';
import { Signature } from '../types';

interface SignatureModalProps {
  visible: boolean;
  onClose: () => void;
  signature: Signature | null;
}

export function SignatureModal({ visible, signature, onClose }: SignatureModalProps) {
  if (!signature) return null;

  const downloadSignature = async () => {
    try {
      // Request permission
      const { status } = await MediaLibrary.requestPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Unable to save signature without gallery permission.');
        return;
      }

      // Create a file name
      const fileUri = FileSystem.cacheDirectory + `signature-${signature.id}.png`;

      // Download the image
      const { uri } = await FileSystem.downloadAsync(
        signature.imageUrl,
        fileUri
      );

      // Save to media library
      await MediaLibrary.saveToLibraryAsync(uri);
      
      Alert.alert('Success!', 'Signature saved to your gallery');
    } catch (error) {
      console.error('Error saving signature to gallery:', error);
      Alert.alert('Error', 'An error occurred while saving the signature');
    }
  };

  const shareSignature = async () => {
    try {
      // Create a file in cache
      const fileUri = FileSystem.cacheDirectory + `signature-${signature.id}.png`;

      // Download the image
      const { uri } = await FileSystem.downloadAsync(
        signature.imageUrl,
        fileUri
      );

      // Share the image
      await Share.share({
        url: uri,
        message: 'Check out this signature I created with AI!',
        title: 'AI Generated Signature',
      });
    } catch (error) {
      console.error('Error sharing signature:', error);
      Alert.alert('Error', 'An error occurred while sharing the signature');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Feather name="x" size={24} color="#333" />
          </TouchableOpacity>

          <Text style={styles.title}>Your Signature is Ready!</Text>
          
          <Text style={styles.subtitle}>Beautiful, unique, and all yours.</Text>
          
          <View style={styles.signatureContainer}>
            <Image 
              source={{ uri: signature.imageUrl }} 
              style={styles.signatureImage}
              resizeMode="contain"
            />
          </View>
          
          <Text style={styles.prompt}>{signature.prompt}</Text>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.button} onPress={downloadSignature}>
              <Feather name="download" size={18} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={shareSignature}>
              <Feather name="share-2" size={18} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Share</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.createNewButton} onPress={onClose}>
            <Text style={styles.createNewText}>Create Another Signature</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginVertical: 10,
    textAlign: 'center',
  },
  signatureContainer: {
    width: '100%',
    height: 220,
    marginVertical: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
  },
  signatureImage: {
    width: '100%',
    height: '100%',
  },
  prompt: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    marginBottom: 15,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4a6ee0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '45%',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  buttonIcon: {
    marginRight: 8,
  },
  createNewButton: {
    marginTop: 10,
    paddingVertical: 12,
  },
  createNewText: {
    color: '#4a6ee0',
    fontSize: 16,
    fontWeight: '600',
  },
});
