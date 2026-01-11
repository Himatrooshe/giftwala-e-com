'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ShoppingCart, MapPin, User, CreditCard, Plus, Minus, PackageX } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { getProductPrice, hasSpecialPricing } from '@/lib/pricing';
import { trackInitiateCheckout } from '@/lib/metaPixel';

export default function CheckoutPage() {
  const router = useRouter();
  const { items: cartItems, updateQuantity, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    fullAddress: '',
    deliveryLocation: 'inside'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const insideDhakaDelivery = 80;
  const outsideDhakaDelivery = 120;

  const selectedItems = cartItems.filter((item) => item.quantity > 0);
  const hasItems = cartItems.length > 0;

  // Track InitiateCheckout event when page loads with items
  useEffect(() => {
    if (hasItems && selectedItems.length > 0) {
      const total = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      trackInitiateCheckout({ value: total, currency: 'BDT' });
    }
  }, []); // Run only once on mount

  // Group items by product ID to handle special pricing correctly
  const groupedItems = useMemo(() => {
    const grouped = new Map<string, { product: typeof cartItems[0], totalQuantity: number }>();
    
    selectedItems.forEach(item => {
      const existing = grouped.get(item.id);
      if (existing) {
        existing.totalQuantity += item.quantity;
      } else {
        grouped.set(item.id, { product: item, totalQuantity: item.quantity });
      }
    });
    
    return Array.from(grouped.values());
  }, [selectedItems]);

  // Calculate subtotal with special pricing (if configured for any products)
  const subtotal = useMemo(() => {
    return groupedItems.reduce((total, { product, totalQuantity }) => {
      const itemPrice = getProductPrice(product.id, totalQuantity, product.price);
      return total + itemPrice;
    }, 0);
  }, [groupedItems]);

  const deliveryCost = formData.deliveryLocation === 'inside' ? insideDhakaDelivery : outsideDhakaDelivery;
  const totalPrice = subtotal + (subtotal > 0 ? deliveryCost : 0);

  const handleQuantityChange = (productId: string, delta: number) => {
    const target = cartItems.find((item) => item.id === productId);
    if (!target) return;
    updateQuantity(productId, target.quantity + delta);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDeliveryLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      deliveryLocation: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Submitting order data:', formData);
      
      // Prepare the order data with grouped items and correct pricing
      const orderItems = groupedItems.map(({ product, totalQuantity }) => ({
        id: product.id,
        name: product.name,
        price: getProductPrice(product.id, totalQuantity, product.price),
        unitPrice: hasSpecialPricing(product.id)
          ? getProductPrice(product.id, totalQuantity, product.price) / totalQuantity 
          : product.price,
        quantity: totalQuantity,
      }));

      const orderData = {
        ...formData,
        items: orderItems,
        productPrice: subtotal,
        subtotal,
        deliveryCost,
        totalPrice
      };
      
      console.log('Full order payload:', orderData);
      
      // Send to Google Apps Script and capture orderId
      // The Apps Script will:
      // 1. Save order to Google Sheets
      // 2. Send confirmation email to customer (if email provided)
      // 3. Send notification email to admin (tuhinbogra010@gmail.com)
      let createdOrderId: string | undefined = undefined;
      try {
        console.log('Sending order data to Google Sheets:', orderData);

        // Google Apps Script Web App URL for order processing
        // The script saves orders to Google Sheets and sends confirmation emails
        const scriptUrl = 'https://script.google.com/macros/s/AKfycbyTzPANCKs8fuhrrFzbZf0vOw-_j2EXzcPdhjVxjrECmxwVO9nekksYQgQD1p0RPlI8/exec';

        // Note: Apps Script should set CORS headers and accept text/plain to avoid preflight
        const res = await fetch(scriptUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(orderData)
        });

        // Try to parse JSON response { status: 'success', orderId: '#1001', ... }
        try {
          const json = await res.json();
          if (json && typeof json.orderId === 'string') {
            createdOrderId = json.orderId;
          }
        } catch {
          // If parsing fails (e.g., CORS or non-JSON), silently continue
        }

        console.log('✅ Order submission completed', { createdOrderId });
      } catch (googleError) {
        console.error('❌ Failed to send to Google Sheets:', googleError);
      }

      // Also store in localStorage as backup (including orderId if available)
      const backupData = {
        ...orderData,
        orderId: createdOrderId,
        timestamp: new Date().toISOString(),
      };
      const existingOrders = JSON.parse(localStorage.getItem('pendingOrders') || '[]');
      existingOrders.push(backupData);
      localStorage.setItem('pendingOrders', JSON.stringify(existingOrders));
      if (createdOrderId) {
        localStorage.setItem('lastOrderId', createdOrderId);
      }
      

      // Redirect to thank you page instead of showing alert
      clearCart();
      router.push('/thank-you-order');
    } catch (error) {
      console.error('Error submitting order:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        formData: formData
      });
      alert('Something went wrong. Please try again later or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.fullName && formData.phone && formData.fullAddress && subtotal > 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 text-gray-900 hover:text-red-600 transition-colors">
              <ArrowLeft size={20} />
              Back to Home
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Checkout / অর্ডার</h1>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6 space-y-5">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <ShoppingCart size={24} />
                Choose Products / পণ্য নির্বাচন করুন
              </h2>

              {hasItems ? (
                <div className="space-y-4">
                  {groupedItems.map(({ product: item, totalQuantity }) => {
                    const isOutOfStock = item.stock === 0;
                    const isSpecialPricing = hasSpecialPricing(item.id);
                    const itemTotalPrice = getProductPrice(item.id, totalQuantity, item.price);
                    return (
                      <div
                        key={item.id}
                        className={`p-4 rounded-2xl border transition-colors ${
                          totalQuantity > 0 ? 'border-gray-900 bg-white' : 'border-gray-200 bg-white'
                        }`}
                      >
                        <div className="flex gap-4">
                          <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center">
                            {item.images && item.images.length > 0 ? (
                              <Image
                                src={item.images[0]}
                                alt={item.name}
                                fill
                                className="object-contain"
                              />
                            ) : (
                              <div className="text-xs text-gray-500 text-center px-2">Coming soon</div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{item.name}</h3>
                                <p className="text-xs sm:text-sm text-gray-600">{item.tagline}</p>
                              </div>
                              <div className="text-right">
                                {isSpecialPricing ? (
                                  <div>
                                    <p className="text-lg font-bold text-gray-900">৳{itemTotalPrice}</p>
                                    {totalQuantity > 1 && (
                                      <p className="text-xs text-gray-500">
                                        ৳{Math.round(itemTotalPrice / totalQuantity)} per piece
                                      </p>
                                    )}
                                  </div>
                                ) : (
                                  <>
                                    <p className="text-lg font-bold text-gray-900">৳{item.price}</p>
                                    {item.originalPrice && (
                                      <p className="text-xs text-gray-400 line-through">৳{item.originalPrice}</p>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-gray-500">
                              <div className={`font-medium ${isOutOfStock ? 'text-red-600' : 'text-gray-600'}`}>
                                {isOutOfStock ? (
                                  <span className="inline-flex items-center gap-1 text-red-600">
                                    <PackageX size={14} /> Out of stock
                                  </span>
                                ) : (
                                  <>In stock: {item.stock} pcs</>
                                )}
                              </div>
                              <div className="flex items-center gap-1 text-gray-600">
                                Selected: {totalQuantity} {totalQuantity === 1 ? 'pc' : 'pcs'}
                              </div>
                            </div>
                            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const target = cartItems.find((i) => i.id === item.id);
                                    if (target) updateQuantity(item.id, totalQuantity - 1);
                                  }}
                                  disabled={totalQuantity <= 1}
                                  className="p-2 rounded-full border border-gray-300 text-gray-700 disabled:opacity-40"
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="w-8 text-center font-semibold text-gray-900">{totalQuantity}</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const target = cartItems.find((i) => i.id === item.id);
                                    if (target) updateQuantity(item.id, totalQuantity + 1);
                                  }}
                                  disabled={totalQuantity >= item.stock}
                                  className="p-2 rounded-full border border-gray-300 text-gray-700 disabled:opacity-40"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                              {totalQuantity > 0 && (
                                <div className="flex flex-col items-end gap-1">
                                  <p className="text-xs text-gray-500">
                                    {item.stock - totalQuantity === 0 ? 'All selected' : `${item.stock - totalQuantity} left in stock`}
                                  </p>
                                  {isSpecialPricing && totalQuantity >= 2 && (
                                    <p className="text-xs text-green-600 font-semibold">
                                      {totalQuantity === 2 ? 'Combo Deal!' : 'Best Value!'}
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-12 space-y-4">
                  <p>Your cart is empty. Please add products before checking out.</p>
                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold tracking-wide uppercase border border-gray-900 text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition-colors"
                  >
                    Browse Products
                  </Link>
                </div>
              )}

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-gray-900">
                  <span>Subtotal</span>
                  <span>৳{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-900">
                  <span className="text-sm sm:text-base">Delivery Charge ({formData.deliveryLocation === 'inside' ? 'Inside Dhaka' : 'Outside Dhaka'})</span>
                  <span>৳{subtotal > 0 ? deliveryCost : 0}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between items-center text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>৳{totalPrice}</span>
                </div>
                {subtotal === 0 && (
                  <p className="text-sm text-red-600">Please select at least one product to place your order.</p>
                )}
                <p className="text-sm text-gray-600 mt-2">Cash on Delivery</p>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <User size={24} />
                Delivery Information / ডেলিভারি তথ্য
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-900 mb-2">
                    Full Name / পুরো নাম *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    placeholder="Enter your full name / আপনার পুরো নাম লিখুন"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
                    Phone Number / ফোন নম্বর *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    placeholder="01XXXXXXXXX"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                    Email / ইমেইল (Optional / ঐচ্ছিক)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Full Address */}
                <div>
                  <label htmlFor="fullAddress" className="block text-sm font-medium text-gray-900 mb-2">
                    Full Address / সম্পূর্ণ ঠিকানা *
                  </label>
                  <textarea
                    id="fullAddress"
                    name="fullAddress"
                    required
                    value={formData.fullAddress}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors resize-none"
                    placeholder="Enter your complete address with area, city, district / আপনার সম্পূর্ণ ঠিকানা লিখুন"
                  />
                </div>

                {/* Delivery Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">
                    Delivery Location / ডেলিভারি এলাকা *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.deliveryLocation === 'inside'
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}>
                      <input
                        type="radio"
                        name="deliveryLocation"
                        value="inside"
                        checked={formData.deliveryLocation === 'inside'}
                        onChange={handleDeliveryLocationChange}
                        className="sr-only"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">Inside Dhaka / ঢাকার ভিতরে</div>
                        <div className="text-sm text-gray-600">৳{insideDhakaDelivery}</div>
                      </div>
                      {formData.deliveryLocation === 'inside' && (
                        <div className="ml-2 text-red-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </label>

                    <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.deliveryLocation === 'outside'
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}>
                      <input
                        type="radio"
                        name="deliveryLocation"
                        value="outside"
                        checked={formData.deliveryLocation === 'outside'}
                        onChange={handleDeliveryLocationChange}
                        className="sr-only"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">Outside Dhaka / ঢাকার বাইরে</div>
                        <div className="text-sm text-gray-600">৳{outsideDhakaDelivery}</div>
                      </div>
                      {formData.deliveryLocation === 'outside' && (
                        <div className="ml-2 text-red-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </label>
                  </div>
                </div>


                {/* Payment Method Info */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-red-900 font-medium mb-2">
                    <CreditCard size={20} />
                    Payment Method / পেমেন্ট পদ্ধতি
                  </div>
                  <p className="text-red-800 text-sm">
                    We accept Cash on Delivery only. You can pay when the product is delivered to your address.
                    <br />
                    শুধুমাত্র ক্যাশ অন ডেলিভারি গ্রহণ করা হয়। পণ্য পৌঁছানোর সময় পেমেন্ট করতে পারবেন।
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className={`w-full py-4 rounded-md font-medium text-sm uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
                    isFormValid && !isSubmitting
                      ? 'bg-gray-900 text-white hover:bg-gray-800'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Processing Order...
                    </>
                  ) : (
                      <>
                        <MapPin size={20} />
                        Place Order / অর্ডার করুন - ৳{totalPrice}
                      </>
                  )}
                </button>

                <p className="text-sm text-gray-600 text-center">
                  By placing this order, you agree to our terms and conditions. We will contact you within 24 hours to confirm delivery.
                  <br />
                  এই অর্ডার দিয়ে আপনি আমাদের শর্তাবলী মেনে নিচ্ছেন। ডেলিভারি নিশ্চিত করতে ২৪ ঘন্টার মধ্যে যোগাযোগ করব।
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
