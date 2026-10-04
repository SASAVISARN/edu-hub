'use client';

import { useState, useEffect } from 'react';
import { Comment, User } from '@/lib/types';
import { getCurrentUser } from '@/lib/auth';
import { getComments, createComment } from '@/lib/store';

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function CommentItem({
  comment,
  replies,
  onReply,
  depth = 0,
}: {
  comment: Comment;
  replies: Comment[];
  onReply: (parentId: string) => void;
  depth?: number;
}) {
  return (
    <div className={`${depth > 0 ? 'ml-8 border-l-2 border-indigo-100 pl-4' : ''}`}>
      <div className="py-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">{comment.userAvatar}</span>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="font-medium text-gray-900">{comment.userName}</span>
              <span
                className={`badge text-xs ${
                  comment.userRole === 'teacher'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {comment.userRole === 'teacher' ? 'อาจารย์' : 'นักศึกษา'}
              </span>
              <span className="text-xs text-gray-400">{formatDate(comment.createdAt)}</span>
            </div>
            <p className="text-gray-700 leading-relaxed">{comment.content}</p>
            <button
              onClick={() => onReply(comment.id)}
              className="text-sm text-indigo-500 hover:text-indigo-700 mt-2 font-medium"
            >
              ตอบกลับ
            </button>
          </div>
        </div>
      </div>
      {replies.map((reply) => (
        <CommentItem
          key={reply.id}
          comment={reply}
          replies={[]}
          onReply={onReply}
          depth={depth + 1}
        />
      ))}
    </div>
  );
}

export default function CommentSection({ articleId }: { articleId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
    setComments(getComments(articleId));
  }, [articleId]);

  const handleSubmitComment = () => {
    if (!newComment.trim() || !user) return;
    createComment({
      articleId,
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      userAvatar: user.avatar,
      content: newComment.trim(),
      parentId: null,
    });
    setNewComment('');
    setComments(getComments(articleId));
  };

  const handleSubmitReply = (parentId: string) => {
    if (!replyContent.trim() || !user) return;
    createComment({
      articleId,
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      userAvatar: user.avatar,
      content: replyContent.trim(),
      parentId,
    });
    setReplyContent('');
    setReplyTo(null);
    setComments(getComments(articleId));
  };

  const topLevelComments = comments.filter((c) => !c.parentId);
  const getReplies = (commentId: string) =>
    comments.filter((c) => c.parentId === commentId);

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        💬 ความคิดเห็น
        <span className="text-sm font-normal text-gray-400">({comments.length})</span>
      </h3>

      {user ? (
        <div className="mb-8 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-start gap-3">
            <span className="text-2xl">{user.avatar}</span>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="เขียนความคิดเห็น..."
                className="textarea-field min-h-[80px]"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim()}
                  className="btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  แสดงความคิดเห็น
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-8 p-6 bg-gray-50 rounded-xl text-center">
          <p className="text-gray-500">
            กรุณา{' '}
            <a href="/login" className="text-indigo-600 font-medium hover:underline">
              เข้าสู่ระบบ
            </a>{' '}
            เพื่อแสดงความคิดเห็น
          </p>
        </div>
      )}

      <div className="divide-y divide-gray-100">
        {topLevelComments.length === 0 ? (
          <div className="py-8 text-center text-gray-400">
            ยังไม่มีความคิดเห็น เป็นคนแรกที่แสดงความคิดเห็น!
          </div>
        ) : (
          topLevelComments.map((comment) => (
            <div key={comment.id}>
              <CommentItem
                comment={comment}
                replies={getReplies(comment.id)}
                onReply={(parentId) => {
                  setReplyTo(parentId === replyTo ? null : parentId);
                  setReplyContent('');
                }}
              />
              {replyTo === comment.id && user && (
                <div className="ml-12 mb-4 p-3 bg-indigo-50 rounded-xl">
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="เขียนคำตอบ..."
                    className="textarea-field min-h-[60px] text-sm"
                    rows={2}
                    autoFocus
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={() => setReplyTo(null)}
                      className="btn-secondary text-sm !px-3 !py-1.5"
                    >
                      ยกเลิก
                    </button>
                    <button
                      onClick={() => handleSubmitReply(comment.id)}
                      disabled={!replyContent.trim()}
                      className="btn-primary text-sm !px-3 !py-1.5 disabled:opacity-50"
                    >
                      ตอบกลับ
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
