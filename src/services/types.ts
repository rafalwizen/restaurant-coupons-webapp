export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data: T | null;
    timestamp: string;
}

export interface PaginatedResponse<T> {
    content: T[];
    pageable: {
        pageNumber: number;
        pageSize: number;
    };
    totalElements: number;
    totalPages?: number;
}

export interface CouponSummary {
    id: number;
    name: string;
    discountValue: number;
    imageId: number;
    imageUrl: string;
}

export interface CouponDetail {
    id: number;
    name: string;
    description: string;
    discountValue: number;
    validFrom: string;
    validTo: string;
    termsAndConditions: string | null;
    isActive: boolean;
    imageId: number;
    imageUrl: string;
}