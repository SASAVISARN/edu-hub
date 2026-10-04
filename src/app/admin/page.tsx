'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { getArticles, deleteArticle, initializeStore } from '@/lib/store';
import { Article, User } from '@/lib/types';

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    initializeStore();
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'teacher') {
      router.push('/login');
      return;
    }
    setUser(currentUser);
    setArticles(getArticles());
    setLoading(false);
  }, [router]);

  const handleDelete = (id: string, title: string) => {
    if (confirm(`คุณต้องการลบบทความ "${title}" ใช่หรือไม่?`)) {
      deleteArticle(id);
      setArticles(getArticles());
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-bounce">⏳</div>
          <p className="text-gray-500">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  const myArticles = articles.filter((a) => a.authorId === user?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">📊 แดชบอร์ดอาจารย์</h1>
          <p className="text-gray-500 mt-1">จัดการบทความและเนื้อหาการเรียนรู้</p>
        </div>
        <Link href="/admin/create" className="btn-primary">
          ✏️ สร้างบทความใหม่
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="card p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-2xl">📝</div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{myArticles.length}</p>
              <p className="text-sm text-gray-500">บทความของฉัน</p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">📚</div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{articles.length}</p>
              <p className="text-sm text-gray-500">บทความทั้งหมด</p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">👨‍🏫</div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{user?.name}</p>
              <p className="text-sm text-gray-500">ผู้ใช้งาน</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">บทความของฉัน</h2>
        </div>
        {myArticles.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {myArticles.map((article) => (
              <div
                key={article.id}
                className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-4 flex-1">
                  <span className="text-3xl">{article.coverEmoji}</span>
                  <div>
                    <Link
                      href={`/articles/${article.id}`}
                      className="font-medium text-gray-900 hover:text-indigo-600 transition-colors"
                    >
                      {article.title}
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="badge bg-blue-100 text-blue-700 text-xs">{article.category}</span>
                      <span className="text-xs text-gray-400">{formatDate(article.createdAt)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/admin/create?id=${article.id}`} className="btn-secondary text-sm !px-3 !py-1.5">
                    ✏️ แก้ไข
                  </Link>
                  <button
                    onClick={() => handleDelete(article.id, article.title)}
                    className="btn-danger text-sm !px-3 !py-1.5"
                  >
                    🗑️ ลบ
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="text-4xl mb-4">📝</p>
            <p className="text-gray-500">ยังไม่มีบทความ</p>
            <Link href="/admin/create" className="btn-primary mt-4 inline-block">สร้างบทความแรก</Link>
          </div>
        )}
      </div>
    </div>
  );
}
