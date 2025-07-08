import Modal from "../../components/Modal";
import { Google } from "../../assets/icons";
import useLoader from "../../hooks/useLoader";
import { useTranslation } from "react-i18next";
import { useToast } from "../../hooks/useToast";
import InputField from "../../components/InputField";
import { Link, useNavigate } from "react-router-dom";
import logoDark from "../../assets/images/logo-dark.png";
import React, { useEffect, useRef, useState } from "react";
import logoLight from "../../assets/images/logo-light.png";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import type { LoginFormErrors, LoginFormMessages } from "../../types/Form";
import {
  clearFormData,
  loginForm,
  setFormData,
  setOTPCode,
  verifyOtpForm,
} from "../../features/authSlice";
import {
  getErrorMessage,
  getGoogleErrorMessage,
  signInWithGoogle,
  validateFormData,
} from "../../utils/globalFunctions";

const Login: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [delayCounter, setDelayCounter] = useState(0);
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [errorMessages, setErrorMessages] = useState<LoginFormMessages>({});

  const navigate = useNavigate();
  const { t } = useTranslation();
  const { showToast } = useToast();
  const dispatch = useAppDispatch();
  const { showLoader, hideLoader } = useLoader();
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const {
    otp,
    formData: { email, password },
  } = useAppSelector((state) => state.login);

  useEffect(() => {
    if (delayCounter <= 0) {
      setIsResendDisabled(false);
      return;
    }
    const timer = setInterval(() => {
      setDelayCounter((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [delayCounter]);

  useEffect(() => {
    if (visible) {
      dispatch(setOTPCode(new Array(6).fill("")));
      setDelayCounter(30);
      setIsResendDisabled(true);
      setTimeout(() => {
        inputsRef.current[0]?.focus();
      }, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handleChange = (value: string, name: string) => {
    dispatch(setFormData({ key: name, value }));
  };

  const validateForm = () => {
    const { isValid, errors, messages, firstInvalidField } = validateFormData({
      email,
      password,
    });

    setErrors(errors);
    setErrorMessages(messages);

    if (!isValid) {
      if (firstInvalidField === "email") inputEmailRef.current?.focus();
      if (firstInvalidField === "password") inputPasswordRef.current?.focus();
      return false;
    }

    return true;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return false;
    try {
      showLoader();
      const response = await dispatch(loginForm({ email })).unwrap();
      if (response?.success) {
        setVisible(true);
        showToast(response?.message, "success");
      }
    } catch (error: unknown) {
      setErrors((prev) => ({ ...prev, email: true }));
      inputEmailRef?.current?.focus();
      showToast(getErrorMessage(error), "error");
    } finally {
      hideLoader();
    }
  };

  const handleOtpChange = (value: string, idx: number) => {
    if (!/^[a-zA-Z0-9]?$/.test(value)) return;
    const next = [...otp];
    next[idx] = value.toUpperCase();
    dispatch(setOTPCode(next));
    if (value && idx < otp.length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    } else if (e.key === "ArrowLeft" && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    } else if (e.key === "ArrowRight" && idx < otp.length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData("text")
      .replace(/\s+/g, "")
      .slice(0, otp.length);
    if (!/^[a-zA-Z0-9]+$/.test(pasteData)) return;
    const updated = new Array(6).fill("");
    for (let i = 0; i < pasteData.length; i++) {
      updated[i] = pasteData[i].toUpperCase();
    }
    dispatch(setOTPCode(updated));
    setTimeout(() => {
      const nextIndex = Math.min(pasteData.length, otp.length - 1);
      inputsRef.current[nextIndex]?.focus();
    }, 0);
  };

  const handleClose = () => {
    setVisible(false);
    dispatch(setOTPCode(new Array(6).fill("")));
  };

  const handleOtpSubmit = async () => {
    const finalCode = otp.join("");
    if (finalCode.length !== 6 || otp.includes("")) {
      showToast(t("otp_must_be_6_digits"), "error");
      return;
    }
    try {
      showLoader();
      const response = await dispatch(
        verifyOtpForm({
          email: email,
          otp: finalCode,
        })
      ).unwrap();
      if (response?.success) {
        showToast(response?.message, "success");
        dispatch(clearFormData());
        localStorage.setItem("accessToken", response?.data?.access);
        localStorage.setItem("refreshToken", response?.data?.refresh);
        navigate("/app/listing");
      }
    } catch (error: unknown) {
      showToast(getErrorMessage(error), "error");
      inputsRef.current[5]?.focus();
      inputsRef.current.forEach((input) => {
        if (input) {
          input.classList.add(
            "border-red-500",
            "focus:ring-red-500",
            "dark:border-red-500",
            "dark:focus:ring-red-500"
          );
          input.classList.remove(
            "border-gray-300",
            "focus:ring-blue-500",
            "dark:border-gray-600",
            "dark:focus:ring-blue-400"
          );
        }
      });
    } finally {
      hideLoader();
    }
  };

  const handleResendOtp = async () => {
    try {
      showLoader();
      const response = await dispatch(loginForm({ email })).unwrap();
      if (response?.success) {
        setVisible(true);
        showToast(response?.message, "success");
      }
    } catch (error: unknown) {
      showToast(getErrorMessage(error), "error");
    } finally {
      hideLoader();
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      console.log("User signed in:", user);
    } catch (error: unknown) {
      const errorMessage = await getGoogleErrorMessage(error);
      showToast(errorMessage, "error");
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
          {/* Show on dark theme */}
          <img
            src={logoLight}
            alt="Logo for dark theme"
            className="hidden dark:block object-contain w-auto h-20"
          />
          <h2 className="mt-4 text-2xl font-semibold text-center text-gray-800 dark:text-gray-200">
            {t("login_to_account")}
          </h2>
          <p className="mt-1 text-sm text-center text-gray-600 dark:text-gray-400">
            {t("enter_credentials")}
          </p>
        </div>
        <div>
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 px-4 py-2  bg-white text-gray-700 border border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700  transition duration-200"
          >
            <Google size={24} />
            {t("sign_in_with_google")}
          </button>
        </div>
        <div className="flex items-center my-6">
          <hr className="flex-grow border-t border-gray-300 dark:border-gray-600" />
          <span className="mx-4 text-gray-500 dark:text-gray-400 text-sm">
            {t("or")}
          </span>
          <hr className="flex-grow border-t border-gray-300 dark:border-gray-600" />
        </div>
        <form onSubmit={onSubmit} className="space-y-5">
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
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
            >
              {t("submit")}
            </button>
          </div>
        </form>
        <div className="flex items-center justify-between">
          <Link
            to="/forgotten-password"
            className="text-sm text-gray-600 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            {t("forgotten_password")}
          </Link>
          <Link
            to="/create-an-account"
            className="text-sm text-gray-600 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            {t("create_an_account")}
          </Link>
        </div>
      </div>
      <Modal
        title={t("enter_otp_code")}
        visible={visible}
        onClose={handleClose}
        footer={
          <div className="flex justify-end gap-4">
            <button
              className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600 dark:text-white transition-colors disabled:opacity-50"
              onClick={handleResendOtp}
              disabled={isResendDisabled}
            >
              {isResendDisabled
                ? `${t("resend")} (${delayCounter}s)`
                : t("resend")}
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              onClick={handleOtpSubmit}
            >
              {t("submit")}
            </button>
          </div>
        }
      >
        <p className="text-center text-gray-700 dark:text-gray-300 mb-4">
          {t("please_enter_the_6_character_code_we_sent_to_your_email")}{" "}
          {" " + email}
        </p>
        <div className="flex gap-2 md:gap-3 justify-center">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              inputMode="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(e.target.value, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              onPaste={handlePaste}
              ref={(el: HTMLInputElement | null): void => {
                inputsRef.current[idx] = el;
              }}
              className="w-12 h-12 md:w-14 md:h-14 text-center text-lg md:text-xl rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          ))}
        </div>
      </Modal>
    </>
  );
};

export default Login;
