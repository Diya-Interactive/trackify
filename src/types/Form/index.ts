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