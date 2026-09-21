import React from 'react';
import { optimizeImageUrl, formatVideoEmbedUrl } from '../../utils/mediaOptimizer';
import { AlertCircle, CheckCircle, Info, Lightbulb } from 'lucide-react';

interface ArticleContentRendererProps {
  content: string;
  className?: string;
}

export const ArticleContentRenderer: React.FC<ArticleContentRendererProps> = ({ content, className = '' }) => {
  if (!content) {
    return <p className="text-slate-400 italic">Chưa có nội dung bài viết.</p>;
  }

  // Check if content is HTML (contains HTML tags like <p>, <h2>, <div>, <img>, <ul>, etc.)
  const isHtml = /<[a-z][\s\S]*>/i.test(content);

  if (isHtml) {
    return (
      <div
        className={`article-content-prose space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base ${className}`}
        dangerouslySetInnerHTML={{ __html: formatArticleHtml(content) }}
      />
    );
  }

  // Fallback for markdown-like plain text paragraphs
  const paragraphs = content.split('\n\n').filter((p) => p.trim());

  return (
    <div className={`space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base ${className}`}>
      {paragraphs.map((para, idx) => {
        // Markdown image: ![caption](url)
        const imgMatch = para.match(/^!\[(.*?)\]\((.*?)\)$/);
        if (imgMatch) {
          const caption = imgMatch[1];
          const url = optimizeImageUrl(imgMatch[2], { width: 1000, quality: 80 });
          return (
            <figure key={idx} className="my-6 mx-auto flex flex-col items-center max-w-2xl">
              <img
                src={url}
                alt={caption || 'Hình ảnh bài viết'}
                loading="lazy"
                className="w-full max-h-[480px] object-cover rounded-2xl shadow-md border border-slate-200/80"
              />
              {caption && (
                <figcaption className="text-xs text-slate-500 italic text-center pt-2 px-4">
                  {caption}
                </figcaption>
              )}
            </figure>
          );
        }

        // Markdown heading # or ##
        if (para.startsWith('### ')) {
          return (
            <h4 key={idx} className="text-base font-bold text-slate-900 pt-3">
              {para.replace('### ', '')}
            </h4>
          );
        }
        if (para.startsWith('## ')) {
          return (
            <h3 key={idx} className="text-lg sm:text-xl font-extrabold text-slate-900 pt-4 border-b border-slate-100 pb-2">
              {para.replace('## ', '')}
            </h3>
          );
        }
        if (para.startsWith('# ')) {
          return (
            <h2 key={idx} className="text-xl sm:text-2xl font-black text-slate-900 pt-5">
              {para.replace('# ', '')}
            </h2>
          );
        }

        return (
          <p key={idx} className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-100 leading-relaxed">
            {para}
          </p>
        );
      })}
    </div>
  );
};

function formatArticleHtml(rawHtml: string): string {
  let html = rawHtml;

  // Enhance video links or iframes with responsive wrappers
  html = html.replace(/<iframe\b([^>]*)src="([^"]+)"([^>]*)><\/iframe>/gi, (_match, before, src, after) => {
    const embedUrl = formatVideoEmbedUrl(src);
    return `<div class="my-6 aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-200">
      <iframe src="${embedUrl}" class="w-full h-full" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen ${before} ${after}></iframe>
    </div>`;
  });

  return html;
}
