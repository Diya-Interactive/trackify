export type ToastType = "success" | "error" | "info";

export interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

export interface ToastProps {
    message: string;
    type?: "success" | "error" | "info";
    duration?: number;
}

export interface ToastItem {
    id: number;
    message: string;
    type: ToastType;
    duration: number;
}