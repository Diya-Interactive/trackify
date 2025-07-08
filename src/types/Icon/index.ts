export interface IconPropsBase {
    size?: number;
    color?: string;
    onClick?: () => void;
}

export interface IconProps extends IconPropsBase {
    [key: string]: string | number | undefined | (() => void);
}
