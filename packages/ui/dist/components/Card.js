"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = Card;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const react_native_2 = require("react-native");
function Card({ children, variant = 'default', style, ...props }) {
    const colorScheme = (0, react_native_2.useColorScheme)();
    const isDark = colorScheme === 'dark';
    const Container = props.onPress ? react_native_1.TouchableOpacity : react_native_1.View;
    return ((0, jsx_runtime_1.jsx)(Container, { style: [
            styles.container,
            {
                backgroundColor: isDark ? '#1A1A2E' : '#F9FAFB',
                ...(variant === 'elevated' && {
                    shadowColor: isDark ? '#000000' : '#000000',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                }),
            },
            style,
        ], ...props, children: children }));
}
const styles = react_native_1.StyleSheet.create({
    container: {
        borderRadius: 12,
        padding: 16,
    },
});
