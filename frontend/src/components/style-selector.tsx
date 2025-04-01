import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SignatureStyle, SignatureStyleDescriptions } from '../types';

interface StyleOption {
  id: SignatureStyle;
  name: string;
  image: any;
}

const styleOptions: StyleOption[] = [
  { id: SignatureStyle.CLASSIC, name: 'Classic', image: require('../../assets/styles/classic.png') },
  { id: SignatureStyle.ELEGANT, name: 'Elegant', image: require('../../assets/styles/elegant.png') },
  { id: SignatureStyle.BOLD, name: 'Bold', image: require('../../assets/styles/bold.png') },
  { id: SignatureStyle.MINIMALIST, name: 'Minimalist', image: require('../../assets/styles/minimalist.png') },
  { id: SignatureStyle.ARTISTIC, name: 'Artistic', image: require('../../assets/styles/artistic.png') },
  { id: SignatureStyle.CASUAL, name: 'Casual', image: require('../../assets/styles/casual.png') },
  { id: SignatureStyle.PROFESSIONAL, name: 'Professional', image: require('../../assets/styles/professional.png') },
  { id: SignatureStyle.CALLIGRAPHY, name: 'Calligraphy', image: require('../../assets/styles/calligraphy.png') },
  { id: SignatureStyle.MODERN, name: 'Modern', image: require('../../assets/styles/modern.png') },
  { id: SignatureStyle.SCRIPT, name: 'Script', image: require('../../assets/styles/script.png') },
  { id: SignatureStyle.CORPORATE, name: 'Corporate', image: require('../../assets/styles/corporate.png') },
  { id: SignatureStyle.HANDWRITTEN, name: 'Handwritten', image: require('../../assets/styles/handwritten.png') },
  { id: SignatureStyle.VINTAGE, name: 'Vintage', image: require('../../assets/styles/vintage.png') },
  { id: SignatureStyle.FORMAL, name: 'Formal', image: require('../../assets/styles/formal.png') },
  { id: SignatureStyle.CREATIVE, name: 'Creative', image: require('../../assets/styles/creative.png') },
  { id: SignatureStyle.STYLIZED, name: 'Stylized', image: require('../../assets/styles/stylized.png') },
  { id: SignatureStyle.DECORATIVE, name: 'Decorative', image: require('../../assets/styles/decorative.png') },
  { id: SignatureStyle.FLOURISH, name: 'Flourish', image: require('../../assets/styles/flourish.png') },
  { id: SignatureStyle.MONOLINE, name: 'Monoline', image: require('../../assets/styles/monoline.png') },
  { id: SignatureStyle.BRUSH, name: 'Brush', image: require('../../assets/styles/brush.png') },
  { id: SignatureStyle.GOTHIC, name: 'Gothic', image: require('../../assets/styles/gothic.png') },
];

interface StyleSelectorProps {
  selectedStyle: SignatureStyle | null;
  onSelectStyle: (style: SignatureStyle) => void;
}

export function StyleSelector({ selectedStyle, onSelectStyle }: StyleSelectorProps) {
  const renderStyleOption = ({ item }: { item: StyleOption }) => {
    const isSelected = selectedStyle === item.id;
    
    return (
      <TouchableOpacity
        style={[styles.styleOption, isSelected && styles.selectedStyle]}
        onPress={() => onSelectStyle(item.id)}
        activeOpacity={0.7}
      >
        <Image source={item.image} style={styles.styleImage} />
        <Text style={[styles.styleName, isSelected && styles.selectedText]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const getStyleDescription = () => {
    if (!selectedStyle) return '';
    return SignatureStyleDescriptions[selectedStyle];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Style</Text>
      
      <FlatList
        data={styleOptions}
        renderItem={renderStyleOption}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.styleList}
      />
      
      {selectedStyle && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{getStyleDescription()}</Text>
        </View>
      )}
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 16,
    color: '#333',
  },
  styleList: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  styleOption: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 80,
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
  },
  selectedStyle: {
    backgroundColor: '#e0e7ff',
    borderWidth: 2,
    borderColor: '#4a6ee0',
  },
  styleImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginBottom: 8,
  },
  styleName: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    color: '#555',
  },
  selectedText: {
    color: '#4a6ee0',
    fontWeight: '600',
  },
  descriptionContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginHorizontal: 16,
  },
  descriptionText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
}); 