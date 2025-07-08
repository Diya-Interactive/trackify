export interface InputFieldProps {
    name: string;
    label: string;
    type?: string;
    error?: boolean;
    className?: string;
    required?: boolean;
    placeholder?: string;
    errorMessage?: string;
    value: string | number;
    inputRef?: React.Ref<HTMLInputElement>;
    onChange: (value: string, name?: string ) => void;
}