import React, { useState } from "react";
import useLoader from "../../hooks/useLoader";
import { useTranslation } from "react-i18next";
// import { useToast } from "../../hooks/useToast";
// import InputField from "../../components/InputField";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";
// import { useAppSelector } from "../../hooks/useAppSelector";
// import { login } from "../../services/api/auth";
// import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../utils/globalFunctions";
import InputField from "../../components/InputField";
import type { LoginFormErrors } from "../../types/Form";

const Register: React.FC = () => {
  const [errors, setErrors] = useState<LoginFormErrors>({});

  //   const navigate = useNavigate();
  const { t } = useTranslation();
//   const { showToast } = useToast();
//   const { showLoader, hideLoader } = useLoader();
//   const { formData } = useAppSelector((state) => state.login);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     try {
  //       showLoader();
  //       const response = await login({ email: formData?.email });
  //       if (response?.status === 200 && response?.data?.success) {
  //         showToast(
  //           t("a_one_time_password_otp_has_been_sent_to_your_registered_email"),
  //           "success"
  //         );
  //       }
  //     } catch (error: unknown) {
  //     //   setErrorFlag(true);
  //     //   inputEmailRef?.current?.focus();
  //       showToast(getErrorMessage(error), "error");
  //     } finally {
  //       hideLoader();
  //     }
    };

  return (
    <>
    <div className="mt-20 sm:mt-32 bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 sm:p-8 w-full max-w-md space-y-6">
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
        <h2 className="mt-4 text-2xl font-semibold text-center text-gray-800 dark:text-gray-200">
          {t("register_to_account")}
        </h2>
      </div>
      <form onSubmit={onSubmit} className="space-y-5">
        {/* <div>
          <InputField
            required
            name="email"
            type="email"
            error={errors?.email}
            value={email}
            inputRef={inputEmailRef}
            label={t("email_address")}
            placeholder={t("enter_email")}
            errorMessage={errorMessages?.email}
            onChange={(value) => handleChange(value, "email")}
          />
        </div>
        <div>
          <InputField
            required
            name="password"
            type="password"
            error={errors?.password}
            value={password}
            inputRef={inputPasswordRef}
            label={t("password")}
            placeholder={t("enter_password")}
            errorMessage={errorMessages?.password}
            onChange={(value) => handleChange(value, "password")}
          />
        </div> */}
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
          >
            {t("submit")}
          </button>
        </div>
      </form>
      {/* <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <InputField
            required
            name="email"
            type="email"
            // error={errorFlag}
            value={formData.email}
            // inputRef={inputEmailRef}
            label={t("email_address")}
            placeholder={t("enter_email")}
            onChange={(value) => handleChange(value, "email")}
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
          >
            {t("send_otp")}
          </button>
        </div>
      </form> */}
      </div>
    </>
  );
};

export default Register;
