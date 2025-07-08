import React from "react";
import type { IconProps } from "../../types/Icon";

const Close: React.FC<IconProps> = ({
    size = 16,
    color,
    className,
    ...props
}) => {
    return (
        <svg
            className={`text-gray-800 dark:text-gray-200 ${className}`}
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            fill="none"
            {...props}
        >
            <path
                d="M15 5L5 15M5 5L15 15"
                stroke={color ?? "currentColor"}
                strokeWidth="1.67"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default Close;
