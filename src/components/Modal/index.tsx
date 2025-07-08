import { Close } from "../../assets/icons";
import React, { useEffect, type ReactNode } from "react";

interface ModalProps {
    title: string;
    width?: string;
    visible: boolean;
    children: ReactNode;
    onClose: () => void;
    footer?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
    title,
    width = "600px",
    visible,
    children,
    onClose,
    footer,
}) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        if (visible) {
            document.addEventListener("keydown", handleEsc);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "";
        };
    }, [onClose, visible]);

    const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
        if ((event.target as HTMLElement).classList.contains("modal-overlay")) {
            onClose();
        }
    };

    if (!visible) return null;

    return (
        <div
            className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/70  px-4"
            onClick={handleClickOutside}
        >
            <div
                className="bg-white dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-700 shadow-lg w-[90%] sm:w-[500px] max-w-full relative max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
                style={{ width }}
            >
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4">
                    <label className="text-lg font-semibold text-gray-900 dark:text-white">
                        {title}
                    </label>
                    <Close
                        className="cursor-pointer text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition"
                        onClick={onClose}
                    />
                </div>

                {/* Divider */}
                <hr className="border-t border-gray-300 dark:border-gray-700" />

                {/* Content */}
                <div className="px-6 py-4 text-black dark:text-white">{children}</div>

                {/* Optional Footer */}
                {footer && (
                    <>
                        <hr className="border-t border-gray-300 dark:border-gray-700" />
                        <div className="px-6 py-4">{footer}</div>
                    </>
                )}
            </div>
        </div>
    );
};

export default React.memo(Modal);
