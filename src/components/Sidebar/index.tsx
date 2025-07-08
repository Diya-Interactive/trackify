import { type JSX } from "react";
import { Link, useLocation } from "react-router-dom";
import logoShort from "../../assets/images/fav.png";
import { Logout, Moon, Sun } from "../../assets/icons";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";

interface MenuItem {
    label: string;
    icon: JSX.Element;
    path: string;
}

interface SidebarProps {
    collapsed: boolean;
}

const menuItems: MenuItem[] = [
    { label: "Home", icon: <Moon size={20} />, path: "/" },
    { label: "Users", icon: <Sun size={20} />, path: "/users" },
    { label: "Settings", icon: <Logout size={20} />, path: "/settings" },
];

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
    const location = useLocation();

    return (
        <aside
            className={`flex flex-col h-screen transition-all duration-300 border-r shadow-md ${collapsed ? "w-20" : "w-64"
                } bg-white dark:bg-gray-900 dark:border-gray-800`}
        >
            {/* Top Section: Logo + Toggle */}
            <div
                className={`flex items-center ${collapsed ? "justify-center" : "justify-between"
                    } p-4`}
            >
                <span className="text-xl font-bold text-gray-800 dark:text-white">
                    {!collapsed ? (
                        <div className="relative w-auto h-10">
                            <img
                                src={logoDark}
                                alt="Light theme logo"
                                className="block dark:hidden object-contain w-auto h-10 cursor-pointer"
                            />
                            <img
                                src={logoLight}
                                alt="Dark theme logo"
                                className="hidden dark:block object-contain w-auto h-10 cursor-pointer"
                            />
                        </div>
                    ) : (
                        <img
                            src={logoShort}
                            alt="Dark theme logo"
                            className="object-contain w-auto h-10 cursor-pointer"
                        />
                    )}
                </span>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 mb-2" />

            {/* Menu Items */}
            <nav className="flex flex-col gap-1 px-2 pb-6 flex-grow">
                {menuItems.map(({ label, icon, path }) => {
                    const isActive = location.pathname === path;
                    return (
                        <Link
                            key={path}
                            to={path}
                            className={`flex items-center gap-3 px-4 py-2 rounded-md font-medium transition-colors ${isActive
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800"
                                }`}
                        >
                            {icon}
                            {!collapsed && <span>{label}</span>}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;
