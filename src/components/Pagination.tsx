import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    isLoading?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
                                                   currentPage,
                                                   totalPages,
                                                   onPageChange,
                                                   isLoading = false
                                               }) => {
    // Return nothing if there's only one page
    if (totalPages <= 1) {
        return null;
    }

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;

        let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

        // Adjust the start if we're near the end
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(0, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    disabled={isLoading || i === currentPage}
                    className={`px-3 py-1 mx-1 rounded ${
                        i === currentPage
                            ? 'bg-purple-700 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {i + 1}
                </button>
            );
        }

        return pageNumbers;
    };

    return (
        <div className="flex items-center justify-center py-4 border-t border-gray-200">
            <button
                onClick={() => onPageChange(Math.max(0, currentPage - 1))}
                disabled={isLoading || currentPage === 0}
                className={`px-3 py-1 mx-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 ${
                    isLoading || currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>

            {renderPageNumbers()}

            <button
                onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
                disabled={isLoading || currentPage === totalPages - 1}
                className={`px-3 py-1 mx-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 ${
                    isLoading || currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>
        </div>
    );
};

export default Pagination;