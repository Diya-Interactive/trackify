import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
    children: JSX.Element;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        return <Navigate to="/app/dashboard" replace />; /** Change this route as per your requirement */
    }

    return children;
};

export default PublicRoute;
