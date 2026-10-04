import Link from 'next/link';
import { Article } from '@/lib/types';

const categoryColors: Record<string, string> = {
  'เทคโนโลยี': 'bg-blue-100 text-blue-700',
  'ทักษะการเรียนรู้': 'bg-green-100 text-green-700',
  'ทักษะชีวิต': 'bg-yellow-100 text-yellow-700',
  'วิทยาศาสตร์': 'bg-purple-100 text-purple-700',
  'คณิตศาสตร์': 'bg-red-100 text-red-700',
  'ภาษา': 'bg-pink-100 text-pink-700',
  'ทั่วไป': 'bg-gray-100 text-gray-700',
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function ArticleCard({ article }: { article: Article }) {
  const colorClass = categoryColors[article.category] || 'bg-gray-100 text-gray-700';

  return (
    <Link href={`/articles/${article.id}`}>
      <div className="card group cursor-pointer h-full flex flex-col">
        <div className="h-40 bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300">
          {article.coverEmoji}
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span className={`badge ${colorClass}`}>{article.category}</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">
            {article.summary}
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-400 pt-3 border-t border-gray-50">
            <span>{article.authorName}</span>
            <span>•</span>
            <span>{formatDate(article.createdAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
