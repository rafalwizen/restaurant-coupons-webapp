'use client';

import { useEffect, useState } from 'react';
import { CouponSummary, PaginatedResponse } from '@/services/types';
import { fetchCoupons } from '@/services/api';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';

import CouponCard from '@/components/CouponCard';
import LoadingIndicator from '@/components/LoadingIndicator';
import ErrorDisplay from '@/components/ErrorDisplay';
import Pagination from '@/components/Pagination';

export default function HomePage() {
  const [coupons, setCoupons] = useState<CouponSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const loadCoupons = async (page: number = 0) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetchCoupons(page, DEFAULT_PAGE_SIZE);

      if (response.success && response.data) {
        const paginatedData = response.data as PaginatedResponse<CouponSummary>;
        setCoupons(paginatedData.content);
        setTotalElements(paginatedData.totalElements);

        // Calculate total pages
        const calculatedTotalPages = Math.ceil(
            paginatedData.totalElements / DEFAULT_PAGE_SIZE
        );
        setTotalPages(calculatedTotalPages);
      } else {
        setError(response.message || 'Nie udało się załadować kuponów');
      }
    } catch (err) {
      setError('Nie można załadować kuponów. Sprawdź swoje połączenie.');
      console.error('Błąd podczas ładowania kuponów:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCoupons(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  if (loading && coupons.length === 0) {
    return <LoadingIndicator message="Ładowanie kuponów..." />;
  }

  if (error && coupons.length === 0) {
    return <ErrorDisplay message={error} onRetry={() => loadCoupons(currentPage)} />;
  }

  return (
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Kupony restauracyjne</h1>

          {loading && (
              <div className="flex justify-center my-4">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-purple-700 rounded-full animate-spin"></div>
              </div>
          )}

          {coupons.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-gray-600 text-lg">Brak dostępnych kuponów w tej chwili</p>
              </div>
          ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coupons.map((coupon) => (
                    <CouponCard key={coupon.id} coupon={coupon} />
                ))}
              </div>
          )}

          <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              isLoading={loading}
          />
        </div>
      </main>
  );
}
