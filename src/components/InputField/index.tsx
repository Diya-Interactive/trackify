import React from "react";
import type { InputFieldProps } from "../../types/inputField";

const InputField: React.FC<InputFieldProps> = ({
    name,
    label,
    value,
    onChange,
    inputRef,
    placeholder,
    type = "text",
    className = "",
    required = false,
    error = false,
    errorMessage,
    ...rest
}) => {
    return (
        <div className="flex flex-col w-full">
            <label
                htmlFor={name}
                className="mb-1 text-sm font-medium text-[#232323] dark:text-gray-200"
            >
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
                ref={inputRef}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value, name)}
                className={`px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-black dark:text-white w-full focus:outline-none ${error
                        ? "border-red-500 dark:border-red-400 focus:border-red-500"
                        : "border-gray-300 dark:border-gray-600 focus:border-gray-400 dark:focus:border-gray-200"
                    } ${className}`}
                {...rest}
            />
            {error && <p className="text-sm text-red-500 mt-1">{errorMessage}</p>}
        </div>
    );
};

export default InputField;
