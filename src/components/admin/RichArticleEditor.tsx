import React, { useState, useRef, useEffect } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Image as ImageIcon,
  Video,
  Code,
  Table,
  Minus,
  Undo,
  Redo,
  Eye,
  Edit3,
  Code2,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  X,
  Upload
} from 'lucide-react';
import { cleanPastedHtml, optimizeImageUrl, formatVideoEmbedUrl } from '../../utils/mediaOptimizer';
import { ArticleContentRenderer } from '../article/ArticleContentRenderer';

interface RichArticleEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export const RichArticleEditor: React.FC<RichArticleEditorProps> = ({
  value,
  onChange,
  placeholder = 'Bắt đầu soạn thảo nội dung bài viết chuyên sâu...',
  minHeight = '360px'
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'visual' | 'preview'>('visual');
  const [activeFormats, setActiveFormats] = useState<Record<string, boolean>>({});

  // Modals for inserting media / links / callouts
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');

  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageCaption, setImageCaption] = useState('');
  const [imageWidth, setImageWidth] = useState('100%');

  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  // Sync initial content to editor div
  useEffect(() => {
    if (editorRef.current && viewMode === 'visual') {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || '';
      }
    }
  }, [value, viewMode]);

  // Execute standard formatting commands
  const format = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
      checkActiveFormats();
    }
  };

  const checkActiveFormats = () => {
    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      strikeThrough: document.queryCommandState('strikeThrough'),
      insertUnorderedList: document.queryCommandState('insertUnorderedList'),
      insertOrderedList: document.queryCommandState('insertOrderedList'),
      justifyLeft: document.queryCommandState('justifyLeft'),
      justifyCenter: document.queryCommandState('justifyCenter'),
      justifyRight: document.queryCommandState('justifyRight'),
      justifyFull: document.queryCommandState('justifyFull')
    });
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
      checkActiveFormats();
    }
  };

  // Clean paste handling (Google Docs / MS Word clean paste)
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const html = e.clipboardData.getData('text/html');
    const plainText = e.clipboardData.getData('text/plain');

    if (html) {
      const cleaned = cleanPastedHtml(html);
      document.execCommand('insertHTML', false, cleaned);
    } else if (plainText) {
      document.execCommand('insertText', false, plainText);
    }

    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  // Custom block insertions
  const insertHeading = (level: 1 | 2 | 3 | 4) => {
    format('formatBlock', `<h${level}>`);
  };

  const insertParagraph = () => {
    format('formatBlock', '<p>');
  };

  const insertCallout = (type: 'tip' | 'note' | 'warning' | 'success') => {
    const config = {
      tip: {
        bg: 'bg-amber-50',
        border: 'border-amber-300',
        text: 'text-amber-900',
        title: 'Mẹo Chọn Mua:',
        icon: '💡'
      },
      note: {
        bg: 'bg-sky-50',
        border: 'border-sky-300',
        text: 'text-sky-900',
        title: 'Lưu Ý Quan Trọng:',
        icon: '📌'
      },
      warning: {
        bg: 'bg-rose-50',
        border: 'border-rose-300',
        text: 'text-rose-900',
        title: 'Cảnh Báo:',
        icon: '⚠️'
      },
      success: {
        bg: 'bg-emerald-50',
        border: 'border-emerald-300',
        text: 'text-emerald-900',
        title: 'Khuyên Dùng:',
        icon: '✅'
      }
    }[type];

    const html = `
      <div class="my-4 p-4 rounded-2xl ${config.bg} border ${config.border} ${config.text} space-y-1">
        <div class="font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
          <span>${config.icon}</span> <span>${config.title}</span>
        </div>
        <p class="text-sm leading-relaxed">Nhập nội dung ghi chú / khuyến nghị tại đây...</p>
      </div>
      <p><br></p>
    `;

    document.execCommand('insertHTML', false, html);
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  const insertTable = () => {
    const tableHtml = `
      <div class="my-5 overflow-x-auto">
        <table class="w-full text-xs text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
          <thead class="bg-slate-100 text-slate-800 font-bold uppercase">
            <tr>
              <th class="p-3 border border-slate-200">Tiêu chí</th>
              <th class="p-3 border border-slate-200">Thông số 1</th>
              <th class="p-3 border border-slate-200">Thông số 2</th>
              <th class="p-3 border border-slate-200">Đánh giá</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr>
              <td class="p-3 border border-slate-200 font-medium">Hiệu năng</td>
              <td class="p-3 border border-slate-200">Mạnh mẽ</td>
              <td class="p-3 border border-slate-200">Tiêu chuẩn</td>
              <td class="p-3 border border-slate-200 text-emerald-600 font-bold">Xuất sắc</td>
            </tr>
            <tr>
              <td class="p-3 border border-slate-200 font-medium">Độ bền</td>
              <td class="p-3 border border-slate-200">3-5 năm</td>
              <td class="p-3 border border-slate-200">2-3 năm</td>
              <td class="p-3 border border-slate-200 text-amber-600 font-bold">Rất tốt</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p><br></p>
    `;
    document.execCommand('insertHTML', false, tableHtml);
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  const insertDivider = () => {
    const dividerHtml = `<hr class="my-6 border-t-2 border-slate-200/80 rounded-full" /><p><br></p>`;
    document.execCommand('insertHTML', false, dividerHtml);
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  const handleInsertLink = () => {
    if (!linkUrl) return;
    const finalUrl = linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`;
    const textToInsert = linkText.trim() || finalUrl;
    const linkHtml = `<a href="${finalUrl}" target="_blank" rel="noopener noreferrer" class="text-orange-600 hover:text-orange-700 underline font-medium">${textToInsert}</a>`;
    document.execCommand('insertHTML', false, linkHtml);
    if (editorRef.current) onChange(editorRef.current.innerHTML);
    setLinkModalOpen(false);
    setLinkUrl('');
    setLinkText('');
  };

  const handleInsertImage = () => {
    if (!imageUrl) return;
    const optimized = optimizeImageUrl(imageUrl.trim(), { width: 1200, quality: 80 });
    const figureHtml = `
      <figure class="my-6 mx-auto flex flex-col items-center max-w-full" style="width: ${imageWidth};">
        <img src="${optimized}" alt="${imageCaption || 'Hình ảnh bài viết'}" class="w-full max-h-[520px] object-cover rounded-2xl shadow-md border border-slate-200" />
        ${imageCaption ? `<figcaption class="text-xs text-slate-500 italic text-center pt-2.5 px-4">${imageCaption}</figcaption>` : ''}
      </figure>
      <p><br></p>
    `;
    document.execCommand('insertHTML', false, figureHtml);
    if (editorRef.current) onChange(editorRef.current.innerHTML);
    setImageModalOpen(false);
    setImageUrl('');
    setImageCaption('');
    setImageWidth('100%');
  };

  const handleInsertVideo = () => {
    if (!videoUrl) return;
    const embed = formatVideoEmbedUrl(videoUrl.trim());
    const videoHtml = `
      <div class="my-6 aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-200">
        <iframe src="${embed}" class="w-full h-full" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <p><br></p>
    `;
    document.execCommand('insertHTML', false, videoHtml);
    if (editorRef.current) onChange(editorRef.current.innerHTML);
    setVideoModalOpen(false);
    setVideoUrl('');
  };

  // Word count & reading time calculation
  const getWordCount = () => {
    const text = (value || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    return text ? text.split(' ').length : 0;
  };

  const wordCount = getWordCount();
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs focus-within:border-orange-500 transition-colors">
      {/* Top Main Toolbar */}
      <div className="bg-slate-50/90 border-b border-slate-200 p-2 flex flex-wrap items-center justify-between gap-1.5 select-none sticky top-0 z-10 backdrop-blur-xs">
        {/* Left Toolbar formatting groups */}
        <div className="flex flex-wrap items-center gap-1">
          {/* History Undo / Redo */}
          <div className="flex items-center bg-white rounded-lg border border-slate-200/80 p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() => format('undo')}
              className="p-1.5 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Hoàn tác (Ctrl+Z)"
            >
              <Undo className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => format('redo')}
              className="p-1.5 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Làm lại (Ctrl+Y)"
            >
              <Redo className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-5 w-[1px] bg-slate-200 mx-0.5" />

          {/* Heading selectors */}
          <div className="flex items-center bg-white rounded-lg border border-slate-200/80 p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={insertParagraph}
              className="px-2 py-1 rounded-md text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              title="Đoạn văn thường (Normal text)"
            >
              P
            </button>
            <button
              type="button"
              onClick={() => insertHeading(2)}
              className="px-2 py-1 rounded-md text-xs font-black text-slate-800 hover:bg-slate-100 transition-colors"
              title="Tiêu đề H2"
            >
              H2
            </button>
            <button
              type="button"
              onClick={() => insertHeading(3)}
              className="px-2 py-1 rounded-md text-xs font-bold text-slate-800 hover:bg-slate-100 transition-colors"
              title="Tiêu đề H3"
            >
              H3
            </button>
          </div>

          <div className="h-5 w-[1px] bg-slate-200 mx-0.5" />

          {/* Inline text styles */}
          <div className="flex items-center bg-white rounded-lg border border-slate-200/80 p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() => format('bold')}
              className={`p-1.5 rounded-md transition-colors ${
                activeFormats.bold ? 'bg-orange-100 text-orange-700 font-bold' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="In đậm (Ctrl+B)"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => format('italic')}
              className={`p-1.5 rounded-md transition-colors ${
                activeFormats.italic ? 'bg-orange-100 text-orange-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="In nghiêng (Ctrl+I)"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => format('underline')}
              className={`p-1.5 rounded-md transition-colors ${
                activeFormats.underline ? 'bg-orange-100 text-orange-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Gạch chân (Ctrl+U)"
            >
              <Underline className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => format('strikeThrough')}
              className={`p-1.5 rounded-md transition-colors ${
                activeFormats.strikeThrough ? 'bg-orange-100 text-orange-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Gạch ngang"
            >
              <Strikethrough className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-5 w-[1px] bg-slate-200 mx-0.5" />

          {/* Alignments */}
          <div className="flex items-center bg-white rounded-lg border border-slate-200/80 p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() => format('justifyLeft')}
              className={`p-1.5 rounded-md transition-colors ${
                activeFormats.justifyLeft ? 'bg-orange-100 text-orange-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Căn lề trái"
            >
              <AlignLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => format('justifyCenter')}
              className={`p-1.5 rounded-md transition-colors ${
                activeFormats.justifyCenter ? 'bg-orange-100 text-orange-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Căn giữa"
            >
              <AlignCenter className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => format('justifyRight')}
              className={`p-1.5 rounded-md transition-colors ${
                activeFormats.justifyRight ? 'bg-orange-100 text-orange-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Căn lề phải"
            >
              <AlignRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-5 w-[1px] bg-slate-200 mx-0.5" />

          {/* Lists & Quote */}
          <div className="flex items-center bg-white rounded-lg border border-slate-200/80 p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() => format('insertUnorderedList')}
              className={`p-1.5 rounded-md transition-colors ${
                activeFormats.insertUnorderedList ? 'bg-orange-100 text-orange-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Danh sách dấu chấm"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => format('insertOrderedList')}
              className={`p-1.5 rounded-md transition-colors ${
                activeFormats.insertOrderedList ? 'bg-orange-100 text-orange-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Danh sách đánh số"
            >
              <ListOrdered className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => format('formatBlock', '<blockquote>')}
              className="p-1.5 rounded-md text-slate-600 hover:bg-slate-100 transition-colors"
              title="Trích dẫn (Blockquote)"
            >
              <Quote className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-5 w-[1px] bg-slate-200 mx-0.5" />

          {/* Rich Media & Elements */}
          <div className="flex items-center bg-white rounded-lg border border-slate-200/80 p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() => setLinkModalOpen(true)}
              className="p-1.5 rounded-md text-slate-600 hover:text-orange-600 hover:bg-slate-100 transition-colors"
              title="Chèn liên kết (Link)"
            >
              <LinkIcon className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setImageModalOpen(true)}
              className="p-1.5 rounded-md text-slate-600 hover:text-emerald-600 hover:bg-slate-100 transition-colors"
              title="Chèn hình ảnh với chú thích"
            >
              <ImageIcon className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setVideoModalOpen(true)}
              className="p-1.5 rounded-md text-slate-600 hover:text-rose-600 hover:bg-slate-100 transition-colors"
              title="Nhúng Video YouTube / Vimeo"
            >
              <Video className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={insertTable}
              className="p-1.5 rounded-md text-slate-600 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
              title="Chèn bảng so sánh (Table)"
            >
              <Table className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={insertDivider}
              className="p-1.5 rounded-md text-slate-600 hover:bg-slate-100 transition-colors"
              title="Đường phân đoạn"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Callout Dropdown / Buttons */}
          <div className="flex items-center bg-white rounded-lg border border-slate-200/80 p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() => insertCallout('tip')}
              className="px-2 py-1 text-[11px] font-semibold text-amber-700 hover:bg-amber-50 rounded-md transition-colors flex items-center gap-1.5"
              title="Thêm hộp mẹo hay"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
              <span>Mẹo</span>
            </button>
            <button
              type="button"
              onClick={() => insertCallout('warning')}
              className="px-2 py-1 text-[11px] font-semibold text-rose-700 hover:bg-rose-50 rounded-md transition-colors flex items-center gap-1.5"
              title="Thêm hộp cảnh báo"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>Chú ý</span>
            </button>
          </div>
        </div>

        {/* Right View Modes: Visual / Preview */}
        <div className="flex items-center bg-white rounded-xl border border-slate-200/80 p-0.5 shadow-2xs">
          <button
            type="button"
            onClick={() => setViewMode('visual')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
              viewMode === 'visual' ? 'bg-orange-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Edit3 className="w-3 h-3" />
            <span>Soạn thảo</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('preview')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
              viewMode === 'preview' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>Xem trước</span>
          </button>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="relative">
        {viewMode === 'visual' && (
          <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            onKeyUp={checkActiveFormats}
            onMouseUp={checkActiveFormats}
            onPaste={handlePaste}
            className="p-5 focus:outline-none article-editor-content text-slate-800 leading-relaxed text-sm overflow-y-auto max-h-[500px]"
            style={{ minHeight }}
            data-placeholder={placeholder}
          />
        )}

        {viewMode === 'preview' && (
          <div className="p-6 bg-slate-50/50 max-h-[500px] overflow-y-auto border-t border-slate-100">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
              <ArticleContentRenderer content={value} />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Status Bar: Word counter & Reading time */}
      <div className="bg-slate-50 px-4 py-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-medium">
        <div className="flex items-center gap-4">
          <span>
            Số từ: <strong className="text-slate-800">{wordCount}</strong>
          </span>
          <span>•</span>
          <span>
            Thời gian đọc ước tính: <strong className="text-slate-800">{readingTimeMinutes} phút</strong>
          </span>
        </div>
        <div className="flex items-center gap-1 text-slate-400">
          <Sparkles className="w-3 h-3 text-orange-500" />
          <span>Hỗ trợ tự động lọc sạch style từ Word / Docs</span>
        </div>
      </div>

      {/* 1. Modal Insert Link */}
      {linkModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-2xl p-5 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-scale-up">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-orange-600" /> Chèn liên kết
              </h4>
              <button onClick={() => setLinkModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Đường dẫn URL (Bắt buộc):</label>
                <input
                  type="url"
                  placeholder="https://example.com/san-pham"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Chữ hiển thị (Tùy chọn):</label>
                <input
                  type="text"
                  placeholder="Xem chi tiết sản phẩm"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setLinkModalOpen(false)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleInsertLink}
                className="px-4 py-1.5 rounded-xl text-xs font-bold bg-orange-600 text-white hover:bg-orange-700 shadow-xs"
              >
                Chèn liên kết
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Modal Insert Image */}
      {imageModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-2xl p-5 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4 animate-scale-up">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-emerald-600" /> Chèn hình ảnh bài viết
              </h4>
              <button onClick={() => setImageModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">URL hình ảnh (Unsplash / Cloudinary / Trực tiếp):</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Chú thích ảnh (Caption):</label>
                <input
                  type="text"
                  placeholder="Hình 1: Chi tiết linh kiện bên trong sau 30 ngày thử nghiệm..."
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Độ rộng hiển thị:</label>
                <select
                  value={imageWidth}
                  onChange={(e) => setImageWidth(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                >
                  <option value="100%">100% (Toàn chiều rộng)</option>
                  <option value="80%">80% (Vừa vặn)</option>
                  <option value="60%">60% (Trung bình)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setImageModalOpen(false)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleInsertImage}
                className="px-4 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs"
              >
                Chèn hình ảnh
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Modal Insert Video */}
      {videoModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-2xl p-5 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-scale-up">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Video className="w-4 h-4 text-rose-600" /> Nhúng Video đánh giá
              </h4>
              <button onClick={() => setVideoModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Đường dẫn Video (YouTube, Vimeo):</label>
                <input
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setVideoModalOpen(false)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleInsertVideo}
                className="px-4 py-1.5 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 shadow-xs"
              >
                Nhúng Video
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
