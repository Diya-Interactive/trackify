import { Logout, Moon, Sun } from "../../assets/icons";
import type { MenuItem } from "../../types/Menu";

export const allLinks = [
    { name: "dashboard", path: "/app/dashboard" },
    { name: "users", path: "/app/users" },
];

export const menuItems: MenuItem[] = [
    { label: "Home", icon: <Moon size={20} />, path: "/" },
    { label: "Users", icon: <Sun size={20} />, path: "/users" },
    { label: "Settings", icon: <Logout size={20} />, path: "/settings" },
];
