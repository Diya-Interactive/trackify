import React, { useRef, useState } from "react";
import useLoader from "../../hooks/useLoader";
import { useTranslation } from "react-i18next";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";
import {
  getErrorMessage,
  validateRegisterFormData,
} from "../../utils/globalFunctions";
import InputField from "../../components/InputField";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useDispatch } from "react-redux";
import { setFormData } from "../../features/authSlice";
import { useToast } from "../../hooks/useToast";
import type {
  RegisterFormErrors,
  RegisterFormMessages,
} from "../../types/Form";

const Register: React.FC = () => {
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [errorMessages, setErrorMessages] = useState<RegisterFormMessages>({});

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputEmailRef = useRef<HTMLInputElement>(null);

  const { showToast } = useToast();
  const { showLoader, hideLoader } = useLoader();
  const {
    formData: { name, email },
  } = useAppSelector((state) => state.auth);

  const handleChange = (value: string, name: string) => {
    dispatch(setFormData({ key: name, value }));
  };

  const validateForm = () => {
    const { isValid, errors, messages, firstInvalidField } =
      validateRegisterFormData({
        name,
        email,
      });

    setErrors(errors);
    setErrorMessages(messages);

    if (!isValid) {
      switch (firstInvalidField) {
        case "name":
          inputNameRef.current?.focus();
          break;
        case "email":
          inputEmailRef.current?.focus();
          break;
      }
      return false;
    }

    return true;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      showLoader();
      if (!validateForm()) return;

      // const response = await register({ 
      //   name,
      //   email,
      // });

      // if (response?.status === 200 && response?.data?.success) {
      //   showToast(t("registration_successful"), "success");
      //   navigate("/login");
      // }
    } catch (error: unknown) {
      showToast(getErrorMessage(error), "error");
    } finally {
      hideLoader();
    }
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
          <div>
            <InputField
              required
              name="name"
              type="text"
              error={errors?.name}
              value={name}
              inputRef={inputNameRef}
              label={t("name")}
              placeholder={t("enter_name")}
              errorMessage={errorMessages?.name}
              onChange={(value) => handleChange(value, "name")}
            />
          </div>
          <div>
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
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
            >
              {t("register")}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
