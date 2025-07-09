export interface LoginFormData {
    email?: string;
    password?: string;
}

export interface LoginFormErrors {
    email?: boolean;
    password?: boolean;
}

export interface LoginFormMessages {
    email?: string;
    password?: string;
}
export interface RegisterFormData {
    email?: string;
    name?: string;
}

export interface RegisterFormErrors {
    email?: boolean;
    name?: boolean;
}

export interface RegisterFormMessages {
    email?: string;
    name?: string;
}