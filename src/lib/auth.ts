import { User } from './types';

export const USERS: User[] = [
  {
    id: 'teacher1',
    username: 'teacher',
    password: '1234',
    name: 'อ.สมชาย ใจดี',
    role: 'teacher',
    avatar: '👨‍🏫',
  },
  {
    id: 'teacher2',
    username: 'teacher2',
    password: '1234',
    name: 'อ.วิชัย รักเรียน',
    role: 'teacher',
    avatar: '👩‍🏫',
  },
  {
    id: 'student1',
    username: 'student',
    password: '1234',
    name: 'นศ.สมหญิง เรียนดี',
    role: 'student',
    avatar: '👩‍🎓',
  },
  {
    id: 'student2',
    username: 'student2',
    password: '1234',
    name: 'นศ.สมชาย ตั้งใจ',
    role: 'student',
    avatar: '👨‍🎓',
  },
];

const AUTH_KEY = 'edu_hub_current_user';

export function login(username: string, password: string): User | null {
  const user = USERS.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    }
    return user;
  }
  return null;
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_KEY);
  }
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(AUTH_KEY);
  if (data) {
    try {
      return JSON.parse(data) as User;
    } catch {
      return null;
    }
  }
  return null;
}

export function isTeacher(): boolean {
  const user = getCurrentUser();
  return user?.role === 'teacher';
}

export function isStudent(): boolean {
  const user = getCurrentUser();
  return user?.role === 'student';
}
