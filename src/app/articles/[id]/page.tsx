'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getArticle, initializeStore } from '@/lib/store';
import { Article } from '@/lib/types';
import CommentSection from '@/components/CommentSection';

function renderMarkdown(text: string): string {
  let html = text;

  // Code blocks
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_: string, __: string, code: string) => {
    return `<pre class="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto my-4 text-sm"><code>${code.trim()}</code></pre>`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>');

  // Headings
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold mt-6 mb-3 text-gray-900">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-8 mb-4 text-gray-900 pb-2 border-b border-gray-100">$1</h2>');

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold">$1</strong>');

  // Lists
  html = html.replace(/^- (.+)$/gm, '<li class="ml-6 list-disc my-1">$1</li>');

  // Paragraphs
  const blocks = html.split('\n\n');
  html = blocks
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return '';
      if (
        trimmed.startsWith('<h') ||
        trimmed.startsWith('<pre') ||
        trimmed.startsWith('<li') ||
        trimmed.startsWith('<ul')
      ) {
        return trimmed;
      }
      return `<p class="my-3 leading-relaxed text-gray-700">${trimmed.replace(/\n/g, '<br/>')}</p>`;
    })
    .join('\n');

  return html;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function ArticleDetailPage({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeStore();
    const found = getArticle(params.id);
    setArticle(found || null);
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl animate-bounce">⏳</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">😕</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">ไม่พบบทความ</h2>
          <p className="text-gray-500 mb-4">บทความที่คุณค้นหาอาจถูกลบหรือไม่มีอยู่</p>
          <Link href="/" className="btn-primary">กลับหน้าแรก</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/"
            className="text-indigo-600 hover:text-indigo-700 font-medium text-sm mb-4 inline-flex items-center gap-1"
          >
            ← กลับหน้าแรก
          </Link>
          <div className="mt-4">
            <span className="text-6xl">{article.coverEmoji}</span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-4">
              {article.title}
            </h1>
            <p className="text-gray-600 text-lg mb-6">{article.summary}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="badge bg-indigo-100 text-indigo-700">{article.category}</span>
              <span>✍️ {article.authorName}</span>
              <span>📅 {formatDate(article.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card p-8">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(article.content) }}
          />
        </div>

        <CommentSection articleId={article.id} />
      </div>
    </div>
  );
}
