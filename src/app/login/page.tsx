'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, USERS } from '@/lib/auth';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = login(username, password);
    if (user) {
      router.push(user.role === 'teacher' ? '/admin' : '/');
      router.refresh();
    } else {
      setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col md:flex-row bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Left side - Branding */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 bg-indigo-600 text-white rounded-b-[3rem] md:rounded-r-[4rem] md:rounded-bl-none shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm z-0"></div>
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl"></div>
        <div className="relative z-10 text-center max-w-md">
          <span className="text-6xl md:text-8xl drop-shadow-lg block mb-6 animate-bounce">📚</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">EduHub</h1>
          <p className="text-indigo-100 text-lg md:text-xl font-light">
            นวัตกรรมเพื่อการศึกษา เรียนรู้ แบ่งปัน และเติบโตไปด้วยกัน
          </p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md space-y-8 relative">
          
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/40">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">ยินดีต้อนรับกลับมา! 👋</h2>
              <p className="text-gray-500 text-sm">กรุณาเข้าสู่ระบบเพื่อใช้งานแพลตฟอร์ม</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                  ชื่อผู้ใช้
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-400">👤</span>
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-gray-50/50 hover:bg-gray-50"
                    placeholder="กรอกชื่อผู้ใช้..."
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                  รหัสผ่าน
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-400">🔒</span>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-gray-50/50 hover:bg-gray-50"
                    placeholder="กรอกรหัสผ่าน..."
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2 animate-pulse">
                  <span>❌</span> {error}
                </div>
              )}

              <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 active:translate-y-0">
                เข้าสู่ระบบ
              </button>
            </form>
          </div>

          <div className="bg-white/60 backdrop-blur-md p-5 rounded-2xl shadow-sm border border-white/50">
            <h3 className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider text-center">
              บัญชีสำหรับทดสอบระบบ
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {USERS.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-indigo-100 group"
                  onClick={() => {
                    setUsername(user.username);
                    setPassword(user.password);
                  }}
                >
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    {user.avatar}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.role === 'teacher' ? 'อาจารย์' : 'นักศึกษา'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
