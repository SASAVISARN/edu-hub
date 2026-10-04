export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  role: 'student' | 'teacher';
  avatar: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  summary: string;
  category: string;
  authorId: string;
  authorName: string;
  coverEmoji: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  articleId: string;
  userId: string;
  userName: string;
  userRole: 'student' | 'teacher';
  userAvatar: string;
  content: string;
  parentId: string | null;
  createdAt: string;
}
