'use client';

import { useState, useEffect } from 'react';
import { Article } from '@/lib/types';
import { getArticles, initializeStore } from '@/lib/store';
import ArticleCard from '@/components/ArticleCard';

const categories = ['ทั้งหมด', 'เทคโนโลยี', 'ทักษะการเรียนรู้', 'ทักษะชีวิต', 'วิทยาศาสตร์', 'คณิตศาสตร์', 'ภาษา', 'ทั่วไป'];

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');

  useEffect(() => {
    initializeStore();
    setArticles(getArticles());
  }, []);

  const filteredArticles = articles.filter((article) => {
    const matchSearch =
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.summary.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      selectedCategory === 'ทั้งหมด' || article.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div>
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">📚 EduHub</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-4">
              แหล่งเรียนรู้ออนไลน์สำหรับนักศึกษา
            </p>
            <p className="text-white/70 mb-8">
              นวัตกรรมเพื่อการศึกษา - เรียนรู้ แบ่งปัน และเติบโตไปด้วยกัน
            </p>
            <div className="max-w-xl mx-auto">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="🔍 ค้นหาบทความ..."
                className="w-full px-6 py-4 rounded-2xl text-gray-900 bg-white/95 backdrop-blur-sm shadow-xl focus:outline-none focus:ring-4 focus:ring-white/30 text-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-6xl mb-4">📭</p>
            <p className="text-gray-500 text-lg">ไม่พบบทความที่ค้นหา</p>
          </div>
        )}
      </div>
    </div>
  );
}
