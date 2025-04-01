import AsyncStorage from '@react-native-async-storage/async-storage';
import { Signature } from '../types';

const SIGNATURES_STORAGE_KEY = '@signatures';

export async function saveSignatureToStorage(signature: Signature): Promise<void> {
  try {
    const existingSignaturesString = await AsyncStorage.getItem(SIGNATURES_STORAGE_KEY);
    const existingSignatures: Signature[] = existingSignaturesString ? JSON.parse(existingSignaturesString) : [];
    
    const updatedSignatures = [signature, ...existingSignatures];
    await AsyncStorage.setItem(SIGNATURES_STORAGE_KEY, JSON.stringify(updatedSignatures));
  } catch (error) {
    console.error('Error saving signature to storage:', error);
    throw error;
  }
}

export async function getSignaturesFromStorage(): Promise<Signature[]> {
  try {
    const signaturesString = await AsyncStorage.getItem(SIGNATURES_STORAGE_KEY);
    return signaturesString ? JSON.parse(signaturesString) : [];
  } catch (error) {
    console.error('Error getting signatures from storage:', error);
    return [];
  }
}

export async function clearSignaturesFromStorage(): Promise<void> {
  try {
    await AsyncStorage.removeItem(SIGNATURES_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing signatures from storage:', error);
    throw error;
  }
}

export async function removeSignatureFromStorage(signatureId: string): Promise<void> {
  try {
    const signaturesString = await AsyncStorage.getItem(SIGNATURES_STORAGE_KEY);
    if (!signaturesString) return;
    
    const signatures: Signature[] = JSON.parse(signaturesString);
    const updatedSignatures = signatures.filter(sig => sig.id !== signatureId);
    
    await AsyncStorage.setItem(SIGNATURES_STORAGE_KEY, JSON.stringify(updatedSignatures));
  } catch (error) {
    console.error('Error removing signature from storage:', error);
    throw error;
  }
} 