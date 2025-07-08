import React from "react";
import type { IconProps } from "../../types/Icon";
;

const Sun: React.FC<IconProps> = ({
    size = 22,
    color,
    className = "",
    ...props
}) => {
    const iconColor = color ?? "currentColor";

    return (
        <svg
            className={`transition-colors duration-200 ease-in-out text-gray-800 dark:text-gray-200 ${className}`}
            stroke={iconColor}
            fill={iconColor}
            strokeWidth="0"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path d="m6.76 4.84-1.8-1.79-1.41 1.41 1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495 1.408 1.407-1.79 1.79-1.407-1.408zm-1.8 15.115 1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96 1.41 1.41 1.79-1.8-1.41-1.41z" />
        </svg>
    );
};

export default Sun;
