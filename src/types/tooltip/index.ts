export type TooltipPosition = "top" | "right" | "bottom" | "left";

export interface TooltipProps {
    children: React.ReactNode;
    content: React.ReactNode;
    position?: TooltipPosition;
    className?: string;
    delay?: number;
    arrow?: boolean;
}
