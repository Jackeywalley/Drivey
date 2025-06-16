"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = Button;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const react_native_2 = require("react-native");
function Button({ onPress, title, variant = 'primary', size = 'medium', disabled = false, loading = false, style, textStyle, }) {
    const colorScheme = (0, react_native_2.useColorScheme)();
    const isDark = colorScheme === 'dark';
    const getBackgroundColor = () => {
        if (disabled)
            return isDark ? '#1A1A2E' : '#F9FAFB';
        switch (variant) {
            case 'primary':
                return '#007AFF';
            case 'secondary':
                return isDark ? '#1A1A2E' : '#F9FAFB';
            case 'outline':
                return 'transparent';
            default:
                return '#007AFF';
        }
    };
    const getTextColor = () => {
        if (disabled)
            return isDark ? '#6B7280' : '#9CA3AF';
        switch (variant) {
            case 'primary':
                return '#FFFFFF';
            case 'secondary':
            case 'outline':
                return isDark ? '#F5F5F5' : '#111827';
            default:
                return '#FFFFFF';
        }
    };
    const getHeight = () => {
        switch (size) {
            case 'small':
                return 36;
            case 'large':
                return 56;
            default:
                return 48;
        }
    };
    const getFontSize = () => {
        switch (size) {
            case 'small':
                return 14;
            case 'large':
                return 18;
            default:
                return 16;
        }
    };
    return ((0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, { onPress: onPress, disabled: disabled || loading, style: [
            styles.button,
            {
                backgroundColor: getBackgroundColor(),
                height: getHeight(),
                borderWidth: variant === 'outline' ? 1 : 0,
                borderColor: '#007AFF',
            },
            style,
        ], children: loading ? ((0, jsx_runtime_1.jsx)(react_native_1.ActivityIndicator, { color: getTextColor() })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [
                styles.text,
                {
                    color: getTextColor(),
                    fontSize: getFontSize(),
                },
                textStyle,
            ], children: title })) }));
}
const styles = react_native_1.StyleSheet.create({
    button: {
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    text: {
        fontWeight: '600',
    },
});
