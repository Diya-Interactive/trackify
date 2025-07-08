import { useDispatch } from "react-redux";
import useLoader from "../../hooks/useLoader";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import React, { useRef, useState } from "react";
import { useToast } from "../../hooks/useToast";
import InputField from "../../components/InputField";
import { setFormData } from "../../features/authSlice";
import { forgotPassword } from "../../services/api/auth";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getErrorMessage } from "../../utils/globalFunctions";

const ForgottenPassword: React.FC = () => {
    const { t } = useTranslation();
    const [errorFlag, setErrorFlag] = useState<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { showToast } = useToast();
    const { showLoader, hideLoader } = useLoader();
    const inputEmailRef = useRef<HTMLInputElement>(null);
    const { formData } = useAppSelector((state) => state.login);

    const handleChange = (value: string, name: string) => {
        dispatch(setFormData({ key: name, value }));
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            showLoader();
            setErrorFlag(false);
            const response = await forgotPassword({ email: formData?.email });
            if (response?.status === 200 && response?.data?.success) {
                navigate("/reset-password");
                showToast(
                    t("a_one_time_password_otp_has_been_sent_to_your_registered_email"),
                    "success"
                );
            }
        } catch (error: unknown) {
            setErrorFlag(true);
            inputEmailRef?.current?.focus();
            navigate("/reset-password");
            showToast(getErrorMessage(error), "error");
        } finally {
            hideLoader();
        }
    };

    return (
        <>
            <div className="flex flex-col">
                <img
                    src={logoDark}
                    alt="Logo for light theme"
                    className="block dark:hidden object-contain w-auto h-20"
                />
                {/* Show on dark theme */}
                <img
                    src={logoLight}
                    alt="Logo for dark theme"
                    className="hidden dark:block object-contain w-auto h-20"
                />
                <h2 className="my-4 text-2xl font-semibold text-center text-gray-800 dark:text-gray-200">
                    {t("find_your_account")}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t("enter_your_email_to_search_for_your_account")}
                </p>
                <form onSubmit={onSubmit} className="space-y-5 mt-2">
                    <InputField
                        required
                        name="email"
                        type="email"
                        error={errorFlag}
                        value={formData.email}
                        inputRef={inputEmailRef}
                        label={t("email_address")}
                        placeholder={t("enter_email")}
                        onChange={(value) => handleChange(value, "email")}
                    />
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            className="w-full sm:w-auto py-2 px-4 bg-gray-300 dark:bg-gray-700  hover:bg-gray-400 dark:hover:bg-gray-600 text-black dark:text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400  transition disabled:opacity-50"
                        >
                            {t("cancel")}
                        </button>
                        <button
                            type="submit"
                            className="w-full sm:w-auto py-2 px-4 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition disabled:opacity-50"
                        >
                            {t("search")}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ForgottenPassword;
