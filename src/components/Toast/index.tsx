import React, { useEffect, useRef, useState } from "react";
import type { ToastProps } from "../../types/toast";
import {
    CheckCircle,
    Close,
    CloseCircle,
    InfoCircle,
} from "../../assets/icons";

const iconMap = {
    success: <CheckCircle size={32} className="text-rose-100 text-2xl mr-2" />,
    error: <CloseCircle size={32} className="text-rose-100 text-2xl mr-2" />,
    info: <InfoCircle size={32} className="text-rose-100 text-2xl mr-2" />,
};

const bgColor = {
    success: "bg-emerald-600",
    error: "bg-rose-600",
    info: "bg-sky-600",
};

const Toast: React.FC<
    ToastProps & { onClose: () => void }
> = ({ message, type = "info", duration = 3000, onClose }) => {
    const [paused, setPaused] = useState(false);
    const [fade, setFade] = useState("opacity-0 translate-y-2");

    const elapsedRef = useRef(0);
    const startTimeRef = useRef<number | null>(null);
    const frameRef = useRef<number | null>(null);

    const close = () => {
        setFade("opacity-0 translate-y-2");
        setTimeout(() => onClose(), 300);
    };

    const animate = (timestamp: number) => {
        if (startTimeRef.current === null) {
            startTimeRef.current = timestamp;
        }

        if (!paused) {
            const elapsed = timestamp - startTimeRef.current + elapsedRef.current;
            if (elapsed >= duration) {
                close();
                return;
            }
        }

        frameRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        setTimeout(() => setFade("opacity-100 translate-y-0"), 50);
        frameRef.current = requestAnimationFrame(animate);
        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
    }, []);

    const handleMouseEnter = () => {
        setPaused(true);
        if (startTimeRef.current) {
            const now = performance.now();
            elapsedRef.current += now - startTimeRef.current;
        }
        startTimeRef.current = null;
    };

    const handleMouseLeave = () => {
        setPaused(false);
        startTimeRef.current = performance.now();
    };

    const handleClick = () => {
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
        close();
    };

    return (
        <div
            role="alert"
            aria-live="assertive"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            className={`flex flex-col items-start justify-between cursor-pointer
                w-full text-white px-4 py-3 rounded-lg shadow-lg
                transition-all duration-300 ease-in-out transform ${fade}
                ${bgColor[type]}`}
        >
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                    {iconMap[type]}
                    <span className="text-sm font-medium">{message}</span>
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleClick();
                    }}
                    className="ml-4 text-white hover:text-gray-200 transition"
                    aria-label="Close notification"
                >
                    <Close size={24} className="text-rose-100 text-2xl mr-2" />
                </button>
            </div>
        </div>
    );
};

export default Toast;
