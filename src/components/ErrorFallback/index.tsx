import React from "react";

type ErrorFallbackProps = {
    error: Error;
    resetErrorBoundary: () => void;
};

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
    error,
    resetErrorBoundary,
}) => (
    <div role="alert" className="p-4 bg-red-100 border border-red-400 rounded">
        <p className="font-bold text-red-700">Something went wrong:</p>
        <pre className="text-red-600">{error.message}</pre>
        <button
            onClick={resetErrorBoundary}
            className="mt-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
            Try again
        </button>
    </div>
);

export default ErrorFallback;
