import React from "react";
import { Moon, Sun } from "../../assets/icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../hooks/useTheme";

const ThemeToggle: React.FC = () => {
    const { t } = useTranslation();
    const { theme, toggleTheme, themeName } = useTheme();

    const isDark = theme === "dark";

    return (
        <div className="flex items-center gap-3">
            <button
                onClick={toggleTheme}
                className={`flex items-center gap-2 px-4 py-2 rounded transition-all font-medium
                    ${isDark
                        ? "bg-gray-800 text-white border border-gray-600 hover:bg-gray-700"
                        : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-100"
                    }`}
                aria-label={t(themeName)}
            >
                {isDark ? <Moon size={18} /> : <Sun size={18} />}
                <span className="text-sm capitalize">{t(isDark ? 'light' : 'dark')}</span>
            </button>
        </div>
    );
};

export default ThemeToggle;
