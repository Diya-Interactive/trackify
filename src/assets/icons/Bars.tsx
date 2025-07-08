import React from "react";
import type { IconProps } from "../../types/Icon";

const Bars: React.FC<IconProps> = ({
    size = 22,
    color,
    className = "",
    ...props
}) => {
    return (
        <svg
            className={`text-gray-800 dark:text-gray-200 ${className}`}
            stroke={color ?? "currentColor"}
            fill={color ?? "currentColor"}
            strokeWidth="0"
            viewBox="0 0 448 512"
            width={size}
            height={size}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
        </svg>
    );
};

export default Bars;
