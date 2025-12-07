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
  const [headerHeight, setHeaderHeight] = useState(80);
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
    { href: '#reviews', label: 'REVIEWS', isPage: false },
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/20 backdrop-blur-2xl shadow-2xl border-b border-white/20' 
            : 'bg-transparent'
        }`}
        style={isScrolled ? {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        } : {}}
      >
        {/* Curved bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-6 overflow-hidden pointer-events-none">
          <svg 
            className="absolute bottom-0 w-full h-full" 
            viewBox="0 0 1440 60" 
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M0,60 Q360,40 720,45 T1440,50 L1440,60 L0,60 Z" 
              fill={isScrolled ? 'rgba(255,255,255,0.1)' : 'transparent'}
              className="transition-all duration-500"
            />
          </svg>
        </div>

        {/* Floating decorative elements */}
        {!isScrolled && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-2 right-20 w-2 h-2 bg-amber-400 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute top-4 right-32 w-1.5 h-1.5 bg-red-500 rounded-full opacity-40 animate-pulse delay-300"></div>
            <div className="absolute top-6 right-44 w-1 h-1 bg-purple-400 rounded-full opacity-50 animate-pulse delay-700"></div>
          </div>
        )}

        <nav className="w-full relative">
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20 lg:h-24 relative">
              
              {/* Mobile: Hamburger Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden relative z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X size={22} className="text-gray-900" />
                ) : (
                  <Menu size={22} className="text-gray-900" />
                )}
              </button>

              {/* Logo - Floating Design */}
              <a 
                href="#home" 
                onClick={handleLogoClick}
                className="absolute left-1/2 transform -translate-x-1/2 lg:relative lg:left-0 lg:transform-none z-20 group cursor-pointer"
              >
                <div className="relative">
                  {/* Glow effect on hover */}
                  
                  {/* Logo container with glassmorphism */}
                  <div className="relative  transition-all duration-300 group-hover:scale-105">
                    <Image
                      src="https://res.cloudinary.com/dufzkjd0c/image/upload/v1764877604/Final_es4mgn.png"
                      alt="Giftwala Logo"
                      width={140}
                      height={56} 
                      className="h-8 sm:h-10 lg:h-12 w-auto"
                      priority
                      quality={90}
                      sizes="(max-width: 640px) 120px, (max-width: 1024px) 140px, 160px"
                    />
                  </div>
                </div>
              </a>

              {/* Mobile: Right Side Icons */}
              {!isSearchOpen ? (
                <div className="lg:hidden flex items-center space-x-2 z-20">
                  <button
                    className="relative p-2.5 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
                    aria-label="Search"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsSearchOpen(true);
                    }}
                  >
                    <Search size={20} className="text-gray-900" />
                  </button>
                  <button
                    className="relative p-2.5 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
                    aria-label="Shopping cart"
                    onClick={openDrawer}
                  >
                    <ShoppingCart size={20} className="text-gray-900" />
                    {totalQuantity > 0 && (
                      <span 
                        className="absolute -top-1 -right-1 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse"
                        style={{ background: 'linear-gradient(to right, #1588D7, #0FB7B1)' }}
                      >
                        {totalQuantity}
                      </span>
                    )}
                  </button>
                </div>
              ) : (
                <>
                  {/* Mobile Search Container */}
                  <div 
                    ref={searchContainerRef} 
                    className="lg:hidden absolute left-16 right-20 z-20"
                  >
                    <div className="flex items-center bg-white/95 backdrop-blur-md border-2 border-gray-200 rounded-full px-4 py-2.5 shadow-xl focus-within:border-amber-400 focus-within:shadow-amber-400/20 transition-all">
                      <Search className="text-gray-400" size={18} />
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
                        className="flex-1 ml-3 bg-transparent outline-none text-gray-900 placeholder:text-gray-400 text-sm"
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
                        className="text-gray-400 hover:text-gray-600 transition-colors ml-2 p-1 rounded-full hover:bg-gray-100"
                        aria-label="Close search"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    {/* Mobile Search Results */}
                    {searchQuery.trim() && (
                      <div className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl max-h-80 overflow-y-auto z-50">
                        {filteredProducts.length === 0 ? (
                          <div className="px-4 py-6 text-center text-gray-500 text-sm">
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
                              className="flex items-center gap-3 px-4 py-3 transition-all border-b border-gray-100 last:border-b-0 cursor-pointer group"
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'linear-gradient(to right, rgba(21, 136, 215, 0.1), rgba(15, 183, 177, 0.1))';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = '';
                              }}
                            >
                              <div className="relative w-12 h-12 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 group-hover:scale-110 transition-transform">
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
                  
                  {/* Mobile Cart Button when search is open */}
                  <div className="lg:hidden z-20">
                    <button
                      className="relative p-2.5 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
                      aria-label="Shopping cart"
                      onClick={openDrawer}
                    >
                      <ShoppingCart size={20} className="text-gray-900" />
                      {totalQuantity > 0 && (
                        <span 
                        className="absolute -top-1 -right-1 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse"
                        style={{ background: 'linear-gradient(to right, #1588D7, #0FB7B1)' }}
                      >
                          {totalQuantity}
                        </span>
                      )}
                    </button>
                  </div>
                </>
              )}

              {/* Desktop: Navigation & Icons */}
              <div className="hidden lg:flex items-center space-x-4 flex-1 justify-end">
                {!isSearchOpen ? (
                  <>
                    {/* Desktop Navigation - Floating Pills */}
                    <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-md rounded-full px-2 py-2 shadow-lg border border-white/50">
                      {navLinks.map((link) => (
                        link.isPage ? (
                          <Link
                            key={link.href}
                            href={link.href}
                            className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
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
                            className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
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
                    <div className="flex items-center space-x-2">
                      <button
                        className="relative p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 hover:shadow-xl"
                        aria-label="Search"
                        onClick={() => setIsSearchOpen(true)}
                      >
                        <Search size={20} className="text-gray-900" />
                      </button>
                      <button
                        className="relative p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 hover:shadow-xl"
                        aria-label="Shopping cart"
                        onClick={openDrawer}
                      >
                        <ShoppingCart size={20} className="text-gray-900" />
                        {totalQuantity > 0 && (
                          <span 
                            className="absolute -top-1 -right-1 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse"
                            style={{ background: 'linear-gradient(to right, #1588D7, #0FB7B1)' }}
                          >
                            {totalQuantity}
                          </span>
                        )}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div ref={searchContainerRef} className="flex-1 max-w-2xl relative">
                      {/* Desktop Search Bar */}
                      <div className="flex items-center bg-white/95 backdrop-blur-md border-2 border-gray-200 rounded-full px-6 py-3 shadow-xl focus-within:border-amber-400 focus-within:shadow-amber-400/20 transition-all">
                        <Search className="text-gray-400" size={20} />
                        <input
                          ref={searchInputRef}
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search products..."
                          className="flex-1 ml-4 bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
                        />
                        <button
                          onClick={() => setIsSearchOpen(false)}
                          className="text-gray-400 hover:text-gray-600 transition-colors ml-3 p-1 rounded-full hover:bg-gray-100"
                          aria-label="Close search"
                        >
                          <X size={20} />
                        </button>
                      </div>

                      {/* Desktop Search Results */}
                      {searchQuery.trim() && (
                        <div className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl max-h-96 overflow-y-auto z-50">
                          {filteredProducts.length === 0 ? (
                            <div className="px-4 py-8 text-center text-gray-500">
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
                                className="flex items-center gap-4 px-4 py-3 transition-all border-b border-gray-100 last:border-b-0 cursor-pointer group"
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = 'linear-gradient(to right, rgba(21, 136, 215, 0.1), rgba(15, 183, 177, 0.1))';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = '';
                                }}
                              >
                                <div className="relative w-14 h-14 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 group-hover:scale-110 transition-transform">
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
                        className="relative p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 hover:shadow-xl"
                        aria-label="Shopping cart"
                        onClick={openDrawer}
                      >
                        <ShoppingCart size={20} className="text-gray-900" />
                        {totalQuantity > 0 && (
                          <span 
                            className="absolute -top-1 -right-1 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse"
                            style={{ background: 'linear-gradient(to right, #1588D7, #0FB7B1)' }}
                          >
                            {totalQuantity}
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Mobile Menu - Floating Design */}
            <div 
              ref={mobileMenuRef}
              className={`fixed left-4 right-4 bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl z-50 lg:hidden transition-all duration-300 ease-out ${
                isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
              }`}
              style={{ 
                top: `${headerHeight + 16}px`,
                maxHeight: `calc(100vh - ${headerHeight + 32}px)`
              }}
            >
              <div className="overflow-y-auto rounded-3xl" style={{ 
                maxHeight: `calc(100vh - ${headerHeight + 32}px)`
              }}>
                <div className="px-6 py-8 space-y-2">
                  {navLinks.map((link) => (
                    link.isPage ? (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => {
                          setActiveLink(link.label);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`block font-medium transition-all duration-300 cursor-pointer py-4 px-6 rounded-2xl text-base ${
                          activeLink === link.label
                            ? 'text-white shadow-lg scale-105'
                            : 'text-gray-700 hover:text-amber-600 hover:bg-gray-50'
                        }`}
                        style={activeLink === link.label ? { background: 'linear-gradient(to right, #1588D7, #0FB7B1)' } : {}}
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
                        className={`block font-medium transition-all duration-300 cursor-pointer py-4 px-6 rounded-2xl text-base ${
                          activeLink === link.label
                            ? 'text-white shadow-lg scale-105'
                            : 'text-gray-700 hover:text-amber-600 hover:bg-gray-50'
                        }`}
                        style={activeLink === link.label ? { background: 'linear-gradient(to right, #1588D7, #0FB7B1)' } : {}}
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
      </header>
      
      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-20 lg:h-24"></div>
    </>
  );
}
