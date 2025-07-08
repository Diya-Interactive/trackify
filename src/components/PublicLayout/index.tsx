import React from "react";
import ThemeToggle from "../ThemeToggle";
import { Outlet } from "react-router-dom";

const PublicLayout: React.FC = () => (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0000001A] dark:bg-gray-900 px-4 relative">
        <header className="w-full fixed top-0 left-0 z-10 flex justify-end items-center gap-4 px-6 py-4 shadow-md border-b border-gray-300 bg-background-light dark:bg-background-dark dark:shadow-sm dark:shadow-zinc-900 dark:border-gray-700">
            <ThemeToggle />
            {/* LanguageSelector if needed */}
        </header>

        <Outlet />
    </div>
);

export default PublicLayout;
