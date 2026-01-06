'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X, ShoppingCart, Search } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('HOME');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [headerHeight, setHeaderHeight] = useState(56); // Default to mobile height (h-14 = 56px)
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const { totalQuantity, openDrawer } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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

  // Close mobile menu when user scrolls
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleScroll = () => {
      setIsMobileMenuOpen(false);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
    e.preventDefault();
    e.stopPropagation();
    setIsSearchOpen(false);
    setSearchQuery('');
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

  // Update active link based on current pathname
  useEffect(() => {
    // Determine active link based on current pathname
    if (pathname.startsWith('/products')) {
      // Handle both /products and /products/[id] pages
      setActiveLink('PRODUCTS');
    } else if (pathname === '/contact') {
      setActiveLink('CONTACT');
    } else if (pathname === '/') {
      // For home page, check hash or default to HOME
      const hash = window.location.hash;
      if (hash === '#about') {
        setActiveLink('ABOUT');
      } else if (hash === '#faq') {
        setActiveLink('FAQS');
      } else {
        setActiveLink('HOME');
      }
    } else {
      // For other pages, default to HOME
      setActiveLink('HOME');
    }
  }, [pathname]);

  // Handle hash changes on home page for section navigation
  useEffect(() => {
    if (pathname !== '/') return;

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#about') {
        setActiveLink('ABOUT');
      } else if (hash === '#faq') {
        setActiveLink('FAQS');
      } else if (hash === '#home' || !hash) {
        setActiveLink('HOME');
      }
    };

    // Check initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [pathname]);

  // Handle hash navigation from other pages
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash && window.location.pathname !== '/') {
        window.location.href = `/${hash}`;
      } else if (hash && window.location.pathname === '/') {
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
    // { href: '#reviews', label: 'REVIEWS', isPage: false },
    { href: '/products', label: 'PRODUCTS', isPage: true },
    { href: '#faq', label: 'FAQS', isPage: false },
    { href: '/contact', label: 'CONTACT', isPage: true },
  ];

  const handleNavClick = (link: { href: string; label: string; isPage: boolean }, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveLink(link.label);
    
    if (link.isPage) {
      window.location.href = link.href;
    } else {
      if (window.location.pathname === '/') {
        const element = document.querySelector(link.href);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      } else {
        window.location.href = `/${link.href}`;
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveLink('HOME');
    
    if (window.location.pathname === '/') {
      const element = document.querySelector('#home');
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      window.location.href = '/';
    }
  };

  return (
    <>
      <header 
        ref={headerRef} 
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm transition-all duration-300"
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px) saturate(180%)',
          WebkitBackdropFilter: 'blur(12px) saturate(180%)',
        }}
      >

        <nav className="w-full relative">
          <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8">
            <div className="flex items-center justify-between h-14 sm:h-16 md:h-20 lg:h-20 xl:h-24 relative">
              
              {/* Mobile: Hamburger Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden relative z-20 p-1.5 sm:p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 flex-shrink-0"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X size={18} className="sm:w-5 sm:h-5 text-gray-900" />
                ) : (
                  <Menu size={18} className="sm:w-5 sm:h-5 text-gray-900" />
                )}
              </button>

              {/* Logo - Centered on Mobile, Left on Desktop */}
              <a 
                href="#home" 
                onClick={handleLogoClick}
                className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:transform-none lg:mr-4 xl:mr-6 z-30 group cursor-pointer flex-shrink-0"
              >
                <div className="relative">
                  {/* Logo container with glassmorphism */}
                  <div className="relative transition-all duration-300 group-hover:scale-105">
                    <Image
                      src="https://res.cloudinary.com/dufzkjd0c/image/upload/v1764877604/Final_es4mgn.png"
                      alt="Giftwala Logo"
                      width={160}
                      height={64} 
                      className="h-7 sm:h-8 md:h-10 lg:h-12 xl:h-14 2xl:h-16 w-auto max-w-[140px] sm:max-w-[160px] md:max-w-[180px] lg:max-w-[200px]"
                      priority
                      quality={90}
                      sizes="(max-width: 375px) 120px, (max-width: 640px) 140px, (max-width: 768px) 160px, (max-width: 1024px) 180px, (max-width: 1280px) 200px, 220px"
                    />
                  </div>
                </div>
              </a>

              {/* Mobile: Right Side Icons */}
              {!isSearchOpen ? (
                <div className="lg:hidden flex items-center space-x-1.5 sm:space-x-2 z-20">
                  <button
                    className="relative p-2 sm:p-2.5 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 flex-shrink-0"
                    aria-label="Search"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsSearchOpen(true);
                    }}
                  >
                    <Search size={18} className="sm:w-5 sm:h-5 text-gray-900" />
                  </button>
                  <button
                    className="relative p-2 sm:p-2.5 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 flex-shrink-0"
                    aria-label="Shopping cart"
                    onClick={openDrawer}
                  >
                    <ShoppingCart size={18} className="sm:w-5 sm:h-5 text-gray-900" />
                    {totalQuantity > 0 && (
                      <span 
                        className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 text-white text-[9px] sm:text-[10px] font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center shadow-lg"
                        style={{ background: 'linear-gradient(to right, #1588D7, #0FB7B1)' }}
                      >
                        {totalQuantity > 99 ? '99+' : totalQuantity}
                      </span>
                    )}
                  </button>
                </div>
              ) : (
                <>
                  {/* Mobile Search Container */}
                  <div 
                    ref={searchContainerRef} 
                    className="lg:hidden absolute left-12 sm:left-14 md:left-16 right-14 sm:right-16 md:right-20 z-20"
                  >
                    <div className="flex items-center bg-white/95 backdrop-blur-md border-2 border-gray-200 rounded-full px-3 sm:px-4 py-2 sm:py-2.5 shadow-xl focus-within:border-amber-400 focus-within:shadow-amber-400/20 transition-all">
                      <Search className="text-gray-400 flex-shrink-0" size={16} style={{ width: '16px', height: '16px' }} />
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                          e.stopPropagation();
                          setSearchQuery(e.target.value);
                        }}
                        onFocus={(e) => e.stopPropagation()}
                        placeholder="Search products..."
                        className="flex-1 ml-2 sm:ml-3 bg-transparent outline-none text-gray-900 placeholder:text-gray-400 text-xs sm:text-sm"
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
                        className="text-gray-400 hover:text-gray-600 transition-colors ml-1 sm:ml-2 p-1 rounded-full hover:bg-gray-100 flex-shrink-0"
                        aria-label="Close search"
                      >
                        <X size={16} style={{ width: '16px', height: '16px' }} />
                      </button>
                    </div>

                    {/* Mobile Search Results */}
                    {searchQuery.trim() && (
                      <div className="absolute top-full left-0 right-0 mt-2 sm:mt-3 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-xl sm:rounded-2xl shadow-2xl max-h-72 sm:max-h-80 overflow-y-auto z-50">
                        {filteredProducts.length === 0 ? (
                          <div className="px-4 py-4 sm:py-6 text-center text-gray-500 text-xs sm:text-sm">
                            No products found
                          </div>
                        ) : (
                          filteredProducts.map((product) => (
                            <a
                              key={product.id}
                              href={`/products/${product.id}`}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsSearchOpen(false);
                                setSearchQuery('');
                                window.location.href = `/products/${product.id}`;
                              }}
                              className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 transition-all border-b border-gray-100 last:border-b-0 cursor-pointer group"
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'linear-gradient(to right, rgba(21, 136, 215, 0.1), rgba(15, 183, 177, 0.1))';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = '';
                              }}
                            >
                              <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0 group-hover:scale-110 transition-transform">
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
                                <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{product.name}</p>
                                <p className="text-[10px] sm:text-xs text-gray-500 truncate">{product.tagline}</p>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <p className="text-xs sm:text-sm font-bold text-gray-900">৳{product.price}</p>
                                {product.originalPrice && (
                                  <p className="text-[10px] sm:text-xs text-gray-400 line-through">৳{product.originalPrice}</p>
                                )}
                              </div>
                            </a>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Mobile Cart Button when search is open */}
                  <div className="lg:hidden z-20 flex-shrink-0">
                    <button
                      className="relative p-2 sm:p-2.5 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
                      aria-label="Shopping cart"
                      onClick={openDrawer}
                    >
                      <ShoppingCart size={18} className="sm:w-5 sm:h-5 text-gray-900" />
                      {totalQuantity > 0 && (
                        <span 
                        className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 text-white text-[9px] sm:text-[10px] font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center shadow-lg"
                        style={{ background: 'linear-gradient(to right, #1588D7, #0FB7B1)' }}
                      >
                          {totalQuantity > 99 ? '99+' : totalQuantity}
                        </span>
                      )}
                    </button>
                  </div>
                </>
              )}

              {/* Desktop: Navigation & Icons */}
              <div className="hidden lg:flex items-center space-x-2 xl:space-x-3 2xl:space-x-4 flex-1 justify-end min-w-0">
                {!isSearchOpen ? (
                  <>
                    {/* Desktop Navigation - Floating Pills */}
                    <div className="flex items-center space-x-0.5 xl:space-x-1 2xl:space-x-2 bg-white/60 backdrop-blur-md rounded-full px-1 xl:px-1.5 2xl:px-2 py-1 xl:py-1.5 2xl:py-2 shadow-lg border border-white/50 flex-shrink-0 overflow-hidden">
                      {navLinks.map((link) => (
                        link.isPage ? (
                          <Link
                            key={link.href}
                            href={link.href}
                            className={`relative px-2 xl:px-3 2xl:px-4 py-1.5 xl:py-2 rounded-full text-[10px] xl:text-xs 2xl:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                              activeLink === link.label
                                ? 'text-white shadow-lg scale-105'
                                : 'text-gray-700 hover:text-amber-600 hover:bg-white/80'
                            }`}
                            style={activeLink === link.label ? { background: 'linear-gradient(to right, #1588D7, #0FB7B1)' } : {}}
                          >
                            {link.label}
                            {activeLink === link.label && (
                              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                            )}
                          </Link>
                        ) : (
                          <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => handleNavClick(link, e)}
                            className={`relative px-2 xl:px-3 2xl:px-4 py-1.5 xl:py-2 rounded-full text-[10px] xl:text-xs 2xl:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                              activeLink === link.label
                                ? 'text-white shadow-lg scale-105'
                                : 'text-gray-700 hover:text-amber-600 hover:bg-white/80'
                            }`}
                            style={activeLink === link.label ? { background: 'linear-gradient(to right, #1588D7, #0FB7B1)' } : {}}
                          >
                            {link.label}
                            {activeLink === link.label && (
                              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                            )}
                          </a>
                        )
                      ))}
                    </div>

                    {/* Desktop: Search & Cart Icons */}
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <button
                        className="relative p-2.5 xl:p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 hover:shadow-xl"
                        aria-label="Search"
                        onClick={() => setIsSearchOpen(true)}
                      >
                        <Search size={18} className="xl:w-5 xl:h-5 text-gray-900" />
                      </button>
                      <button
                        className="relative p-2.5 xl:p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 hover:shadow-xl"
                        aria-label="Shopping cart"
                        onClick={openDrawer}
                      >
                        <ShoppingCart size={18} className="xl:w-5 xl:h-5 text-gray-900" />
                        {totalQuantity > 0 && (
                          <span 
                            className="absolute -top-1 -right-1 text-white text-[10px] xl:text-xs font-bold rounded-full w-4 h-4 xl:w-5 xl:h-5 flex items-center justify-center shadow-lg"
                            style={{ background: 'linear-gradient(to right, #1588D7, #0FB7B1)' }}
                          >
                            {totalQuantity > 99 ? '99+' : totalQuantity}
                          </span>
                        )}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div ref={searchContainerRef} className="flex-1 max-w-xl xl:max-w-2xl relative min-w-0">
                      {/* Desktop Search Bar */}
                      <div className="flex items-center bg-white/95 backdrop-blur-md border-2 border-gray-200 rounded-full px-4 xl:px-6 py-2.5 xl:py-3 shadow-xl focus-within:border-amber-400 focus-within:shadow-amber-400/20 transition-all">
                        <Search className="text-gray-400 flex-shrink-0" size={18} style={{ width: '18px', height: '18px' }} />
                        <input
                          ref={searchInputRef}
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search products..."
                          className="flex-1 ml-3 xl:ml-4 bg-transparent outline-none text-gray-900 placeholder:text-gray-400 text-sm xl:text-base min-w-0"
                        />
                        <button
                          onClick={() => setIsSearchOpen(false)}
                          className="text-gray-400 hover:text-gray-600 transition-colors ml-2 xl:ml-3 p-1 rounded-full hover:bg-gray-100 flex-shrink-0"
                          aria-label="Close search"
                        >
                          <X size={18} style={{ width: '18px', height: '18px' }} />
                        </button>
                      </div>

                      {/* Desktop Search Results */}
                      {searchQuery.trim() && (
                        <div className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl max-h-96 overflow-y-auto z-50">
                          {filteredProducts.length === 0 ? (
                            <div className="px-4 py-8 text-center text-gray-500 text-sm">
                              No products found
                            </div>
                          ) : (
                            filteredProducts.map((product) => (
                              <a
                                key={product.id}
                                href={`/products/${product.id}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setIsSearchOpen(false);
                                  setSearchQuery('');
                                  window.location.href = `/products/${product.id}`;
                                }}
                                className="flex items-center gap-3 xl:gap-4 px-4 py-3 transition-all border-b border-gray-100 last:border-b-0 cursor-pointer group"
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = 'linear-gradient(to right, rgba(21, 136, 215, 0.1), rgba(15, 183, 177, 0.1))';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = '';
                                }}
                              >
                                <div className="relative w-12 h-12 xl:w-14 xl:h-14 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 group-hover:scale-110 transition-transform">
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
                                <div className="text-right flex-shrink-0">
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
                    <div className="flex items-center flex-shrink-0">
                      <button
                        className="relative p-2.5 xl:p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 hover:shadow-xl"
                        aria-label="Shopping cart"
                        onClick={openDrawer}
                      >
                        <ShoppingCart size={18} className="xl:w-5 xl:h-5 text-gray-900" />
                        {totalQuantity > 0 && (
                          <span 
                            className="absolute -top-1 -right-1 text-white text-[10px] xl:text-xs font-bold rounded-full w-4 h-4 xl:w-5 xl:h-5 flex items-center justify-center shadow-lg"
                            style={{ background: 'linear-gradient(to right, #1588D7, #0FB7B1)' }}
                          >
                            {totalQuantity > 99 ? '99+' : totalQuantity}
                          </span>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Overlay */}
        {isMobileMenuOpen && !isSearchOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Mobile Menu - Side Drawer */}
            <div 
              ref={mobileMenuRef}
              className={`fixed top-0 left-0 h-full w-[280px] sm:w-80 bg-white z-50 lg:hidden shadow-2xl transition-transform duration-300 ease-out ${
                isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-white">
                <span className="font-bold text-base text-gray-900">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              {/* Menu Items */}
              <div className="overflow-y-auto h-[calc(100vh-64px)] bg-white">
                <nav className="py-2">
                  {navLinks.map((link) => (
                    link.isPage ? (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => {
                          setActiveLink(link.label);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`block px-5 py-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors ${
                          activeLink === link.label ? 'bg-blue-50 text-blue-600 font-semibold border-l-3' : ''
                        }`}
                        style={activeLink === link.label ? { borderLeftColor: '#1588D7', borderLeftWidth: '3px' } : {}}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => {
                          handleNavClick(link, e);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`block px-5 py-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors ${
                          activeLink === link.label ? 'bg-blue-50 text-blue-600 font-semibold border-l-3' : ''
                        }`}
                        style={activeLink === link.label ? { borderLeftColor: '#1588D7', borderLeftWidth: '3px' } : {}}
                      >
                        {link.label}
                      </a>
                    )
                  ))}
                </nav>
              </div>
            </div>
          </>
        )}
      </header>
      
      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-14 sm:h-16 md:h-20 lg:h-20 xl:h-24"></div>
    </>
  );
}
