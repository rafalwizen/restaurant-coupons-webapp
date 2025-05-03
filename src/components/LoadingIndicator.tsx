import React from 'react';

interface LoadingIndicatorProps {
    message?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message = 'Loading...' }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-purple-700 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 text-lg">{message}</p>
        </div>
    );
};

export default LoadingIndicator;