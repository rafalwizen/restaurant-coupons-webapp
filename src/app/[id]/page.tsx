'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { CouponDetail } from '@/services/types';
import { fetchCouponById } from '@/services/api';
import { formatDate, formatValidityPeriod, isStillValid } from '@/utils/formatDate';

import LoadingIndicator from '@/components/LoadingIndicator';
import ErrorDisplay from '@/components/ErrorDisplay';

export default function CouponDetailPage() {
    const params = useParams();
    const router = useRouter();
    const couponId = typeof params.id === 'string' ? parseInt(params.id, 10) : 0;

    const [coupon, setCoupon] = useState<CouponDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadCouponDetail = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetchCouponById(couponId);

                if (response.success && response.data) {
                    setCoupon(response.data);
                } else {
                    setError(response.message || 'Failed to load coupon details');
                }
            } catch (err) {
                setError('Unable to load coupon details. Please check your connection.');
                console.error('Error loading coupon details:', err);
            } finally {
                setLoading(false);
            }
        };

        if (couponId) {
            loadCouponDetail();
        } else {
            setError('Invalid coupon ID');
            setLoading(false);
        }
    }, [couponId]);

    const handleBackClick = () => {
        router.back();
    };

    if (loading) {
        return <LoadingIndicator message="Loading coupon details..." />;
    }

    if (error || !coupon) {
        return <ErrorDisplay message={error || 'Coupon not found'} onRetry={() => router.back()} />;
    }

    // Check if the coupon is still valid
    const valid = isStillValid(coupon.validTo);

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="relative w-full h-64 sm:h-80 md:h-96">
                <Image
                    src={coupon.imageUrl}
                    alt={coupon.name}
                    fill
                    sizes="100vw"
                    style={{ objectFit: 'cover' }}
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                <button
                    onClick={handleBackClick}
                    className="absolute top-4 left-4 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
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
            </div>

            <div className="container mx-auto px-4 py-6 -mt-10 relative z-10">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h1 className="text-2xl font-bold text-gray-800 mr-4">{coupon.name}</h1>
                        <div className="bg-purple-700 text-white px-3 py-2 rounded-lg text-center">
                            <div className="text-xl font-bold">{coupon.discountValue}%</div>
                            <div className="text-xs font-medium">OFF</div>
                        </div>
                    </div>

                    <div className={`inline-block px-4 py-2 rounded-md text-sm font-medium mb-6 ${
                        valid ? 'bg-purple-100 text-purple-800' : 'bg-red-100 text-red-800'
                    }`}>
                        {valid
                            ? formatValidityPeriod(coupon.validFrom, coupon.validTo)
                            : "EXPIRED"}
                    </div>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
                        <p className="text-gray-600">{coupon.description}</p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Validity Period</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-500 text-sm">Valid From</p>
                                <p className="text-gray-800 font-medium">{formatDate(coupon.validFrom)}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Valid To</p>
                                <p className="text-gray-800 font-medium">{formatDate(coupon.validTo)}</p>
                            </div>
                        </div>
                    </section>

                    {coupon.termsAndConditions && (
                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">Terms & Conditions</h2>
                            <p className="text-gray-600 text-sm">{coupon.termsAndConditions}</p>
                        </section>
                    )}
                </div>
            </div>
        </main>
    );
}