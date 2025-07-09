import React from "react";
import type { IconProps } from "../../types/Icon";

const FaArrow: React.FC<IconProps> = ({
    size = 16,
    color,
    className = "",
    ...props
}) => {
    return (
        <svg
            className={`text-gray-800 dark:text-gray-200 ${className}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            style={{ width: size, height: size }}
            {...props}
        >
            <g clipPath="url(#clip0)">
                <path
                    d="M5 12H19"
                    stroke={color ?? "currentColor"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M5 12L11 18"
                    stroke={color ?? "currentColor"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M5 12L11 6"
                    stroke={color ?? "currentColor"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
            <defs>
                <clipPath id="clip0">
                    <rect width="24" height="24" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default FaArrow;
