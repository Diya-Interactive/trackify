import type { JSX } from "react";

export interface MenuItem {
    label: string;
    icon?: JSX.Element;
    path: string;
}