import LoaderOverlay from "../../components/Loader";
import type { LoaderContextType } from "../../types/loader";
import React, { createContext, useState, type ReactNode } from "react";

export const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

const LoaderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const showLoader = () => setIsLoading(true);
    const hideLoader = () => setIsLoading(false);

    return (
        <LoaderContext.Provider value={{ showLoader, hideLoader, isLoading }}>
            {children}
            {isLoading && <LoaderOverlay />}
        </LoaderContext.Provider>
    );
};

export default LoaderProvider;
