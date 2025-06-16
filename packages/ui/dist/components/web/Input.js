"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = Input;
const jsx_runtime_1 = require("react/jsx-runtime");
function Input({ label, error, className = '', ...props }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full", children: [label && ((0, jsx_runtime_1.jsx)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: label })), (0, jsx_runtime_1.jsx)("input", { className: `
          w-full rounded-md border-gray-300 shadow-sm
          focus:border-blue-500 focus:ring-blue-500
          disabled:bg-gray-100 disabled:text-gray-500
          ${error ? 'border-red-500' : ''}
          ${className}
        `, ...props }), error && ((0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-sm text-red-600", children: error }))] }));
}
