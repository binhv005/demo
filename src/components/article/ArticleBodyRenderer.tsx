import React from 'react';
import { ArticleBlock } from '../../types';
import { optimizeImageUrl, formatVideoEmbedUrl } from '../../utils/mediaOptimizer';
import {
  Quote as QuoteIcon,
  Code2,
  Copy,
  Check,
  Lightbulb,
  AlertTriangle,
  Info,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface ArticleBodyRendererProps {
  blocks?: ArticleBlock[];
  content?: string;
  className?: string;
}

function formatRichText(raw: string | undefined): string {
  if (!raw) return '';
  let text = raw
    // Clean nested/duplicate align divs
    .replace(/<div align="(?:left|center|right)"[^>]*>\s*<div align="(?:left|center|right)"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/gi, '<div class="text-center my-1">$1</div>')
    .replace(/<div[^>]*style="[^"]*text-align:\s*center[^"]*"[^>]*>([\s\S]*?)<\/div>/gi, '<div class="text-center my-1">$1</div>')
    .replace(/<div[^>]*style="[^"]*text-align:\s*right[^"]*"[^>]*>([\s\S]*?)<\/div>/gi, '<div class="text-right my-1">$1</div>')
    .replace(/<div[^>]*style="[^"]*text-align:\s*left[^"]*"[^>]*>([\s\S]*?)<\/div>/gi, '$1')
    .replace(/<div align="left"[^>]*>([\s\S]*?)<\/div>/gi, '$1')
    .replace(/<div align="center"[^>]*>([\s\S]*?)<\/div>/gi, '<div class="text-center my-1">$1</div>')
    .replace(/<div align="right"[^>]*>([\s\S]*?)<\/div>/gi, '<div class="text-right my-1">$1</div>');

  // Format list tags to guarantee proper indentation inside
  text = text
    .replace(/<ul\b([^>]*)>/gi, '<ul class="my-3 space-y-1.5 list-disc list-outside ml-6 pl-1 text-slate-800" $1>')
    .replace(/<ol\b([^>]*)>/gi, '<ol class="my-3 space-y-1.5 list-decimal list-outside ml-6 pl-1 text-slate-800" $1>')
    .replace(/<li\b([^>]*)>/gi, '<li class="leading-relaxed pl-1" $1>');

  return text
    // Embedded images: ![caption](url) or ![caption|width](url)
    .replace(/!\[(.*?)(?:\|(.*?))?\]\((.*?)\)/g, (_, caption, sizeParam, url) => {
      const cleanCaption = caption ? caption.trim() : '';
      const customWidth = sizeParam ? sizeParam.trim() : '100%';
      const optimizedUrl = optimizeImageUrl(url, { width: 1000, quality: 80 });
      return `<figure class="my-6 mx-auto flex flex-col items-center" style="width: ${customWidth}; max-width: 100%;">
        <img src="${optimizedUrl}" alt="${cleanCaption || 'Hình ảnh bài viết'}" loading="lazy" decoding="async" class="w-full max-h-[520px] object-cover rounded-2xl transition-transform duration-500 hover:scale-[1.005] block mx-auto shadow-md border border-slate-200/80" />
        ${cleanCaption ? `<figcaption class="w-full text-xs text-slate-500 italic text-center pt-2.5 px-4">${cleanCaption}</figcaption>` : ''}
      </figure>`;
    })
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
    .replace(/(?<!\*)\*(?!\*)([^\*]+?)(?<!\*)\*(?!\*)/g, '<em class="italic">$1</em>')
    .replace(/~~(.*?)~~/g, '<del class="line-through opacity-75">$1</del>')
    .replace(/<u>(.*?)<\/u>/gi, '<u class="underline">$1</u>')
    .replace(/<mark>(.*?)<\/mark>/gi, '<mark class="bg-amber-100 text-amber-900 px-1 rounded font-medium">$1</mark>')
    .replace(/`([^`]+)`/g, '<code class="bg-slate-100 text-orange-600 px-1.5 py-0.5 rounded text-xs font-mono border border-slate-200">$1</code>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-orange-600 hover:underline font-semibold">$1</a>');
}

export const ArticleBodyRenderer: React.FC<ArticleBodyRendererProps> = ({
  blocks,
  content,
  className = ''
}) => {
  const [copiedCodeId, setCopiedCodeId] = React.useState<string | null>(null);

  const handleCopyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  // Case 1: Article has structured blocks (Project A Word-like blocks)
  if (blocks && Array.isArray(blocks) && blocks.length > 0) {
    return (
      <div className={`space-y-6 text-slate-800 text-sm sm:text-base leading-relaxed font-normal ${className}`}>
        {blocks.map((block, idx) => {
          const key = block.id || `block-${idx}`;

          // 1. HEADING
          if (block.type === 'heading') {
            const level = block.level || 2;
            const alignClass =
              block.align === 'center'
                ? 'text-center justify-center'
                : block.align === 'right'
                ? 'text-right justify-end'
                : 'text-left';

            const Tag = level === 1 ? 'h1' : level === 3 ? 'h3' : level === 4 ? 'h4' : 'h2';
            const sizeClass =
              level === 1
                ? 'text-2xl sm:text-3xl font-black'
                : level === 3
                ? 'text-lg sm:text-xl font-bold'
                : level === 4
                ? 'text-base font-bold'
                : 'text-xl sm:text-2xl font-extrabold';

            const cleanText = (block.text || '').replace(/<[^>]+>/g, '').trim();
            const headingSlug = cleanText
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/đ/g, 'd')
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '');
            const headingId = block.id || headingSlug || `heading-${idx}`;

            return (
              <Tag
                key={key}
                id={headingId}
                className={`${sizeClass} scroll-mt-28 text-slate-900 tracking-tight flex items-center gap-3 border-b border-slate-200/80 pb-3 mt-8 ${alignClass}`}
                style={{
                  color: block.color || undefined,
                  lineHeight: block.lineHeight || undefined,
                  fontSize: block.fontSize || undefined
                }}
              >
                <span className="text-orange-500 font-mono text-lg font-black">
                  {String(idx + 1).padStart(2, '0')}.
                </span>
                <span dangerouslySetInnerHTML={{ __html: formatRichText(block.text) }} />
              </Tag>
            );
          }

          // 2. PARAGRAPH
          if (block.type === 'paragraph' && block.text?.trim()) {
            return (
              <div key={key} className="space-y-3">
                {block.text.split('\n\n').map((para, pIdx) => (
                  <div
                    key={pIdx}
                    className={`leading-relaxed ${
                      block.align === 'center'
                        ? 'text-center'
                        : block.align === 'right'
                        ? 'text-right'
                        : block.align === 'justify'
                        ? 'text-justify'
                        : 'text-left'
                    }`}
                    style={{
                      color: block.color || undefined,
                      lineHeight: block.lineHeight || undefined,
                      fontSize: block.fontSize || undefined
                    }}
                    dangerouslySetInnerHTML={{ __html: formatRichText(para) }}
                  />
                ))}
              </div>
            );
          }

          // 3. IMAGE
          if (block.type === 'image' && block.url) {
            const imageWidth = block.width || '100%';
            const imageAlign = block.align || 'center';
            const alignClasses =
              imageAlign === 'left'
                ? 'mr-auto text-left items-start'
                : imageAlign === 'right'
                ? 'ml-auto text-right items-end'
                : 'mx-auto text-center items-center';
            const maxHeightStyle = block.maxHeight || '520px';
            const optimizedUrl = optimizeImageUrl(block.url, { width: 1200, quality: 80 });

            return (
              <figure
                key={key}
                className={`my-8 max-w-full flex flex-col ${alignClasses}`}
                style={{ width: imageWidth, maxWidth: '100%' }}
              >
                <div className="w-full rounded-2xl overflow-hidden shadow-md border border-slate-200/80 bg-slate-50">
                  <img
                    src={optimizedUrl}
                    alt={block.caption || 'Hình minh họa bài viết'}
                    loading="lazy"
                    style={{ maxHeight: maxHeightStyle }}
                    className="w-full object-cover rounded-2xl block mx-auto transition-transform duration-500 hover:scale-[1.005]"
                  />
                </div>
                {block.caption && (
                  <figcaption className="w-full text-xs text-slate-500 italic pt-2.5 px-2 text-center">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          }

          // 4. QUOTE
          if (block.type === 'quote' && block.text) {
            return (
              <blockquote
                key={key}
                className="my-6 p-6 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50/50 border-l-4 border-orange-500 shadow-sm relative overflow-hidden"
              >
                <div className="absolute right-4 top-1 text-6xl text-orange-200 font-serif select-none pointer-events-none opacity-60">
                  “
                </div>
                <p className="text-slate-800 font-medium italic relative z-10 text-base sm:text-lg mb-2 leading-relaxed">
                  "{block.text}"
                </p>
                {block.author && (
                  <cite className="text-xs font-bold text-orange-700 not-italic block uppercase tracking-wider">
                    — {block.author}
                  </cite>
                )}
              </blockquote>
            );
          }

          // 5. CALLOUT / ALERT BOX
          if (block.type === 'callout') {
            const calloutType = block.calloutType || 'tip';
            const config = {
              tip: {
                bg: 'bg-amber-50/80 border-amber-300 text-amber-900',
                icon: <Lightbulb className="w-4 h-4 text-amber-600" />,
                title: 'Mẹo Chọn Mua'
              },
              note: {
                bg: 'bg-sky-50/80 border-sky-300 text-sky-900',
                icon: <Info className="w-4 h-4 text-sky-600" />,
                title: 'Lưu Ý Quan Trọng'
              },
              warning: {
                bg: 'bg-rose-50/80 border-rose-300 text-rose-900',
                icon: <AlertTriangle className="w-4 h-4 text-rose-600" />,
                title: 'Cảnh Báo'
              },
              success: {
                bg: 'bg-emerald-50/80 border-emerald-300 text-emerald-900',
                icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
                title: 'Khuyên Dùng'
              }
            }[calloutType];

            return (
              <div
                key={key}
                className={`my-6 p-4 sm:p-5 rounded-2xl border ${config.bg} shadow-xs space-y-1.5`}
              >
                <div className="font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                  {config.icon}
                  <span>{block.caption || config.title}</span>
                </div>
                <div
                  className="text-xs sm:text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: formatRichText(block.text) }}
                />
              </div>
            );
          }

          // 6. LIST
          if (block.type === 'list' && block.items && block.items.length > 0) {
            return block.listType === 'numbered' ? (
              <ol
                key={key}
                className="my-6 space-y-2 list-decimal list-outside ml-6 sm:ml-8 pl-1 text-slate-800"
              >
                {block.items.filter(Boolean).map((item, iIdx) => (
                  <li key={iIdx} className="leading-relaxed pl-1">
                    <span
                      className="text-slate-900 font-medium"
                      dangerouslySetInnerHTML={{ __html: formatRichText(item) }}
                    />
                  </li>
                ))}
              </ol>
            ) : (
              <ul
                key={key}
                className="my-6 space-y-2 list-disc list-outside ml-6 sm:ml-8 pl-1 text-slate-800"
              >
                {block.items.filter(Boolean).map((item, iIdx) => (
                  <li key={iIdx} className="leading-relaxed pl-1">
                    <span
                      className="text-slate-900 font-medium"
                      dangerouslySetInnerHTML={{ __html: formatRichText(item) }}
                    />
                  </li>
                ))}
              </ul>
            );
          }

          // 7. TABLE
          if (block.type === 'table' && block.headers && block.rows) {
            return (
              <div
                key={key}
                className="my-8 rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-md"
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-orange-700 font-bold">
                      <tr>
                        {block.headers.map((h, hIdx) => (
                          <th key={hIdx} className="px-4 py-3.5 tracking-wider uppercase text-xs">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {block.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50/70 transition-colors">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="px-4 py-3">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          }

          // 8. VIDEO
          if (block.type === 'video' && block.url) {
            const isDirectVideo =
              block.url.startsWith('data:') ||
              block.url.startsWith('blob:') ||
              block.url.includes('/video/upload/') ||
              block.url.includes('.mp4') ||
              block.url.includes('.webm');
            const embedUrl = isDirectVideo ? '' : formatVideoEmbedUrl(block.url);

            return (
              <figure
                key={key}
                className="my-8 rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-xl max-w-3xl mx-auto flex flex-col items-center"
              >
                <div className="relative aspect-video w-full bg-black flex items-center justify-center">
                  {isDirectVideo ? (
                    <video
                      src={block.url}
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <iframe
                      src={embedUrl}
                      title={block.caption || 'Video'}
                      loading="lazy"
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                </div>
                {block.caption && (
                  <figcaption className="w-full text-xs text-slate-600 italic text-center py-2.5 px-4 bg-slate-50 border-t border-slate-200">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          }

          // 9. DIVIDER
          if (block.type === 'divider') {
            return <hr key={key} className="my-8 border-t-2 border-slate-100 rounded-full" />;
          }

          // 10. CODE
          if (block.type === 'code' && (block.code || block.text)) {
            const codeString = block.code || block.text || '';
            const isCopied = copiedCodeId === key;

            return (
              <div
                key={key}
                className="my-6 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl"
              >
                <div className="px-4 py-2 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                    <span className="ml-2 uppercase text-[11px] font-bold text-slate-300">
                      {block.language || 'code'}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyCode(codeString, key)}
                    className="flex items-center gap-1 text-[11px] hover:text-white transition-colors"
                    title="Sao chép mã nguồn"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">Đã chép</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Sao chép</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm font-mono text-emerald-400 leading-relaxed">
                  <code>{codeString}</code>
                </pre>
              </div>
            );
          }

          // 11. COLUMNS (Multi-column layout block)
          if (block.type === 'columns') {
            const layout = block.layout || '50-50';
            const gridColsClass =
              layout === '60-40'
                ? 'grid-cols-1 md:grid-cols-12'
                : layout === '40-60'
                ? 'grid-cols-1 md:grid-cols-12'
                : 'grid-cols-1 md:grid-cols-2';

            const leftColClass =
              layout === '60-40' ? 'md:col-span-7' : layout === '40-60' ? 'md:col-span-5' : '';
            const rightColClass =
              layout === '60-40' ? 'md:col-span-5' : layout === '40-60' ? 'md:col-span-7' : '';

            return (
              <div key={key} className="my-6 w-full">
                <div className={`grid ${gridColsClass} gap-6 sm:gap-8 items-start`}>
                  {/* Left Column */}
                  <div className={`${leftColClass} space-y-2`}>
                    {block.leftTitle && (
                      <h4 className="text-sm font-bold uppercase tracking-wider text-orange-600 pb-1 border-b border-slate-100">
                        {block.leftTitle}
                      </h4>
                    )}
                    {block.leftType === 'image' && block.leftImageUrl ? (
                      <figure className="my-2 max-w-full flex flex-col items-center">
                        <img
                          src={optimizeImageUrl(block.leftImageUrl, { width: 600 })}
                          alt={block.leftImageCaption || 'Ảnh cột trái'}
                          className="w-full object-cover rounded-2xl shadow-sm border border-slate-200"
                        />
                        {block.leftImageCaption && (
                          <figcaption className="w-full text-xs text-slate-500 italic text-center pt-2">
                            {block.leftImageCaption}
                          </figcaption>
                        )}
                      </figure>
                    ) : block.leftType === 'video' && block.leftVideoUrl ? (
                      <div className="my-2 rounded-2xl overflow-hidden aspect-video bg-black/90 shadow-sm border border-slate-200">
                        {block.leftVideoUrl.startsWith('data:') || block.leftVideoUrl.endsWith('.mp4') ? (
                          <video src={block.leftVideoUrl} controls className="w-full h-full object-cover" />
                        ) : (
                          <iframe
                            src={formatVideoEmbedUrl(block.leftVideoUrl)}
                            className="w-full h-full border-0"
                            allowFullScreen
                          />
                        )}
                      </div>
                    ) : (
                      <div
                        className="text-slate-700 leading-relaxed text-sm"
                        dangerouslySetInnerHTML={{ __html: formatRichText(block.leftText) }}
                      />
                    )}
                  </div>

                  {/* Right Column */}
                  <div className={`${rightColClass} space-y-2`}>
                    {block.rightTitle && (
                      <h4 className="text-sm font-bold uppercase tracking-wider text-orange-600 pb-1 border-b border-slate-100">
                        {block.rightTitle}
                      </h4>
                    )}
                    {block.rightType === 'image' && block.rightImageUrl ? (
                      <figure className="my-2 max-w-full flex flex-col items-center">
                        <img
                          src={optimizeImageUrl(block.rightImageUrl, { width: 600 })}
                          alt={block.rightImageCaption || 'Ảnh cột phải'}
                          className="w-full object-cover rounded-2xl shadow-sm border border-slate-200"
                        />
                        {block.rightImageCaption && (
                          <figcaption className="w-full text-xs text-slate-500 italic text-center pt-2">
                            {block.rightImageCaption}
                          </figcaption>
                        )}
                      </figure>
                    ) : block.rightType === 'video' && block.rightVideoUrl ? (
                      <div className="my-2 rounded-2xl overflow-hidden aspect-video bg-black/90 shadow-sm border border-slate-200">
                        {block.rightVideoUrl.startsWith('data:') || block.rightVideoUrl.endsWith('.mp4') ? (
                          <video src={block.rightVideoUrl} controls className="w-full h-full object-cover" />
                        ) : (
                          <iframe
                            src={formatVideoEmbedUrl(block.rightVideoUrl)}
                            className="w-full h-full border-0"
                            allowFullScreen
                          />
                        )}
                      </div>
                    ) : (
                      <div
                        className="text-slate-700 leading-relaxed text-sm"
                        dangerouslySetInnerHTML={{ __html: formatRichText(block.rightText) }}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          }

          return null;
        })}
      </div>
    );
  }

  // Case 2: Fallback to rich HTML string
  if (content && /<[a-z][\s\S]*>/i.test(content)) {
    return (
      <div
        className={`article-content-prose space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base ${className}`}
        dangerouslySetInnerHTML={{ __html: formatRichText(content) }}
      />
    );
  }

  // Case 3: Plain text paragraphs fallback
  const paragraphs = (content || '').split('\n\n').filter((p) => p.trim());
  return (
    <div className={`space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base ${className}`}>
      {paragraphs.map((para, idx) => (
        <p key={idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 leading-relaxed">
          {para}
        </p>
      ))}
    </div>
  );
};
