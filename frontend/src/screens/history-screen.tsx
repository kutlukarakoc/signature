import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSignatureContext } from '../contexts/SignatureContext';
import { SignatureCard } from '../components/signature-card';
import { clearSignaturesFromStorage } from '../utils/storage';
import { Signature } from '../types';
import { ThemeColors } from '../utils/config';
import { Feather } from '@expo/vector-icons';

export function HistoryScreen() {
  const { state, dispatch } = useSignatureContext();

  const handleClearHistory = async () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all signature history? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await clearSignaturesFromStorage();
              dispatch({ type: 'SET_SIGNATURES', payload: [] });
            } catch (error) {
              console.error('Error clearing history:', error);
              Alert.alert('Error', 'Failed to clear history');
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Signature }) => (
    <SignatureCard signature={item} />
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Feather name="file" size={70} color={ThemeColors.disabledText} />
      <Text style={styles.emptyText}>No signatures yet</Text>
      <Text style={styles.emptySubtext}>
        Go to the Home tab to create your first signature
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Signatures</Text>
        {state.signatures.length > 0 && (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={handleClearHistory}
          >
            <Feather name="trash-2" size={22} color={ThemeColors.error} />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={state.signatures}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: ThemeColors.border,
    backgroundColor: ThemeColors.surface,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: ThemeColors.primaryText,
  },
  clearButton: {
    padding: 8,
  },
  listContainer: {
    padding: 20,
    paddingBottom: 40,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: ThemeColors.secondaryText,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: ThemeColors.disabledText,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});