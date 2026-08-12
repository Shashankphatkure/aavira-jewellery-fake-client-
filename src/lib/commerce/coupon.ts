const COUPONS: Record<string, { percentOff: number; label: string }> = {
  AAVIRA10: { percentOff: 10, label: "10% off your order" },
  WELCOME15: { percentOff: 15, label: "15% off — welcome gift" },
};

export const FREE_SHIPPING_THRESHOLD = 1499;
export const SHIPPING_FEE = 79;

export function applyCoupon(code: string, subtotal: number) {
  const coupon = COUPONS[code.trim().toUpperCase()];
  if (!coupon) {
    return { valid: false as const, discount: 0, message: "Invalid or expired code." };
  }
  const discount = Math.round((subtotal * coupon.percentOff) / 100);
  return {
    valid: true as const,
    discount,
    code: code.trim().toUpperCase(),
    message: coupon.label,
  };
}

export function shippingFee(subtotal: number) {
  return subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE;
}
