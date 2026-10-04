'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { getCurrentUser, logout } from '@/lib/auth';
import { User } from '@/lib/types';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setUser(getCurrentUser());
  }, [pathname]);

  const handleLogout = () => {
    logout();
    setUser(null);
    router.push('/');
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📚</span>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              EduHub
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
              หน้าแรก
            </Link>
            {user?.role === 'teacher' && (
              <Link href="/admin" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
                จัดการบทความ
              </Link>
            )}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{user.avatar}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">
                      {user.role === 'teacher' ? 'อาจารย์' : 'นักศึกษา'}
                    </p>
                  </div>
                </div>
                <button onClick={handleLogout} className="btn-secondary text-sm !px-4 !py-2">
                  ออกจากระบบ
                </button>
              </>
            ) : (
              <Link href="/login" className="btn-primary text-sm !px-4 !py-2">
                เข้าสู่ระบบ
              </Link>
            )}
          </div>

          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 mt-2 pt-4 space-y-3">
            <Link href="/" className="block text-gray-600 hover:text-indigo-600 font-medium" onClick={() => setMenuOpen(false)}>
              หน้าแรก
            </Link>
            {user?.role === 'teacher' && (
              <Link href="/admin" className="block text-gray-600 hover:text-indigo-600 font-medium" onClick={() => setMenuOpen(false)}>
                จัดการบทความ
              </Link>
            )}
            {user ? (
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{user.avatar}</span>
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
                <button onClick={handleLogout} className="text-sm text-red-500 font-medium">
                  ออกจากระบบ
                </button>
              </div>
            ) : (
              <Link href="/login" className="block btn-primary text-center text-sm" onClick={() => setMenuOpen(false)}>
                เข้าสู่ระบบ
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
