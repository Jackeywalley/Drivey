import React from 'react';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import { z } from 'zod';
interface FormProps<T extends FieldValues> {
    schema: z.ZodType<T>;
    onSubmit: SubmitHandler<T>;
    children: React.ReactNode;
    submitLabel?: string;
    className?: string;
}
export declare function Form<T extends FieldValues>({ schema, onSubmit, children, submitLabel, className, }: FormProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
