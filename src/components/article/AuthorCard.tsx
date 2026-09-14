import React from 'react';
import { Expert } from '../../types';
import { Award, CheckCircle2, BookOpen } from 'lucide-react';

interface AuthorCardProps {
  expert: Expert;
  className?: string;
}

export const AuthorCard: React.FC<AuthorCardProps> = ({ expert, className = '' }) => {
  return (
    <div className={`bg-gradient-to-br from-indigo-50/50 via-white to-slate-50 rounded-3xl border border-indigo-100/80 p-6 sm:p-7 shadow-sm ${className}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <img
          src={expert.avatar}
          alt={expert.name}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white shadow-md flex-shrink-0"
        />
        <div className="space-y-2 flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100/80 px-2.5 py-0.5 rounded-full">
              Biên tập viên / Chuyên gia
            </span>
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              {expert.experienceYears} năm kinh nghiệm
            </span>
          </div>

          <h4 className="font-extrabold text-slate-900 text-lg sm:text-xl">
            {expert.name}
          </h4>
          <p className="text-xs text-indigo-900 font-medium">
            {expert.role}
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            {expert.bio}
          </p>

          {/* Credentials */}
          <div className="pt-2 flex flex-wrap gap-2">
            {expert.credentials.map((cred, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-white border border-slate-200/80 px-2.5 py-1 rounded-lg"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                {cred}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
