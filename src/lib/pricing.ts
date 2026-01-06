/**
 * Special pricing configuration for products with quantity-based pricing
 * Add new products here if they have special pricing tiers
 */
type PricingTier = {
  minQuantity: number;
  maxQuantity?: number;
  price: number; // Total price for this tier
};

type SpecialPricingConfig = {
  tiers: PricingTier[];
  defaultPrice: number; // Price per unit for quantities beyond tiers
};

const specialPricingMap: Record<string, SpecialPricingConfig> = {
  'gear-lever-sleeve': {
    tiers: [
      { minQuantity: 1, maxQuantity: 1, price: 260 },
      { minQuantity: 2, maxQuantity: 2, price: 390 }, // Better combo deal: Save 140 tk (70 tk per piece)
    ],
    defaultPrice: 180, // For 3+ items
  },
  // Add more products with special pricing here:
  // 'product-id-2': {
  //   tiers: [
  //     { minQuantity: 1, maxQuantity: 2, price: 500 },
  //     { minQuantity: 3, maxQuantity: 5, price: 1200 },
  //   ],
  //   defaultPrice: 200,
  // },
};

/**
 * Calculate price for a product with special pricing tiers
 */
function calculateSpecialPrice(config: SpecialPricingConfig, quantity: number): number {
  if (quantity <= 0) return 0;

  // Check if quantity matches any tier
  for (const tier of config.tiers) {
    if (
      quantity >= tier.minQuantity &&
      (tier.maxQuantity === undefined || quantity <= tier.maxQuantity)
    ) {
      return tier.price;
    }
  }

  // If quantity exceeds all tiers, use default price per unit
  return quantity * config.defaultPrice;
}

/**
 * Get unit price for a product with special pricing
 */
function getSpecialUnitPrice(config: SpecialPricingConfig, quantity: number): number {
  if (quantity <= 0) return 0;
  const totalPrice = calculateSpecialPrice(config, quantity);
  return totalPrice / quantity;
}

/**
 * Get total price for a product, handling special pricing if configured
 */
export function getProductPrice(productId: string, quantity: number, basePrice: number): number {
  const specialPricing = specialPricingMap[productId];
  if (specialPricing) {
    return calculateSpecialPrice(specialPricing, quantity);
  }
  // Standard pricing: base price * quantity
  return basePrice * quantity;
}

/**
 * Get unit price for a product, handling special pricing if configured
 */
export function getProductUnitPrice(productId: string, quantity: number, basePrice: number): number {
  const specialPricing = specialPricingMap[productId];
  if (specialPricing) {
    return getSpecialUnitPrice(specialPricing, quantity);
  }
  // Standard pricing: base price
  return basePrice;
}

/**
 * Check if a product has special pricing configured
 */
export function hasSpecialPricing(productId: string): boolean {
  return productId in specialPricingMap;
}

/**
 * Legacy functions for backward compatibility (deprecated - use getProductPrice/getProductUnitPrice instead)
 */
export function calculateGearLeverPrice(quantity: number): number {
  return calculateSpecialPrice(specialPricingMap['gear-lever-sleeve'], quantity);
}

export function getGearLeverUnitPrice(quantity: number): number {
  return getSpecialUnitPrice(specialPricingMap['gear-lever-sleeve'], quantity);
}

