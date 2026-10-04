'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { createArticle, getArticle, updateArticle, initializeStore } from '@/lib/store';
import { User } from '@/lib/types';

const CATEGORIES = ['เทคโนโลยี', 'ทักษะการเรียนรู้', 'ทักษะชีวิต', 'วิทยาศาสตร์', 'คณิตศาสตร์', 'ภาษา', 'ทั่วไป'];
const EMOJIS = ['📚', '💻', '🧠', '🔬', '📐', '🌍', '🎨', '📊', '🤖', '⏰', '💡', '🎯', '🐍', '📱', '🎓'];

function CreateArticleForm() {
  const [user, setUser] = useState<User | null>(null);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [coverEmoji, setCoverEmoji] = useState('📚');
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    initializeStore();
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'teacher') {
      router.push('/login');
      return;
    }
    setUser(currentUser);

    const id = searchParams.get('id');
    if (id) {
      const article = getArticle(id);
      if (article) {
        setIsEdit(true);
        setEditId(id);
        setTitle(article.title);
        setSummary(article.summary);
        setContent(article.content);
        setCategory(article.category);
        setCoverEmoji(article.coverEmoji);
      }
    }
  }, [router, searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (isEdit && editId) {
      updateArticle(editId, { title, summary, content, category, coverEmoji });
    } else {
      createArticle({
        title,
        summary,
        content,
        category,
        coverEmoji,
        authorId: user.id,
        authorName: user.name,
      });
    }

    router.push('/admin');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {isEdit ? '✏️ แก้ไขบทความ' : '📝 สร้างบทความใหม่'}
        </h1>
        <p className="text-gray-500 mt-1">
          {isEdit ? 'แก้ไขเนื้อหาบทความ' : 'เพิ่มเนื้อหาการเรียนรู้ใหม่สำหรับนักศึกษา'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ไอคอนหน้าปก</label>
          <div className="flex flex-wrap gap-2">
            {EMOJIS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setCoverEmoji(emoji)}
                className={`w-12 h-12 text-2xl rounded-xl flex items-center justify-center transition-all ${
                  coverEmoji === emoji
                    ? 'bg-indigo-100 ring-2 ring-indigo-500 scale-110'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">หัวข้อบทความ *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
            placeholder="เช่น การเรียนรู้ Python เบื้องต้น"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">สรุปย่อ *</label>
          <input
            type="text"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="input-field"
            placeholder="อธิบายสั้นๆ เกี่ยวกับบทความนี้"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">หมวดหมู่ *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">เนื้อหา * (รองรับ Markdown)</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="textarea-field min-h-[300px] font-mono text-sm"
            placeholder={'เขียนเนื้อหาบทความที่นี่...\n\n## หัวข้อ\nเนื้อหา...\n\n### หัวข้อย่อย\n- รายการ 1\n- รายการ 2'}
            required
          />
          <p className="text-xs text-gray-400 mt-1">
            💡 สามารถใช้ Markdown ในการจัดรูปแบบ เช่น ## สำหรับหัวข้อ, **ตัวหนา**, `โค้ด`
          </p>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <button type="submit" className="btn-primary">
            {isEdit ? '💾 บันทึกการแก้ไข' : '🚀 เผยแพร่บทความ'}
          </button>
          <button type="button" onClick={() => router.back()} className="btn-secondary">
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  );
}

export default function CreateArticlePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-4xl animate-bounce">⏳</div>
        </div>
      }
    >
      <CreateArticleForm />
    </Suspense>
  );
}
