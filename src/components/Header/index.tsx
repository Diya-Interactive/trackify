import ThemeToggle from "../ThemeToggle";
import { useUser } from "../../hooks/useUse";
import { useTranslation } from "react-i18next";
import { allLinks } from "../../constants/menu";
import type { HeaderProps } from "../../types/header";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";
import React, { useEffect, useRef, useState } from "react";
import { Bars, Close, Logout, User } from "../../assets/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUserInitials } from "../../utils/globalFunctions";

const Header: React.FC<HeaderProps> = ({ isSidebarVisible, toggleSidebar }) => {
    const { user } = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const currentPath = location.pathname;
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
    const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

    const links = (() => {
        if (!user) return [];
        if (user.type === "admin") return allLinks;
        if (user.type === "sales")
            return allLinks.filter((link) => link.path === "/app/dashboard");
        if (user.type === "verifier")
            return allLinks.filter((link) => link.path !== "/app/users");
        return [];
    })();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // const userInitials = getUserInitials({ name: user?.name });

    return (
        <header className="w-full px-6 py-4 bg-white dark:bg-gray-900 shadow">
            <div className="flex items-center justify-between">
                {/* Left Side: Logo or Sidebar Toggle */}
                <div className="flex items-center space-x-8">
                    {isSidebarVisible ? (
                        <button
                            onClick={toggleSidebar}
                            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <Bars size={22} />
                        </button>
                    ) : (
                        <div className="relative w-auto h-10">
                            <img
                                src={logoDark}
                                alt="Light theme logo"
                                className="block dark:hidden object-contain w-auto h-10 cursor-pointer"
                                onClick={() => navigate("/app/dashboard")}
                            />
                            <img
                                src={logoLight}
                                alt="Dark theme logo"
                                className="hidden dark:block object-contain w-auto h-10 cursor-pointer"
                                onClick={() => navigate("/app/dashboard")}
                            />
                        </div>
                    )}

                    {!isSidebarVisible && (
                        <div className="hidden md:flex items-center space-x-6">
                            <nav className="flex items-center space-x-6 text-gray-700 dark:text-gray-200 font-medium">
                                {links.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={`hover:underline first-letter:capitalize decoration-2 focus:outline-none underline-offset-[28px] ${currentPath === link.path
                                                ? "text-blue-600 underline"
                                                : "text-black dark:text-white"
                                            }`}
                                    >
                                        {t(link?.name)}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    )}
                </div>

                {/* Right Side: Profile + Theme */}
                <div
                    className="hidden md:flex items-center space-x-6"
                    ref={dropdownRef}
                >
                    <ThemeToggle />
                    <button
                        onClick={toggleDropdown}
                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
                    >
                        {getUserInitials({ name: user?.name })}
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 top-14 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 z-50">
                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                <div className="flex items-center">
                                    <User className="mr-1" size={12} />
                                    <span>Profile</span>
                                </div>
                            </button>
                            <hr className="border-t border-gray-200 dark:border-gray-700 my-1" />
                            <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900">
                                <div className="flex items-center">
                                    <Logout className="mr-1" size={12} />
                                    <span>Logout</span>
                                </div>
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden flex items-center space-x-4">
                    <ThemeToggle />
                    <button
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={toggleMobileMenu}
                    >
                        {!isMobileMenuOpen ? <Bars size={22} /> : <Close size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden mt-4 py-4 border-t border-gray-200 dark:border-gray-700">
                    <nav className="flex flex-col space-y-4">
                        <div className="flex items-center space-x-3 px-2 py-1">
                            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-600 text-white font-semibold">
                                {/* {userInitials} */}
                            </div>
                            <span className="text-gray-800 dark:text-gray-200">
                                {user?.name}
                            </span>
                        </div>
                        {links.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-2 py-1 rounded-lg ${currentPath === link.path
                                        ? "bg-blue-100 dark:bg-blue-900 text-blue-600"
                                        : "text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                                    }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {t(link?.name)}
                            </Link>
                        ))}
                        <button className="flex items-center px-2 py-1 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                            <User className="mr-2" size={16} />
                            <span>Profile</span>
                        </button>
                        <button className="flex items-center px-2 py-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg">
                            <Logout className="mr-2" size={16} />
                            <span>Logout</span>
                        </button>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
