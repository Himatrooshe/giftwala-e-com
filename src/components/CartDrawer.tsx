'use client';

import Image from 'next/image';
import Link from 'next/link';
import { X, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, removeFromCart, totalQuantity } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 z-[99] ${
          isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeDrawer}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm sm:max-w-md bg-white shadow-2xl z-[100] transition-transform duration-300 flex flex-col ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wide">Your Cart</p>
            <h2 className="text-xl font-semibold text-gray-900">{totalQuantity} item{totalQuantity !== 1 ? 's' : ''}</h2>
          </div>
          <button
            onClick={closeDrawer}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <ShoppingCart size={36} className="mx-auto mb-4 text-gray-400" />
              <p>Your cart is empty.</p>
              <p className="text-sm mt-1">Add a product to see it here.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3 sm:gap-4 border border-gray-100 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0">
                  <Image
                    src={item.images?.[0] || '/main-pro.jpeg'}
                    alt={item.name}
                    fill
                    className="object-contain"
                    loading="lazy"
                    sizes="(max-width: 640px) 80px, 96px"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2">{item.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">Quantity: {item.quantity}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">৳{item.price}</span>
                    {item.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        ৳{item.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-5 border-t border-gray-100 space-y-3">
          <Link
            href="/checkout"
            className="inline-flex items-center justify-center w-full py-3 px-4 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-red-600 transition-colors"
            onClick={closeDrawer}
          >
            Proceed to Checkout
          </Link>
          <button
            onClick={closeDrawer}
            className="w-full py-3 px-4 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </aside>
    </>
  );
}


