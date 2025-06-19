import { ViewStyle, TextStyle, TextInputProps } from 'react-native';
interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    containerStyle?: ViewStyle;
    labelStyle?: TextStyle;
    inputStyle?: ViewStyle;
    errorStyle?: TextStyle;
}
export declare function Input({ label, error, containerStyle, labelStyle, inputStyle, errorStyle, ...props }: InputProps): import("react/jsx-runtime").JSX.Element;
export {};
