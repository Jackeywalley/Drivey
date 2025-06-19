"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = Modal;
exports.ModalFooter = ModalFooter;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_dom_1 = require("react-dom");
function Modal({ isOpen, onClose, children, title, className = '', }) {
    const overlayRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);
    const handleOverlayClick = (event) => {
        if (event.target === overlayRef.current) {
            onClose();
        }
    };
    if (!isOpen)
        return null;
    return (0, react_dom_1.createPortal)((0, jsx_runtime_1.jsx)("div", { ref: overlayRef, className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50", onClick: handleOverlayClick, children: (0, jsx_runtime_1.jsxs)("div", { className: `bg-white rounded-lg shadow-xl max-w-md w-full mx-4 ${className}`, onClick: (e) => e.stopPropagation(), children: [title && ((0, jsx_runtime_1.jsx)("div", { className: "px-6 py-4 border-b border-gray-200", children: (0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold text-gray-900", children: title }) })), (0, jsx_runtime_1.jsx)("div", { className: "px-6 py-4", children: children })] }) }), document.body);
}
function ModalFooter({ children, className = '' }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: `px-6 py-4 border-t border-gray-200 ${className}`, children: children }));
}
