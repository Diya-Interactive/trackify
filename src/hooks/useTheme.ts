import { useEffect, useState } from "react";

export const useTheme = () => {
    const [theme, setTheme] = useState<"light" | "dark" | null>(null);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

        const initialTheme =
            savedTheme === "light" || savedTheme === "dark"
                ? savedTheme
                : prefersDark
                    ? "dark"
                    : "light";

        setTheme(initialTheme);
        document.documentElement.classList.toggle("dark", initialTheme === "dark");
    }, []);

    // Apply theme class & save to localStorage when theme changes
    useEffect(() => {
        if (theme !== null) {
            document.documentElement.classList.toggle("dark", theme === "dark");
            localStorage.setItem("theme", theme);
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return {
        theme: theme ?? "light",
        toggleTheme,
        themeName: theme ?? "light",
    };
};
