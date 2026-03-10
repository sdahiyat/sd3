'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  const isAdvisorRoute = pathname?.startsWith('/dashboard');
  const isClientRoute = pathname?.startsWith('/client-portal');

  if (pathname === '/') return null; // Hide navbar on home page

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-blue-600">Quick Sheets</span>
            </Link>
            
            {isAdvisorRoute && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/dashboard"
                  className={`${
                    pathname === '/dashboard'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Clients
                </Link>
              </div>
            )}
            
            {isClientRoute && (
              <div className="ml-6">
                <span className="text-sm text-gray-500">Client Portal</span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {isAdvisorRoute && (
              <div className="hidden sm:flex sm:items-center">
                <span className="text-sm text-gray-700 mr-3">Welcome, Advisor</span>
                <button className="text-gray-500 hover:text-gray-700 text-sm">
                  Sign Out
                </button>
              </div>
            )}
            
            {isClientRoute && (
              <div className="hidden sm:flex sm:items-center">
                <button className="text-gray-500 hover:text-gray-700 text-sm">
                  Sign Out
                </button>
              </div>
            )}

            {!isAdvisorRoute && !isClientRoute && (
              <div className="flex space-x-4">
                <Link
                  href="/auth/login"
                  className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
