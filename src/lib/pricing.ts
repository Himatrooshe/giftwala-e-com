/**
 * Calculate price for Gear Lever Silicone Rubber Sleeve based on quantity
 * Pricing tiers:
 * - 1 item: 260 tk
 * - 2 items: 400 tk (200 tk each)
 * - 3+ items: 180 tk each
 */
export function calculateGearLeverPrice(quantity: number): number {
  if (quantity <= 0) return 0;
  if (quantity === 1) return 260;
  if (quantity === 2) return 400;
  // 3 or more items: 180 tk each
  return quantity * 180;
}

/**
 * Get price per unit for Gear Lever Silicone Rubber Sleeve based on quantity
 */
export function getGearLeverUnitPrice(quantity: number): number {
  if (quantity <= 0) return 0;
  if (quantity === 1) return 260;
  if (quantity === 2) return 200; // 400 / 2 = 200
  return 180; // 3+ items
}

/**
 * Get total price for a product, handling special pricing for gear-lever-sleeve
 */
export function getProductPrice(productId: string, quantity: number, basePrice: number): number {
  if (productId === 'gear-lever-sleeve') {
    return calculateGearLeverPrice(quantity);
  }
  return basePrice * quantity;
}

/**
 * Get unit price for a product, handling special pricing for gear-lever-sleeve
 */
export function getProductUnitPrice(productId: string, quantity: number, basePrice: number): number {
  if (productId === 'gear-lever-sleeve') {
    return getGearLeverUnitPrice(quantity);
  }
  return basePrice;
}

