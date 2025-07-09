import type {
    LoginFormData,
    LoginFormErrors,
    LoginFormMessages,
} from "../types/Form";

export function getErrorMessage(error: unknown): string {
    const apiMessage = (error as { response?: { data?: { message?: string } } })
        ?.response?.data?.message;

    if (apiMessage) return apiMessage;

    if (error instanceof Error) {
        return error.message;
    }

    return "Something went wrong";
}

export function getUserInitials(user: { name?: string }): string {
    return user?.name?.trim()?.length
        ? user.name
            .trim()
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .toUpperCase()
        : "";
}

export const validateFormData = (
    formData: LoginFormData
): {
    isValid: boolean;
    errors: LoginFormErrors;
    messages: LoginFormMessages;
    firstInvalidField?: keyof LoginFormErrors;
} => {
    const { email } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isEmailValid = emailRegex.test(email || "");

    const errors: LoginFormErrors = {
        email: !isEmailValid,
    };

    const messages: LoginFormMessages = {};
    let firstInvalidField: keyof LoginFormErrors | undefined;

    if (!isEmailValid) {
        messages.email = "Please enter a valid email address";
        firstInvalidField = "email";
    }

    return {
        isValid: isEmailValid,
        errors,
        messages,
        firstInvalidField,
    };
};
