import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CouponSummary } from '@/services/types';

interface CouponCardProps {
    coupon: CouponSummary;
}

const CouponCard: React.FC<CouponCardProps> = ({ coupon }) => {
    return (
        <Link href={`/${coupon.id}`} passHref>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 transition transform hover:scale-[1.02] cursor-pointer">
                <div className="relative h-48 w-full">
                    <Image
                        src={coupon.imageUrl}
                        alt={coupon.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: 'cover' }}
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdgJD8R4r5QAAAABJRU5ErkJggg=="
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end">
                        <h3 className="text-white font-bold text-lg line-clamp-2">{coupon.name}</h3>
                        <div className="bg-purple-700 text-white px-2 py-1 rounded-lg text-sm font-bold">
                            {coupon.discountValue}% OFF
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CouponCard;