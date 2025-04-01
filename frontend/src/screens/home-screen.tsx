import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSignatureContext } from '../contexts/SignatureContext';
import { StyleSelector } from '../components/style-selector';
import { SignatureModal } from '../components/signature-modal';
import { saveSignatureToStorage } from '../utils/storage';
import { Signature, SignatureStyle, SignatureStyleDescriptions } from '../types';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeColors } from '../utils/config';

export function HomeScreen() {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<SignatureStyle | null>(null);
  const { state, dispatch, generateSignature } = useSignatureContext();
  const [currentSignature, setCurrentSignature] = useState<Signature | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectStyle = (style: SignatureStyle) => {
    setSelectedStyle(style);
  };

  const handlePromptChange = (text: string) => {
    setPrompt(text);
  };

  const handleGenerateSignature = async () => {
    if (!prompt.trim()) {
      Alert.alert('Error', 'Please enter a name');
      return;
    }

    try {
      // Create the prompt based on whether a style is selected
      let fullPrompt = '';
      
      if (selectedStyle) {
        // If style is selected, append the style description
        const styleDescription = SignatureStyleDescriptions[selectedStyle];
        fullPrompt = `AISIGNATURE ${prompt} ${styleDescription}`;
      } else {
        // If no style is selected, just the basic prompt
        fullPrompt = `AISIGNATURE ${prompt}`;
      }
      
      const signatureUrl = await generateSignature(fullPrompt);
      
      if (signatureUrl) {
        const newSignature: Signature = {
          id: Date.now().toString(),
          prompt: prompt,
          imageUrl: signatureUrl,
          createdAt: new Date().toISOString(),
          style: selectedStyle || undefined,
        };
        
        setCurrentSignature(newSignature);
        await saveSignatureToStorage(newSignature);
        
        // Add the new signature to the context state
        dispatch({ type: 'ADD_SIGNATURE', payload: newSignature });
        
        // Show the modal with the generated signature
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Error in handleGenerateSignature:', error);
    }
  };
  
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Signature Generator</Text>
          <Text style={styles.subtitle}>Create beautiful AI-powered signatures</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Your Signature Text</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your signature text"
              placeholderTextColor={ThemeColors.inputPlaceholder}
              value={prompt}
              onChangeText={handlePromptChange}
              multiline
              numberOfLines={1}
              maxLength={30}
            />
            <Text style={styles.characterCounter}>{prompt.length}/30</Text>
          </View>
          
          <StyleSelector 
            selectedStyle={selectedStyle}
            onSelectStyle={handleSelectStyle}
          />
          
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={handleGenerateSignature}
            disabled={state.isLoading}
            style={styles.generateButtonContainer}
          >
            <LinearGradient
              colors={[ThemeColors.primary, ThemeColors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                styles.generateButton,
                state.isLoading && styles.disabledButton
              ]}
            >
              {state.isLoading ? (
                <ActivityIndicator color="#fff" size="large" />
              ) : (
                <Text style={styles.generateButtonText}>Generate Signature</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
          
          {state.error && (
            <Text style={styles.errorText}>{state.error}</Text>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
      
      <SignatureModal 
        visible={modalVisible}
        signature={currentSignature}
        onClose={handleCloseModal}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: ThemeColors.primaryText,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: ThemeColors.secondaryText,
    marginBottom: 32,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: ThemeColors.primaryText,
  },
  input: {
    fontSize: 16,
    backgroundColor: ThemeColors.input,
    color: ThemeColors.inputText,
    borderRadius: 8,
    padding: 12,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  characterCounter: {
    fontSize: 14,
    color: ThemeColors.secondaryText,
    textAlign: 'right',
    marginTop: 4,
    paddingRight: 8,
  },
  generateButtonContainer: {
    marginTop: 30,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 7,
  },
  generateButton: {
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  disabledButton: {
    opacity: 0.6,
  },
  generateButtonText: {
    color: ThemeColors.primaryText,
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  errorText: {
    color: ThemeColors.error,
    marginBottom: 16,
    textAlign: 'center',
  },
  resultContainer: {
    marginTop: 24,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: ThemeColors.primaryText,
  },
}); 