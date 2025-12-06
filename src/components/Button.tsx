import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function Button({ 
  children, 
  href, 
  onClick, 
  className = '', 
  type = 'button',
  disabled = false 
}: ButtonProps) {
  const baseClasses = "px-4 py-2 relative rounded group overflow-hidden font-medium bg-gradient-to-r from-[#01B6A7] via-[#1086D2] to-[#01B6A7] text-white inline-block transition-all duration-200 ease-out";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";
  const combinedClasses = `${baseClasses} ${disabledClasses} ${className}`;

  const buttonContent = (
    <>
      <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-black group-hover:h-full opacity-20"></span>
      <span className="relative">{children}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
    >
      {buttonContent}
    </button>
  );
}
