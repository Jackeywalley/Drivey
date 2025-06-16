"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = Pagination;
const jsx_runtime_1 = require("react/jsx-runtime");
const Button_1 = require("./Button");
function Pagination({ currentPage, totalPages, onPageChange, className = '', }) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const maxVisiblePages = 5;
    let visiblePages = pages;
    if (totalPages > maxVisiblePages) {
        const start = Math.max(Math.min(currentPage - Math.floor(maxVisiblePages / 2), totalPages - maxVisiblePages + 1), 1);
        visiblePages = pages.slice(start - 1, start - 1 + maxVisiblePages);
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: `flex items-center justify-center space-x-2 ${className}`, children: [(0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "outline", size: "sm", onClick: () => onPageChange(currentPage - 1), disabled: currentPage === 1, children: "Previous" }), visiblePages[0] > 1 && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "ghost", size: "sm", onClick: () => onPageChange(1), children: "1" }), visiblePages[0] > 2 && ((0, jsx_runtime_1.jsx)("span", { className: "px-2 text-gray-500", children: "..." }))] })), visiblePages.map((page) => ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: page === currentPage ? 'default' : 'ghost', size: "sm", onClick: () => onPageChange(page), children: page }, page))), visiblePages[visiblePages.length - 1] < totalPages && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [visiblePages[visiblePages.length - 1] < totalPages - 1 && ((0, jsx_runtime_1.jsx)("span", { className: "px-2 text-gray-500", children: "..." })), (0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "ghost", size: "sm", onClick: () => onPageChange(totalPages), children: totalPages })] })), (0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "outline", size: "sm", onClick: () => onPageChange(currentPage + 1), disabled: currentPage === totalPages, children: "Next" })] }));
}
