import React from 'react';
import { ViewStyle, TouchableOpacityProps } from 'react-native';
interface CardProps extends TouchableOpacityProps {
    children: React.ReactNode;
    variant?: 'default' | 'elevated';
    style?: ViewStyle;
}
export declare function Card({ children, variant, style, ...props }: CardProps): import("react/jsx-runtime").JSX.Element;
export {};
