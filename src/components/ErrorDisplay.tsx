import React from 'react';

interface ErrorDisplayProps {
    message: string | null;
    onRetry?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                </svg>
            </div>
            <p className="text-gray-800 text-lg font-medium mb-4">{message || 'Coś poszło nie tak...'}</p>

            {onRetry && (
                <button
                    onClick={onRetry}
                    className="bg-purple-700 text-white px-6 py-2 rounded-md hover:bg-purple-800 transition-colors"
                >
                    Spróbuj ponownie
                </button>
            )}
        </div>
    );
};

export default ErrorDisplay;