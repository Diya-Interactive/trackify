import { auth, provider } from "../config/firebase";
import {
    PhoneAuthProvider,
    PhoneMultiFactorGenerator,
    RecaptchaVerifier,
    signInWithPopup,
    type MultiFactorResolver,
} from "firebase/auth";
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

export const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    return result.user;
};

export async function getGoogleErrorMessage(error: unknown): Promise<string> {
    if (!error || typeof error !== "object") {
        return "An unknown error occurred";
    }

    const errorWithCode = error as {
        code?: string;
        resolver?: MultiFactorResolver;
    };

    if (errorWithCode.code === "auth/multi-factor-auth-required") {
        try {
            const resolver = errorWithCode.resolver as MultiFactorResolver;
            if (!resolver || !resolver.hints?.length) {
                throw new Error("Invalid MFA resolver");
            }

            const hint = resolver.hints[0];
            const phoneInfoOptions = {
                multiFactorHint: hint,
                session: resolver.session,
            };

            const phoneAuthProvider = new PhoneAuthProvider(auth);
            const verificationId = await phoneAuthProvider.verifyPhoneNumber(
                phoneInfoOptions,
                (
                    window as Window &
                    typeof globalThis & { recaptchaVerifier: RecaptchaVerifier }
                ).recaptchaVerifier
            );

            const verificationCode = window.prompt(
                "Enter the verification code sent to your phone:"
            );
            if (!verificationCode) {
                return "Verification cancelled";
            }

            const cred = PhoneAuthProvider.credential(
                verificationId,
                verificationCode
            );
            const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);
            const userCredential = await resolver.resolveSignIn(multiFactorAssertion);

            return `Successfully signed in as ${userCredential.user.email}`;
        } catch (mfaError) {
            console.error("MFA Error:", mfaError);
            return "Failed to complete multi-factor authentication";
        }
    }

    return "Failed to sign in with Google";
}

export const validateFormData = (
    formData: LoginFormData
): {
    isValid: boolean;
    errors: LoginFormErrors;
    messages: LoginFormMessages;
    firstInvalidField?: keyof LoginFormErrors;
} => {
    const { email, password } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isEmailValid = emailRegex.test(email || "");
    const isPasswordValid = Boolean(password?.length);

    const errors: LoginFormErrors = {
        email: !isEmailValid,
        password: !isPasswordValid,
    };

    const messages: LoginFormMessages = {};
    let firstInvalidField: keyof LoginFormErrors | undefined;

    if (!isEmailValid) {
        messages.email = "Please enter a valid email address";
        firstInvalidField = "email";
    }

    if (!isPasswordValid) {
        messages.password = "Please enter a password";
        if (!firstInvalidField) firstInvalidField = "password";
    }

    return {
        isValid: isEmailValid && isPasswordValid,
        errors,
        messages,
        firstInvalidField,
    };
};
