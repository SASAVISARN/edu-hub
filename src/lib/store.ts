import { Article, Comment } from './types';
import { SEED_ARTICLES, SEED_COMMENTS } from './seed-data';

const ARTICLES_KEY = 'edu_hub_articles';
const COMMENTS_KEY = 'edu_hub_comments';
const INIT_KEY = 'edu_hub_initialized';

function isClient(): boolean {
  return typeof window !== 'undefined';
}

export function initializeStore(): void {
  if (!isClient()) return;
  if (!localStorage.getItem(INIT_KEY)) {
    localStorage.setItem(ARTICLES_KEY, JSON.stringify(SEED_ARTICLES));
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(SEED_COMMENTS));
    localStorage.setItem(INIT_KEY, 'true');
  }
}

export function getArticles(): Article[] {
  if (!isClient()) return [];
  const data = localStorage.getItem(ARTICLES_KEY);
  return data ? JSON.parse(data) : [];
}

export function getArticle(id: string): Article | undefined {
  return getArticles().find((a) => a.id === id);
}

export function createArticle(data: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>): Article {
  const articles = getArticles();
  const newArticle: Article = {
    ...data,
    id: `article_${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  articles.unshift(newArticle);
  localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles));
  return newArticle;
}

export function updateArticle(id: string, data: Partial<Article>): Article | undefined {
  const articles = getArticles();
  const index = articles.findIndex((a) => a.id === id);
  if (index === -1) return undefined;
  articles[index] = {
    ...articles[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles));
  return articles[index];
}

export function deleteArticle(id: string): void {
  const articles = getArticles().filter((a) => a.id !== id);
  localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles));
  const allComments = getAllComments().filter((c) => c.articleId !== id);
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(allComments));
}

function getAllComments(): Comment[] {
  if (!isClient()) return [];
  const data = localStorage.getItem(COMMENTS_KEY);
  return data ? JSON.parse(data) : [];
}

export function getComments(articleId: string): Comment[] {
  return getAllComments().filter((c) => c.articleId === articleId);
}

export function createComment(data: Omit<Comment, 'id' | 'createdAt'>): Comment {
  const comments = getAllComments();
  const newComment: Comment = {
    ...data,
    id: `comment_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  comments.push(newComment);
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
  return newComment;
}

export function deleteComment(id: string): void {
  const comments = getAllComments();
  const idsToDelete = new Set<string>();
  idsToDelete.add(id);
  let found = true;
  while (found) {
    found = false;
    for (const c of comments) {
      if (c.parentId && idsToDelete.has(c.parentId) && !idsToDelete.has(c.id)) {
        idsToDelete.add(c.id);
        found = true;
      }
    }
  }
  const remaining = comments.filter((c) => !idsToDelete.has(c.id));
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(remaining));
}
