import React from 'react';
export interface InputProps {
    label?: string;
    error?: string;
    className?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
}
export declare function Input({ label, error, className, ...props }: InputProps): React.ReactElement;
