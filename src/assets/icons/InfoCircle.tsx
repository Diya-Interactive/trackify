import React from "react";
import type { IconProps } from "../../types/Icon";

const InfoCircle: React.FC<IconProps> = ({
    size = 20,
    color,
    className,
    ...props
}) => {
    return (
        <svg
            stroke={color ?? "currentColor"}
            fill={color ?? "currentColor"}
            strokeWidth="0"
            viewBox="0 0 512 512"
            height={size}
            width={size}
            xmlns="http://www.w3.org/2000/svg"
            className={`text-gray-800 dark:text-gray-200 ${className}`}
            {...props}
        >
            <path d="M256 56C145.72 56 56 145.72 56 256s89.72 200 200 200 200-89.72 200-200S366.28 56 256 56zm0 82a26 26 0 1 1-26 26 26 26 0 0 1 26-26zm48 226h-88a16 16 0 0 1 0-32h28v-88h-16a16 16 0 0 1 0-32h32a16 16 0 0 1 16 16v104h28a16 16 0 0 1 0 32z"></path>
        </svg>
    );
};

export default InfoCircle;
