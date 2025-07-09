import type { TooltipProps } from "../../types/tooltip";
import React, { useState, useRef, useEffect } from "react";

const Tooltip: React.FC<TooltipProps> = ({
    children,
    content,
    position = "top",
    delay = 0,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const tooltipRef = useRef<HTMLDivElement>(null);
    const childRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const showTooltip = () => {
        if (delay > 0) {
            timeoutRef.current = setTimeout(() => {
                setIsVisible(true);
            }, delay);
        } else {
            setIsVisible(true);
        }
    };

    const hideTooltip = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsVisible(false);
    };

    const calculatePosition = () => {
        if (!childRef.current || !tooltipRef.current) return;

        const childRect = childRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let newPosition = position;
        let top = 0;
        let left = 0;

        if (position === "top" && childRect.top < tooltipRect.height) {
            newPosition = "bottom";
        } else if (
            position === "bottom" &&
            childRect.bottom + tooltipRect.height > viewportHeight
        ) {
            newPosition = "top";
        } else if (position === "left" && childRect.left < tooltipRect.width) {
            newPosition = "right";
        } else if (
            position === "right" &&
            childRect.right + tooltipRect.width > viewportWidth
        ) {
            newPosition = "left";
        }

        // Calculate coordinates based on the determined position
        switch (newPosition) {
            case "top":
                top = childRect.top - tooltipRect.height - 8;
                left = childRect.left + (childRect.width - tooltipRect.width) / 2;
                break;
            case "bottom":
                top = childRect.bottom + 8;
                left = childRect.left + (childRect.width - tooltipRect.width) / 2;
                break;
            case "left":
                top = childRect.top + (childRect.height - tooltipRect.height) / 2;
                left = childRect.left - tooltipRect.width - 8;
                break;
            case "right":
                top = childRect.top + (childRect.height - tooltipRect.height) / 2;
                left = childRect.right + 8;
                break;
        }

        // Ensure tooltip stays within viewport boundaries
        if (left < 0) left = 0;
        if (left + tooltipRect.width > viewportWidth) {
            left = viewportWidth - tooltipRect.width;
        }
        if (top < 0) top = 0;
        if (top + tooltipRect.height > viewportHeight) {
            top = viewportHeight - tooltipRect.height;
        }

        setCoords({ top, left });
    };

    useEffect(() => {
        if (isVisible) {
            calculatePosition();
            window.addEventListener("scroll", calculatePosition);
            window.addEventListener("resize", calculatePosition);
        }

        return () => {
            window.removeEventListener("scroll", calculatePosition);
            window.removeEventListener("resize", calculatePosition);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisible]);

    return (
        <div className="relative inline-block" ref={childRef}>
            <div
                onMouseEnter={showTooltip}
                onMouseLeave={hideTooltip}
                onFocus={showTooltip}
                onBlur={hideTooltip}
            >
                {children}
            </div>

            {isVisible && (
                <div
                    ref={tooltipRef}
                    className={`fixed z-50 px-3 py-2 text-sm text-white bg-[#0080FF] rounded shadow-lg transition-opacity duration-300 font-normal`}
                    style={{
                        top: `${coords.top}px`,
                        left: `${coords.left}px`,
                    }}
                >
                    {content}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
