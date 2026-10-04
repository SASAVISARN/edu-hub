import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'EduHub - แหล่งเรียนรู้ออนไลน์',
  description: 'แพลตฟอร์มการเรียนรู้ออนไลน์สำหรับนักศึกษาและอาจารย์ - นวัตกรรมเพื่อการศึกษา',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>
        <Navbar />
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        <footer className="bg-gray-900 text-gray-400 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-lg font-bold text-white mb-2">📚 EduHub</p>
            <p className="text-sm">แพลตฟอร์มการเรียนรู้ออนไลน์ - นวัตกรรมเพื่อการศึกษา</p>
            <p className="text-xs mt-4">© 2024 EduHub. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
