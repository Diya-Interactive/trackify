import Toast from "../../components/Toast";
import { ToastContext } from "../../hooks/useToast";
import React, { useState, type ReactNode } from "react";
import type { ToastItem, ToastType } from "../../types/toast";

let toastId = 0;
const DEFAULT_TOAST_DURATION = 3000;

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const showToast = (message: string, type: ToastType = "info", duration = DEFAULT_TOAST_DURATION) => {
        const id = ++toastId;
        const toast = { id, message, type, duration };
        setToasts(prev => [...prev, toast]);

        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, duration + 300); // add extra for fade-out
    };

    const removeToast = (id: number) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Toast container */}
            <div className="fixed top-5 right-5 space-y-4 z-50 max-w-md w-[90%]">
            {toasts.map(toast => (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        type={toast.type}
                        duration={toast.duration}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
};
