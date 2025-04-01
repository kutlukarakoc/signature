import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AppState, AppAction } from '../types';
import { getSignaturesFromStorage } from '../utils/storage';
import { ENDPOINTS } from '../utils/config';

const initialState: AppState = {
  signatures: [],
  isLoading: false,
  error: null,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_SIGNATURE':
      return {
        ...state,
        signatures: [action.payload, ...state.signatures],
      };
    case 'SET_SIGNATURES':
      return {
        ...state,
        signatures: action.payload,
      };
    case 'REMOVE_SIGNATURE':
      return {
        ...state,
        signatures: state.signatures.filter(sig => sig.id !== action.payload),
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

interface SignatureContextProps {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  generateSignature: (prompt: string) => Promise<string | null>;
}

const SignatureContext = createContext<SignatureContextProps | undefined>(undefined);

export function SignatureProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const loadSignatures = async () => {
      const savedSignatures = await getSignaturesFromStorage();
      dispatch({ type: 'SET_SIGNATURES', payload: savedSignatures });
    };

    loadSignatures();
  }, []);

  const generateSignature = async (prompt: string): Promise<string | null> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      const response = await fetch(ENDPOINTS.GENERATE_SIGNATURE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate signature');
      }

      const data = await response.json();
      
      // Poll for the result
      const maxAttempts = 30;
      let attempts = 0;
      let signatureUrl: string | null = null;
      
      while (attempts < maxAttempts) {
        attempts++;
        const statusResponse = await fetch(ENDPOINTS.CHECK_STATUS(data.id));
        const statusData = await statusResponse.json();
        
        if (statusData.status === 'succeeded' && statusData.output && statusData.output.length > 0) {
          signatureUrl = statusData.output[0];
          break;
        }
        
        if (statusData.status === 'failed') {
          throw new Error('Signature generation failed');
        }
        
        // Wait 2 seconds before polling again
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      if (!signatureUrl) {
        throw new Error('Timeout waiting for signature generation');
      }
      
      return signatureUrl;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return null;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <SignatureContext.Provider value={{ state, dispatch, generateSignature }}>
      {children}
    </SignatureContext.Provider>
  );
}

export function useSignatureContext() {
  const context = useContext(SignatureContext);
  if (context === undefined) {
    throw new Error('useSignatureContext must be used within a SignatureProvider');
  }
  return context;
} 