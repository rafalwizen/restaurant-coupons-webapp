/**
 * Format a date string to a more readable format
 */
export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

/**
 * Check if a coupon is still valid based on its expiration date
 */
export function isStillValid(validTo: string): boolean {
    const expirationDate = new Date(validTo);
    const currentDate = new Date();
    return expirationDate > currentDate;
}

/**
 * Format the validity period of a coupon
 */
export function formatValidityPeriod(validFrom: string, validTo: string): string {
    const isValid = isStillValid(validTo);

    if (!isValid) {
        return 'WYGASŁY';
    }

    const startDate = new Date(validFrom);
    const endDate = new Date(validTo);
    const currentDate = new Date();

    // If the coupon is already active
    if (startDate <= currentDate) {
        const daysRemaining = Math.ceil((endDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));

        if (daysRemaining === 1) {
            return 'Wygasa dzisiaj';
        } else {
            return `Ważny jeszcze przez ${daysRemaining} dni`;
        }
    } else {
        // If the coupon is not yet active
        return `Ważny od ${formatDate(validFrom)} do ${formatDate(validTo)}`;
    }
}
