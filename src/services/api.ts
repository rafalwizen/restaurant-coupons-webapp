import { ApiResponse, CouponDetail, CouponSummary, PaginatedResponse } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

/**
 * Generic function to handle API responses
 */
async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
        return {
            success: false,
            message: `Error: ${response.status} ${response.statusText}`,
            data: null,
            timestamp: new Date().toISOString()
        };
    }

    const data = await response.json();
    return data as ApiResponse<T>;
}

/**
 * Fetch paginated list of active coupons
 */
export async function fetchCoupons(
    page: number = 0,
    size: number = 10,
    sortBy: string = 'id',
    direction: 'asc' | 'desc' = 'asc'
): Promise<ApiResponse<PaginatedResponse<CouponSummary>>> {
    try {
        const url = new URL(`${API_BASE_URL}/api/coupons`);
        url.searchParams.append('page', page.toString());
        url.searchParams.append('size', size.toString());
        url.searchParams.append('sortBy', sortBy);
        url.searchParams.append('direction', direction);

        const response = await fetch(url.toString());
        return handleResponse<PaginatedResponse<CouponSummary>>(response);
    } catch (error) {
        console.error('Error fetching coupons:', error);
        return {
            success: false,
            message: 'Failed to fetch coupons. Please try again later.',
            data: null,
            timestamp: new Date().toISOString()
        };
    }
}

/**
 * Fetch detailed information about a specific coupon
 */
export async function fetchCouponById(id: number): Promise<ApiResponse<CouponDetail>> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/coupons/${id}`);
        return handleResponse<CouponDetail>(response);
    } catch (error) {
        console.error(`Error fetching coupon with id ${id}:`, error);
        return {
            success: false,
            message: 'Failed to fetch coupon details. Please try again later.',
            data: null,
            timestamp: new Date().toISOString()
        };
    }
}