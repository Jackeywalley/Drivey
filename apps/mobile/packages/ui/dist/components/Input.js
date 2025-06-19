"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = Input;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const react_native_2 = require("react-native");
function Input({ label, error, containerStyle, labelStyle, inputStyle, errorStyle, ...props }) {
    const colorScheme = (0, react_native_2.useColorScheme)();
    const isDark = colorScheme === 'dark';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [styles.container, containerStyle], children: [label && ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [
                    styles.label,
                    { color: isDark ? '#F5F5F5' : '#111827' },
                    labelStyle,
                ], children: label })), (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { style: [
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
                ], placeholderTextColor: isDark ? '#6B7280' : '#9CA3AF', ...props }), error && ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [
                    styles.error,
                    { color: '#FF3B30' },
                    errorStyle,
                ], children: error }))] }));
}
const styles = react_native_1.StyleSheet.create({
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
