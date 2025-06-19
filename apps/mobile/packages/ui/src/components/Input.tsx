import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
import { useColorScheme } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: ViewStyle;
  errorStyle?: TextStyle;
}

export function Input({
  label,
  error,
  containerStyle,
  labelStyle,
  inputStyle,
  errorStyle,
  ...props
}: InputProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text
          style={[
            styles.label,
            { color: isDark ? '#F5F5F5' : '#111827' },
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDark ? '#1A1A2E' : '#F9FAFB',
            color: isDark ? '#F5F5F5' : '#111827',
            borderColor: error
              ? '#FF3B30'
              : isDark
              ? '#1A1A2E'
              : '#E5E7EB',
          },
          inputStyle,
        ]}
        placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
        {...props}
      />
      {error && (
        <Text
          style={[
            styles.error,
            { color: '#FF3B30' },
            errorStyle,
          ]}
        >
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
  },
  error: {
    fontSize: 12,
    marginTop: 4,
  },
}); 