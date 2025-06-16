import React from 'react';
interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}
export declare function Card({ children, className, onClick }: CardProps): import("react/jsx-runtime").JSX.Element;
interface CardHeaderProps {
    children: React.ReactNode;
    className?: string;
}
export declare function CardHeader({ children, className }: CardHeaderProps): import("react/jsx-runtime").JSX.Element;
interface CardTitleProps {
    children: React.ReactNode;
    className?: string;
}
export declare function CardTitle({ children, className }: CardTitleProps): import("react/jsx-runtime").JSX.Element;
interface CardDescriptionProps {
    children: React.ReactNode;
    className?: string;
}
export declare function CardDescription({ children, className }: CardDescriptionProps): import("react/jsx-runtime").JSX.Element;
interface CardContentProps {
    children: React.ReactNode;
    className?: string;
}
export declare function CardContent({ children, className }: CardContentProps): import("react/jsx-runtime").JSX.Element;
interface CardFooterProps {
    children: React.ReactNode;
    className?: string;
}
export declare function CardFooter({ children, className }: CardFooterProps): import("react/jsx-runtime").JSX.Element;
export {};
