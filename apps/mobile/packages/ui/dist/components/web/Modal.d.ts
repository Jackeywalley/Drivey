import React from 'react';
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    className?: string;
}
export declare function Modal({ isOpen, onClose, children, title, className, }: ModalProps): React.ReactPortal | null;
interface ModalFooterProps {
    children: React.ReactNode;
    className?: string;
}
export declare function ModalFooter({ children, className }: ModalFooterProps): import("react/jsx-runtime").JSX.Element;
export {};
