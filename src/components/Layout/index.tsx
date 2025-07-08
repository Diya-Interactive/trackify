import Header from "../Header";
import Sidebar from "../Sidebar";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="flex h-screen bg-[#DCDCDA] dark:bg-gray-600">
            {/* Sidebar (Hidden on mobile) */}
            <div className="h-full bg-white dark:bg-gray-800 shadow-md hidden lg:block">
                <Sidebar collapsed={collapsed} />
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col flex-1">
                <div className="h-16 w-full sticky top-0 z-50 bg-white dark:bg-gray-700 shadow">
                    <Header
                        isSidebarVisible={true}
                        toggleSidebar={() => setCollapsed((prev) => !prev)}
                    />
                </div>

                <div className="flex-1 overflow-auto px-6 pt-4 pb-1 transition-colors duration-300">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
