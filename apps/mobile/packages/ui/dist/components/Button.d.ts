import { ViewStyle, TextStyle } from 'react-native';
type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'small' | 'medium' | 'large';
interface ButtonProps {
    onPress: () => void;
    title: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    loading?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
}
export declare function Button({ onPress, title, variant, size, disabled, loading, style, textStyle, }: ButtonProps): import("react/jsx-runtime").JSX.Element;
export {};
