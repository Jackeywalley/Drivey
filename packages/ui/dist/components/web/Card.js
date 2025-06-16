"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = Card;
exports.CardHeader = CardHeader;
exports.CardTitle = CardTitle;
exports.CardDescription = CardDescription;
exports.CardContent = CardContent;
exports.CardFooter = CardFooter;
const jsx_runtime_1 = require("react/jsx-runtime");
function Card({ children, className = '', onClick }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: `bg-white rounded-lg shadow-sm p-6 ${className}`, onClick: onClick, children: children }));
}
function CardHeader({ children, className = '' }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: `mb-4 ${className}`, children: children }));
}
function CardTitle({ children, className = '' }) {
    return ((0, jsx_runtime_1.jsx)("h3", { className: `text-lg font-semibold text-gray-900 ${className}`, children: children }));
}
function CardDescription({ children, className = '' }) {
    return ((0, jsx_runtime_1.jsx)("p", { className: `text-sm text-gray-500 ${className}`, children: children }));
}
function CardContent({ children, className = '' }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: className, children: children }));
}
function CardFooter({ children, className = '' }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: `mt-4 pt-4 border-t border-gray-200 ${className}`, children: children }));
}
