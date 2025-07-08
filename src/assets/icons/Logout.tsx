import React from "react";
import type { IconProps } from "../../types/Icon";

const Logout: React.FC<IconProps> = ({
    size = 22,
    color,
    className = "",
    ...props
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            fill={color ?? "currentColor"}
            className={`text-gray-800 dark:text-gray-200 ${className}`}
            {...props}
        >
            <path
                d="M4.16667 17.5C3.70833 17.5 3.31597 17.3368 2.98958 17.0104C2.66319 16.684 2.5 16.2917 2.5 15.8333V4.16667C2.5 3.70833 2.66319 3.31597 2.98958 2.98958C3.31597 2.66319 3.70833 2.5 4.16667 2.5H10V4.16667H4.16667V15.8333H10V17.5H4.16667ZM13.3333 14.1667L12.1875 12.9583L14.3125 10.8333H7.5V9.16667H14.3125L12.1875 7.04167L13.3333 5.83333L17.5 10L13.3333 14.1667Z"
                fill={color ?? "currentColor"}
            />
        </svg>
    );
};

export default Logout;
