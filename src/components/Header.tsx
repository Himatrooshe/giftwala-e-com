'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Menu, X, ShoppingCart, Search } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';

export default function Header() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('HOME');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [headerHeight, setHeaderHeight] = useState(56);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const { totalQuantity, openDrawer } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update header height for mobile menu positioning
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  // Focus search input when search is opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery('');
    }
  }, [isSearchOpen]);

  // Note: Mobile search doesn't use click-outside handler to prevent closing when typing

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when clicking outside
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target) &&
        !target.closest('button[aria-label="Toggle menu"]')
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Handle product click navigation
  const handleProductClick = (e: React.MouseEvent, productId: string) => {
    console.log('Product clicked:', productId);
    e.preventDefault();
    e.stopPropagation();
    setIsSearchOpen(false);
    setSearchQuery('');
    console.log('Navigating to:', `/products/${productId}`);
    // Use window.location for more reliable navigation
    window.location.href = `/products/${productId}`;
  };

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const lowerQuery = searchQuery.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.tagline.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery]);

  // Handle hash navigation from other pages
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash && window.location.pathname !== '/') {
        // If we're on a different page but have a hash, redirect to home with hash
        window.location.href = `/${hash}`;
      } else if (hash && window.location.pathname === '/') {
        // If we're on home page with hash, scroll to section
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 100);
      }
    };

    handleHashNavigation();
  }, []);

  const navLinks = [
    { href: '#home', label: 'HOME', isPage: false },
    { href: '#about', label: 'ABOUT', isPage: false },
    { href: '#reviews', label: 'REVIEWS', isPage: false },
    { href: '/products', label: 'PRODUCTS', isPage: true },
    { href: '#faq', label: 'FAQS', isPage: false },
    { href: '/contact', label: 'CONTACT', isPage: true },
  ];

  return (
    <>
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200">
      <nav className="w-full">
        <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-18 relative">
            {/* Mobile: Hamburger Menu Button (Left) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-600 hover:text-gray-900 transition-colors p-1.5 sm:p-2 absolute left-0 z-10"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
            </button>

            {/* Mobile: Logo (Centered) */}
            <a 
              href="#home" 
              onClick={(e) => {
                e.preventDefault();
                setActiveLink('HOME');
                
                // Check if we're on the home page
                if (window.location.pathname === '/') {
                  // If on home page, just scroll to home section
                  const element = document.querySelector('#home');
                  if (element) {
                    element.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }
                } else {
                  // If on other pages, navigate to home page
                  window.location.href = '/';
                }
              }}
              className="lg:hidden absolute left-1/2 transform -translate-x-1/2 z-10 cursor-pointer"
            >
              <Image
                src="https://res.cloudinary.com/dufzkjd0c/image/upload/v1764877604/Final_es4mgn.png"
                alt="Giftwala Logo"
                width={120}
                height={48}
                className="h-7 sm:h-8 w-auto"
                priority
              />
            </a>

            {/* Desktop: Logo */}
            <a 
              href="#home" 
              onClick={(e) => {
                e.preventDefault();
                setActiveLink('HOME');
                
                // Check if we're on the home page
                if (window.location.pathname === '/') {
                  // If on home page, just scroll to home section
                  const element = document.querySelector('#home');
                  if (element) {
                    element.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }
                } else {
                  // If on other pages, navigate to home page
                  window.location.href = '/';
                }
              }}
              className="hidden lg:flex items-center cursor-pointer"
            >
              <Image
                src="https://res.cloudinary.com/dufzkjd0c/image/upload/v1764877604/Final_es4mgn.png"
                alt="Giftwala Logo"
                width={160}
                height={48}
                className="h-8 xl:h-9 w-auto"
                priority
              />
            </a>

            {/* Mobile: Right Side Icons (Search & Cart) */}
            {!isSearchOpen ? (
              <div className="lg:hidden absolute right-0 flex items-center space-x-2 sm:space-x-3 z-10">
                <button
                  className="text-gray-600 hover:text-gray-900 transition-colors p-1.5 sm:p-2"
                  aria-label="Search"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsSearchOpen(true);
                  }}
                >
                  <Search size={18} className="sm:w-5 sm:h-5" />
                </button>
                <button
                  className="relative text-gray-600 hover:text-gray-900 transition-colors p-1.5 sm:p-2"
                  aria-label="Shopping cart"
                  onClick={openDrawer}
                >
                  <ShoppingCart size={18} className="sm:w-5 sm:h-5" />
                  {totalQuantity > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                      {totalQuantity}
                    </span>
                  )}
                </button>
              </div>
            ) : (
              <>
                {/* Mobile Search Container - Fresh Implementation */}
                <div 
                  ref={searchContainerRef} 
                  className="lg:hidden absolute left-12 right-20 sm:left-16 sm:right-24 z-10"
                >
                  {/* Mobile Search Bar */}
                  <div className="flex items-center bg-white border-2 border-gray-300 rounded-lg px-3 py-2 focus-within:border-gray-900 transition-colors">
                    <Search className="text-gray-400" size={18} />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        e.stopPropagation();
                        setSearchQuery(e.target.value);
                      }}
                      onFocus={(e) => {
                        e.stopPropagation();
                      }}
                      placeholder="Search products..."
                      className="flex-1 ml-2 bg-transparent outline-none text-gray-900 placeholder:text-gray-400 text-sm"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="text-gray-400 hover:text-gray-600 transition-colors ml-2"
                      aria-label="Close search"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Mobile Search Results Dropdown */}
                  {searchQuery.trim() && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto z-50">
                      {filteredProducts.length === 0 ? (
                        <div className="px-4 py-6 text-center text-gray-500 text-sm">
                          No products found
                        </div>
                      ) : (
                        filteredProducts.map((product) => (
                          <a
                            key={product.id}
                            href={`/products/${product.id}`}
                            data-product-link="true"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setIsSearchOpen(false);
                              setSearchQuery('');
                              window.location.href = `/products/${product.id}`;
                            }}
                            className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 cursor-pointer"
                          >
                            <div className="relative w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                              {product.images && product.images.length > 0 ? (
                                <Image
                                  src={product.images[0]}
                                  alt={product.name}
                                  fill
                                  className="object-contain p-1"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                  {product.emoji || '📦'}
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-gray-900 truncate">{product.name}</p>
                              <p className="text-xs text-gray-500 truncate">{product.tagline}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs font-bold text-gray-900">৳{product.price}</p>
                              {product.originalPrice && (
                                <p className="text-xs text-gray-400 line-through">৳{product.originalPrice}</p>
                              )}
                            </div>
                          </a>
                        ))
                      )}
                    </div>
                  )}
                </div>
                
                {/* Mobile Cart Button when search is open */}
                <div className="lg:hidden absolute right-0 flex items-center z-10">
                  <button
                    className="relative text-gray-600 hover:text-gray-900 transition-colors p-1.5 sm:p-2"
                    aria-label="Shopping cart"
                    onClick={openDrawer}
                  >
                    <ShoppingCart size={18} className="sm:w-5 sm:h-5" />
                    {totalQuantity > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                        {totalQuantity}
                      </span>
                    )}
                  </button>
                </div>
              </>
            )}

            {/* Desktop: Navigation & Icons */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 flex-1 justify-end">
              {!isSearchOpen ? (
                <>
                  {/* Desktop Navigation */}
                  <div className="flex items-center space-x-6 xl:space-x-8">
                    {navLinks.map((link) => (
                      link.isPage ? (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={`font-medium transition-all duration-300 relative py-4 cursor-pointer text-sm xl:text-base ${
                            activeLink === link.label
                              ? 'text-gray-900'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          {link.label}
                          {activeLink === link.label && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-700 to-gray-900"></div>
                          )}
                        </Link>
                      ) : (
                        <a
                          key={link.href}
                          href={link.href}
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveLink(link.label);
                            
                            // Check if we're on the home page
                            if (window.location.pathname === '/') {
                              // If on home page, just scroll to section
                              const element = document.querySelector(link.href);
                              if (element) {
                                element.scrollIntoView({ 
                                  behavior: 'smooth',
                                  block: 'start'
                                });
                              }
                            } else {
                              // If on other pages, navigate to home page with hash
                              window.location.href = `/${link.href}`;
                            }
                          }}
                          className={`font-medium transition-all duration-300 relative py-4 cursor-pointer text-sm xl:text-base ${
                            activeLink === link.label
                              ? 'text-gray-900'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          {link.label}
                          {activeLink === link.label && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-700 to-gray-900"></div>
                          )}
                        </a>
                      )
                    ))}
                  </div>

                  {/* Desktop: Search & Cart Icons */}
                  <div className="flex items-center space-x-4">
                    <button
                      className="text-gray-600 hover:text-gray-900 transition-colors p-2"
                      aria-label="Search"
                      onClick={() => setIsSearchOpen(true)}
                    >
                      <Search size={20} />
                    </button>
                    <button
                      className="relative text-gray-600 hover:text-gray-900 transition-colors p-2"
                      aria-label="Shopping cart"
                      onClick={openDrawer}
                    >
                      <ShoppingCart size={20} />
                      {totalQuantity > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                          {totalQuantity}
                        </span>
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div ref={searchContainerRef} className="flex-1 max-w-2xl relative">
                    {/* Search Bar */}
                    <div className="flex items-center bg-white border-2 border-gray-300 rounded-lg px-4 py-2 focus-within:border-gray-900 transition-colors">
                      <Search className="text-gray-400" size={20} />
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        className="flex-1 ml-3 bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
                      />
                      <button
                        onClick={() => setIsSearchOpen(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors ml-2"
                        aria-label="Close search"
                      >
                        <X size={20} />
                      </button>
                    </div>

                  {/* Search Results Dropdown */}
                  {searchQuery.trim() && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                      {filteredProducts.length === 0 ? (
                        <div className="px-4 py-8 text-center text-gray-500">
                          No products found
                        </div>
                      ) : (
                        filteredProducts.map((product) => (
                          <a
                            key={product.id}
                            href={`/products/${product.id}`}
                            data-product-link="true"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              console.log('Clicked product:', product.id);
                              setIsSearchOpen(false);
                              setSearchQuery('');
                              window.location.href = `/products/${product.id}`;
                            }}
                            className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 cursor-pointer"
                          >
                            <div className="relative w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                              {product.images && product.images.length > 0 ? (
                                <Image
                                  src={product.images[0]}
                                  alt={product.name}
                                  fill
                                  className="object-contain p-1"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                  {product.emoji || '📦'}
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-900 truncate">{product.name}</p>
                              <p className="text-xs text-gray-500 truncate">{product.tagline}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-gray-900">৳{product.price}</p>
                              {product.originalPrice && (
                                <p className="text-xs text-gray-400 line-through">৳{product.originalPrice}</p>
                              )}
                            </div>
                          </a>
                        ))
                      )}
                    </div>
                  )}
                </div>
                  {/* Desktop Cart Button when search is open */}
                  <div className="flex items-center">
                    <button
                      className="relative text-gray-600 hover:text-gray-900 transition-colors p-2"
                      aria-label="Shopping cart"
                      onClick={openDrawer}
                    >
                      <ShoppingCart size={20} />
                      {totalQuantity > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                          {totalQuantity}
                        </span>
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Navigation Overlay */}
            {isMobileMenuOpen && !isSearchOpen && (
              <>
                {/* Backdrop */}
                <div 
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                />
                
                {/* Mobile Menu */}
                <div 
                  ref={mobileMenuRef}
                  className={`fixed left-0 right-0 bg-white shadow-xl z-50 lg:hidden transition-transform duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
                  }`}
                  style={{ 
                    top: `${headerHeight}px`,
                    maxHeight: `calc(100vh - ${headerHeight}px)`
                  }}
                >
                  <div className="overflow-y-auto" style={{ 
                    maxHeight: `calc(100vh - ${headerHeight}px)`
                  }}>
                    <div className="px-4 sm:px-6 py-6 space-y-1">
                      {navLinks.map((link) => (
                        link.isPage ? (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => {
                              setActiveLink(link.label);
                              setIsMobileMenuOpen(false);
                            }}
                            className={`block font-medium transition-all duration-200 cursor-pointer py-3 px-4 rounded-lg text-base sm:text-lg ${
                              activeLink === link.label
                                ? 'text-gray-900 bg-gray-100'
                                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                          >
                            {link.label}
                          </Link>
                        ) : (
                          <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => {
                              e.preventDefault();
                              setActiveLink(link.label);
                              setIsMobileMenuOpen(false);
                              
                              // Check if we're on the home page
                              if (window.location.pathname === '/') {
                                // If on home page, just scroll to section
                                const element = document.querySelector(link.href);
                                if (element) {
                                  element.scrollIntoView({ 
                                    behavior: 'smooth',
                                    block: 'start'
                                  });
                                }
                              } else {
                                // If on other pages, navigate to home page with hash
                                window.location.href = `/${link.href}`;
                              }
                            }}
                            className={`block font-medium transition-all duration-200 cursor-pointer py-3 px-4 rounded-lg text-base sm:text-lg ${
                              activeLink === link.label
                                ? 'text-gray-900 bg-gray-100'
                                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                          >
                            {link.label}
                          </a>
                        )
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
    </>
  );
}

