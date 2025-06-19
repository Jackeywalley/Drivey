export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
export interface ButtonProps {
    title: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
}
export declare function Button({ title, variant, size, loading, disabled, className, onClick, }: ButtonProps): JSX.Element;
