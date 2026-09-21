import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { ArticleBlock } from '../../types';
import { uploadApi } from '../../services/api';
import {
  cleanPastedHtml,
  optimizeImageUrl,
  formatVideoEmbedUrl
} from '../../utils/mediaOptimizer';
import { ArticleBodyRenderer } from '../article/ArticleBodyRenderer';
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
  Code as CodeIcon,
  Table as TableIcon,
  Minus,
  Undo,
  Redo,
  Eye,
  Edit3,
  Columns as ColumnsIcon,
  Plus,
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Lightbulb,
  AlertTriangle,
  Info,
  CheckCircle2,
  X,
  Upload,
  Palette,
  Highlighter,
  Maximize2,
  Minimize2,
  Check,
  Type,
  ZoomIn,
  ZoomOut,
  Loader2,
  Film
} from 'lucide-react';

// Helper to parse width string (e.g. '80%', '600px', '100%') into percentage number (20 - 100)
function parsePercent(val: string | undefined): number {
  if (!val) return 100;
  const num = parseInt(val.replace('%', '').replace('px', ''), 10);
  return isNaN(num) ? 100 : Math.min(100, Math.max(20, num));
}

// Helper to extract and format a human-readable title from an image file name or URL path
function formatImageNameFromFilename(filename: string): string {
  if (!filename) return '';
  // Strip path or query params
  const cleanPath = filename.split(/[?#]/)[0];
  const base = cleanPath.split(/[/\\]/).pop() || cleanPath;
  // Remove extension (e.g. .png, .jpg, .jpeg, .webp, .svg, .gif, .avif)
  const nameWithoutExt = base.replace(/\.[a-zA-Z0-9]+$/, '');
  // Ignore generic names like 'image', 'screenshot', 'blob', 'unnamed', 'file'
  if (/^(image|img|screenshot|capture|blob|unnamed|file|picture|photo)([-_\s\d]*)$/i.test(nameWithoutExt.trim())) {
    return '';
  }
  // Replace underscores, hyphens, pluses, dots with spaces
  const cleanName = nameWithoutExt.replace(/[-_+.]/g, ' ').replace(/\s+/g, ' ').trim();
  if (!cleanName) return '';
  // Capitalize first letter
  return cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
}

// Helper to generate meaningful image caption & alt based on image filename, article slug/title and image index
function generateDefaultImageCaption(
  sourceName?: string,
  slug?: string,
  title?: string,
  existingCount = 0
): string {
  const index = existingCount + 1;
  const nameFromImage = sourceName ? formatImageNameFromFilename(sourceName) : '';

  if (nameFromImage) {
    return `Hình ${index}: ${nameFromImage}`;
  }
  if (title && title.trim()) {
    return `Hình ${index}: ${title.trim()}`;
  }
  if (slug && slug.trim()) {
    const cleanSlug = slug.trim().replace(/[-_+.]/g, ' ').replace(/\s+/g, ' ').trim();
    const capitalized = cleanSlug.charAt(0).toUpperCase() + cleanSlug.slice(1);
    return `Hình ${index}: ${capitalized}`;
  }
  return `Hình ${index}: Ảnh minh họa`;
}

interface WordBlogEditorProps {
  value: string; // HTML string
  blocks?: ArticleBlock[];
  onChange: (html: string, blocks: ArticleBlock[]) => void;
  placeholder?: string;
  minHeight?: string;
  embedded?: boolean;
  headerContent?: React.ReactNode;
  slug?: string;
  title?: string;
}

// Convert HTML or plain text into initial structured blocks if blocks are not provided
function convertContentToBlocks(htmlOrText: string): ArticleBlock[] {
  if (!htmlOrText || !htmlOrText.trim()) {
    return [
      { id: 'b-1', type: 'paragraph', text: '', align: 'left' }
    ];
  }

  // Check if content already contains block markers or HTML headings
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlOrText, 'text/html');
  const body = doc.body;

  if (body.children.length === 0) {
    const paragraphs = htmlOrText.split('\n\n').filter(Boolean);
    return paragraphs.map((p, idx) => ({
      id: `b-${idx + 1}`,
      type: 'paragraph',
      text: p.trim(),
      align: 'left'
    }));
  }

  const blocks: ArticleBlock[] = [];
  Array.from(body.children).forEach((child, idx) => {
    const tagName = child.tagName.toLowerCase();
    const id = `b-${idx + 1}`;

    if (tagName === 'h1' || tagName === 'h2' || tagName === 'h3' || tagName === 'h4') {
      const level = (parseInt(tagName.replace('h', '')) || 2) as 1 | 2 | 3 | 4;
      blocks.push({
        id,
        type: 'heading',
        level,
        text: child.innerHTML,
        align: 'left'
      });
    } else if (tagName === 'blockquote') {
      blocks.push({
        id,
        type: 'quote',
        text: child.textContent || '',
        author: '',
        align: 'left'
      });
    } else if (tagName === 'pre') {
      blocks.push({
        id,
        type: 'code',
        code: child.textContent || '',
        language: 'javascript'
      });
    } else if (tagName === 'hr') {
      blocks.push({
        id,
        type: 'divider'
      });
    } else if (tagName === 'ul' || tagName === 'ol') {
      const items = Array.from(child.children).map((li) => li.innerHTML);
      blocks.push({
        id,
        type: 'list',
        listType: tagName === 'ol' ? 'numbered' : 'bullet',
        items
      });
    } else if (tagName === 'figure' || tagName === 'img') {
      const img = tagName === 'img' ? child : child.querySelector('img');
      const figcaption = child.querySelector('figcaption');
      if (img) {
        const rawWidth = (child as HTMLElement).style?.width || (img as HTMLElement).style?.width || img.getAttribute('width') || '100%';
        const rawAlign = ((child as HTMLElement).style?.textAlign as 'left' | 'center' | 'right') || 'center';
        blocks.push({
          id,
          type: 'image',
          url: img.getAttribute('src') || '',
          caption: figcaption?.textContent || img.getAttribute('alt') || '',
          width: rawWidth,
          align: rawAlign
        });
      }
    } else {
      blocks.push({
        id,
        type: 'paragraph',
        text: child.innerHTML,
        align: 'left'
      });
    }
  });

  return blocks.length > 0 ? blocks : [{ id: 'b-1', type: 'paragraph', text: '', align: 'left' }];
}

// Convert structured blocks into clean, responsive HTML
function convertBlocksToHtml(blocks: ArticleBlock[]): string {
  return blocks
    .map((b) => {
      if (b.type === 'heading') {
        const tag = b.level === 1 ? 'h1' : b.level === 3 ? 'h3' : b.level === 4 ? 'h4' : 'h2';
        const alignStyle = b.align ? ` style="text-align: ${b.align};"` : '';
        return `<${tag}${alignStyle}>${b.text || ''}</${tag}>`;
      }
      if (b.type === 'paragraph') {
        const alignStyle = b.align ? ` style="text-align: ${b.align};"` : '';
        return `<p${alignStyle}>${b.text || ''}</p>`;
      }
      if (b.type === 'image' && b.url) {
        return `<figure style="width: ${b.width || '100%'}; text-align: ${b.align || 'center'};"><img src="${b.url}" alt="${b.caption || ''}" />${b.caption ? `<figcaption>${b.caption}</figcaption>` : ''}</figure>`;
      }
      if (b.type === 'quote' && b.text) {
        return `<blockquote><p>${b.text}</p>${b.author ? `<cite>${b.author}</cite>` : ''}</blockquote>`;
      }
      if (b.type === 'callout') {
        return `<div class="callout callout-${b.calloutType || 'tip'}"><h4>${b.caption || 'Lưu ý'}</h4><p>${b.text || ''}</p></div>`;
      }
      if (b.type === 'list' && b.items) {
        const tag = b.listType === 'numbered' ? 'ol' : 'ul';
        const lis = b.items.map((it) => `<li>${it}</li>`).join('');
        return `<${tag}>${lis}</${tag}>`;
      }
      if (b.type === 'table' && b.headers && b.rows) {
        const ths = b.headers.map((h) => `<th>${h}</th>`).join('');
        const trs = b.rows.map((row) => `<tr>${row.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('');
        return `<table><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table>`;
      }
      if (b.type === 'code') {
        return `<pre><code class="language-${b.language || 'text'}">${b.code || b.text || ''}</code></pre>`;
      }
      if (b.type === 'video' && b.url) {
        return `<div class="video-embed"><iframe src="${formatVideoEmbedUrl(b.url)}"></iframe></div>`;
      }
      if (b.type === 'divider') {
        return `<hr />`;
      }
      if (b.type === 'columns') {
        const leftContent =
          b.leftType === 'image' && b.leftImageUrl
            ? `<figure><img src="${b.leftImageUrl}" alt="${b.leftImageCaption || ''}" />${b.leftImageCaption ? `<figcaption>${b.leftImageCaption}</figcaption>` : ''}</figure>`
            : b.leftType === 'video' && b.leftVideoUrl
            ? `<div class="video-embed"><iframe src="${formatVideoEmbedUrl(b.leftVideoUrl)}"></iframe></div>`
            : `<div class="col-content">${b.leftTitle ? `<h4>${b.leftTitle}</h4>` : ''}<p>${b.leftText || ''}</p></div>`;

        const rightContent =
          b.rightType === 'image' && b.rightImageUrl
            ? `<figure><img src="${b.rightImageUrl}" alt="${b.rightImageCaption || ''}" />${b.rightImageCaption ? `<figcaption>${b.rightImageCaption}</figcaption>` : ''}</figure>`
            : b.rightType === 'video' && b.rightVideoUrl
            ? `<div class="video-embed"><iframe src="${formatVideoEmbedUrl(b.rightVideoUrl)}"></iframe></div>`
            : `<div class="col-content">${b.rightTitle ? `<h4>${b.rightTitle}</h4>` : ''}<p>${b.rightText || ''}</p></div>`;

        return `<div class="columns-grid"><div class="col-left">${leftContent}</div><div class="col-right">${rightContent}</div></div>`;
      }
      return '';
    })
    .join('\n');
}

interface EditableContentProps {
  id?: string;
  html: string;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  onInput: (html: string) => void;
  onKeyUp?: () => void;
  onMouseUp?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onPaste?: (e: React.ClipboardEvent<HTMLDivElement>) => void;
}

const EditableContent: React.FC<EditableContentProps> = ({
  id,
  html,
  className,
  style,
  placeholder,
  onInput,
  onKeyUp,
  onMouseUp,
  onFocus,
  onBlur,
  onPaste
}) => {
  const elRef = useRef<HTMLDivElement>(null);
  const lastHtmlRef = useRef(html);

  // Sync external updates (Undo/Redo, external state change) without breaking typing caret
  useEffect(() => {
    if (elRef.current) {
      if (html !== lastHtmlRef.current) {
        elRef.current.innerHTML = html || '';
        lastHtmlRef.current = html;
      }
    }
  }, [html]);

  // Initial mount
  useEffect(() => {
    if (elRef.current && elRef.current.innerHTML !== html) {
      elRef.current.innerHTML = html || '';
      lastHtmlRef.current = html;
    }
  }, []);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newHtml = e.currentTarget.innerHTML;
    lastHtmlRef.current = newHtml;
    onInput(newHtml);
  };

  return (
    <div
      ref={elRef}
      id={id}
      contentEditable
      suppressContentEditableWarning
      onInput={handleInput}
      onKeyUp={onKeyUp}
      onMouseUp={onMouseUp}
      onFocus={onFocus}
      onBlur={onBlur}
      onPaste={onPaste}
      className={className}
      style={style}
      data-placeholder={placeholder}
    />
  );
};

export const WordBlogEditor: React.FC<WordBlogEditorProps> = ({
  value,
  blocks: initialBlocks,
  onChange,
  placeholder = 'Nhập nội dung bài viết...',
  minHeight = '420px',
  embedded = false,
  headerContent,
  slug,
  title
}) => {
  // 1. Blocks State & History (Undo/Redo)
  const [blocks, setBlocks] = useState<ArticleBlock[]>(() => {
    if (initialBlocks && initialBlocks.length > 0) return initialBlocks;
    return convertContentToBlocks(value);
  });

  const [history, setHistory] = useState<ArticleBlock[][]>([blocks]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [activeBlockId, setActiveBlockId] = useState<string | null>(blocks[0]?.id || null);
  const [viewMode, setViewMode] = useState<'visual' | 'preview'>('visual');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Active toolbar formats state
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikeThrough: false,
    alignLeft: true,
    alignCenter: false,
    alignRight: false,
    alignJustify: false
  });

  // Color picker states
  const [textColor, setTextColor] = useState('#1e293b');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);

  // Modals state
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');

  // Image Modal state (Upload from local file vs URL, Auto Slug Caption, Auto Center)
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageTab, setImageTab] = useState<'upload' | 'url'>('upload');
  const [imageUrl, setImageUrl] = useState('');
  const [imageCaption, setImageCaption] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const imageFileInputRef = useRef<HTMLInputElement>(null);

  // Video Modal state (Upload from local file vs URL)
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoTab, setVideoTab] = useState<'upload' | 'url'>('upload');
  const [videoUrl, setVideoUrl] = useState('');
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const videoFileInputRef = useRef<HTMLInputElement>(null);

  const activeBlock = useMemo(() => blocks.find((b) => b.id === activeBlockId), [blocks, activeBlockId]);

  // Handle local image file selection with backend upload & FileReader fallback
  const handleLocalImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Automatically generate caption based on file name
    const existingCount = blocks.filter((b) => b.type === 'image').length;
    setImageCaption(generateDefaultImageCaption(file.name, slug, title, existingCount));

    setIsUploadingImage(true);
    try {
      const uploadedUrl = await uploadApi.uploadImage(file);
      if (uploadedUrl) {
        setImageUrl(uploadedUrl);
        setIsUploadingImage(false);
        return;
      }
    } catch (err) {
      console.warn('Upload API unavailable or failed, fallback to local dataUrl:', err);
    }

    const reader = new FileReader();
    reader.onload = (loadEvt) => {
      const dataUrl = loadEvt.target?.result as string;
      if (dataUrl) {
        setImageUrl(dataUrl);
      }
      setIsUploadingImage(false);
    };
    reader.readAsDataURL(file);
  };

  // Handle local video file selection
  const handleLocalVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingVideo(true);
    const reader = new FileReader();
    reader.onload = (loadEvt) => {
      const dataUrl = loadEvt.target?.result as string;
      if (dataUrl) {
        setVideoUrl(dataUrl);
      }
      setIsUploadingVideo(false);
    };
    reader.readAsDataURL(file);
  };

  // Sync to parent onChange whenever blocks change
  const syncChanges = (newBlocks: ArticleBlock[]) => {
    setBlocks(newBlocks);
    const html = convertBlocksToHtml(newBlocks);
    onChange(html, newBlocks);

    // Push to history for Undo/Redo
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newBlocks);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setBlocks(prev);
      onChange(convertBlocksToHtml(prev), prev);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setBlocks(next);
      onChange(convertBlocksToHtml(next), next);
    }
  };

  // Selection & Range Helpers (for applying toolbar formatting to highlighted text)
  const savedRangeRef = useRef<Range | null>(null);

  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
      savedRangeRef.current = selection.getRangeAt(0).cloneRange();
    }
  };

  const restoreSelection = () => {
    if (savedRangeRef.current) {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(savedRangeRef.current);
      }
    }
  };

  // Automatically track text highlighted by the user in any block
  useEffect(() => {
    const handleSelectionChange = () => {
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0 && !sel.isCollapsed) {
        const range = sel.getRangeAt(0);
        const node = range.commonAncestorContainer;
        const el = node.nodeType === Node.ELEMENT_NODE ? (node as HTMLElement) : node.parentElement;
        const container = el?.closest('[contenteditable]') as HTMLElement | null;
        if (container) {
          savedRangeRef.current = range.cloneRange();
          if (container.id && container.id.startsWith('block-content-')) {
            setActiveBlockId(container.id.replace('block-content-', ''));
          }
        }
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, []);

  const getSelectedHtmlOrText = (): { text: string; html: string; hasSelection: boolean } => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
      if (savedRangeRef.current && !savedRangeRef.current.collapsed) {
        const text = savedRangeRef.current.toString().trim();
        const div = document.createElement('div');
        div.appendChild(savedRangeRef.current.cloneContents());
        return { text, html: div.innerHTML, hasSelection: Boolean(text) };
      }
      return { text: '', html: '', hasSelection: false };
    }
    const range = selection.getRangeAt(0);
    const text = selection.toString().trim();
    const div = document.createElement('div');
    div.appendChild(range.cloneContents());
    return { text, html: div.innerHTML, hasSelection: Boolean(text) };
  };

  // Formatting helpers
  const applyExecCommand = (command: string, val: string | undefined = undefined) => {
    restoreSelection();
    const selection = window.getSelection();
    let blockIdFromSelection: string | null = null;

    if (selection && selection.rangeCount > 0) {
      const node = selection.getRangeAt(0).commonAncestorContainer;
      const el = node.nodeType === Node.ELEMENT_NODE ? (node as HTMLElement) : node.parentElement;
      const containerEl = el?.closest('[contenteditable]') as HTMLElement | null;
      if (containerEl && containerEl.id && containerEl.id.startsWith('block-content-')) {
        blockIdFromSelection = containerEl.id.replace('block-content-', '');
      }
    }

    if (command === 'hiliteColor') {
      try {
        document.execCommand('hiliteColor', false, val);
      } catch {
        document.execCommand('backColor', false, val);
      }
    } else {
      document.execCommand(command, false, val);
    }

    checkToolbarActiveStates();
    saveSelection();

    const targetBlockId = blockIdFromSelection || activeBlockId;
    if (targetBlockId) {
      const el = document.getElementById(`block-content-${targetBlockId}`);
      if (el) {
        updateBlock(targetBlockId, { text: el.innerHTML });
      }
    }
  };

  // Apply text color specifically to highlighted text
  const applyTextColor = (color: string) => {
    restoreSelection();
    let selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
      if (savedRangeRef.current && !savedRangeRef.current.collapsed) {
        restoreSelection();
        selection = window.getSelection();
      }
    }

    if (selection && !selection.isCollapsed && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      let blockIdFromSelection: string | null = null;
      const node = range.commonAncestorContainer;
      const el = node.nodeType === Node.ELEMENT_NODE ? (node as HTMLElement) : node.parentElement;
      const containerEl = el?.closest('[contenteditable]') as HTMLElement | null;
      if (containerEl && containerEl.id && containerEl.id.startsWith('block-content-')) {
        blockIdFromSelection = containerEl.id.replace('block-content-', '');
      }

      // Try execCommand first with styleWithCSS
      try {
        document.execCommand('styleWithCSS', false, 'true');
        document.execCommand('foreColor', false, color);
      } catch (_) {}

      // Convert any <font color="..."> into <span style="color: ...">
      if (containerEl) {
        const fontEls = containerEl.querySelectorAll('font[color]');
        fontEls.forEach((font) => {
          const fontColor = font.getAttribute('color') || color;
          const span = document.createElement('span');
          span.style.color = fontColor;
          span.innerHTML = font.innerHTML;
          font.parentNode?.replaceChild(span, font);
        });
      }

      // Fallback: If execCommand didn't insert color style, wrap selection directly in a span
      if (containerEl && !containerEl.innerHTML.includes(color)) {
        try {
          const span = document.createElement('span');
          span.style.color = color;
          span.appendChild(range.extractContents());
          range.insertNode(span);

          const newRange = document.createRange();
          newRange.selectNodeContents(span);
          selection.removeAllRanges();
          selection.addRange(newRange);
          savedRangeRef.current = newRange.cloneRange();
        } catch (e) {
          console.error('Error applying text color fallback:', e);
        }
      }

      saveSelection();

      const targetId = blockIdFromSelection || activeBlockId;
      if (targetId) {
        const targetEl = document.getElementById(`block-content-${targetId}`);
        if (targetEl) {
          updateBlock(targetId, { text: targetEl.innerHTML });
        }
      }
    } else if (activeBlockId) {
      updateBlock(activeBlockId, { color });
    }
  };

  // Apply highlight (bút dạ quang) specifically to highlighted text
  const applyHighlightColor = (color: string) => {
    restoreSelection();
    let selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
      if (savedRangeRef.current && !savedRangeRef.current.collapsed) {
        restoreSelection();
        selection = window.getSelection();
      }
    }

    if (selection && !selection.isCollapsed && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      let blockIdFromSelection: string | null = null;
      const node = range.commonAncestorContainer;
      const el = node.nodeType === Node.ELEMENT_NODE ? (node as HTMLElement) : node.parentElement;
      const containerEl = el?.closest('[contenteditable]') as HTMLElement | null;
      if (containerEl && containerEl.id && containerEl.id.startsWith('block-content-')) {
        blockIdFromSelection = containerEl.id.replace('block-content-', '');
      }

      if (color === 'transparent') {
        try {
          document.execCommand('styleWithCSS', false, 'true');
          document.execCommand('hiliteColor', false, 'transparent');
          document.execCommand('backColor', false, 'transparent');
        } catch (_) {}

        if (containerEl) {
          const marks = containerEl.querySelectorAll('mark, span');
          marks.forEach((m: any) => {
            if (m.style && m.style.backgroundColor) {
              m.style.backgroundColor = '';
              m.style.padding = '';
              m.style.borderRadius = '';
            }
          });
        }
      } else {
        try {
          document.execCommand('styleWithCSS', false, 'true');
        } catch (_) {}

        let executed = false;
        try {
          executed = document.execCommand('hiliteColor', false, color);
        } catch (_) {}

        if (!executed) {
          try {
            executed = document.execCommand('backColor', false, color);
          } catch (_) {}
        }

        // Fallback: If execCommand didn't wrap
        if (!executed || (containerEl && !containerEl.innerHTML.includes(color))) {
          try {
            const span = document.createElement('span');
            span.style.backgroundColor = color;
            span.style.padding = '1px 3px';
            span.style.borderRadius = '4px';
            span.appendChild(range.extractContents());
            range.insertNode(span);

            const newRange = document.createRange();
            newRange.selectNodeContents(span);
            selection.removeAllRanges();
            selection.addRange(newRange);
            savedRangeRef.current = newRange.cloneRange();
          } catch (e) {
            console.error('Error applying highlight fallback:', e);
          }
        }
      }

      saveSelection();

      const targetId = blockIdFromSelection || activeBlockId;
      if (targetId) {
        const targetEl = document.getElementById(`block-content-${targetId}`);
        if (targetEl) {
          updateBlock(targetId, { text: targetEl.innerHTML });
        }
      }
    } else if (activeBlockId) {
      updateBlock(activeBlockId, { highlightColor: color === 'transparent' ? undefined : color });
    }
  };

  const applyFontSize = (size: string) => {
    restoreSelection();
    const selection = window.getSelection();
    let appliedToSelection = false;

    if (selection && !selection.isCollapsed && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      let blockIdFromSelection: string | null = null;
      const node = range.commonAncestorContainer;
      const el = node.nodeType === Node.ELEMENT_NODE ? (node as HTMLElement) : node.parentElement;
      const containerEl = el?.closest('[contenteditable]') as HTMLElement | null;
      if (containerEl && containerEl.id && containerEl.id.startsWith('block-content-')) {
        blockIdFromSelection = containerEl.id.replace('block-content-', '');
      }

      const span = document.createElement('span');
      span.style.fontSize = size;
      try {
        span.appendChild(range.extractContents());
        range.insertNode(span);
        selection.removeAllRanges();
        const newRange = document.createRange();
        newRange.selectNodeContents(span);
        selection.addRange(newRange);
        savedRangeRef.current = newRange.cloneRange();
        appliedToSelection = true;
      } catch (err) {
        console.error('Error applying font size:', err);
      }

      const targetId = blockIdFromSelection || activeBlockId;
      if (targetId) {
        const targetEl = document.getElementById(`block-content-${targetId}`);
        if (targetEl) {
          updateBlock(targetId, { text: targetEl.innerHTML });
        }
      }
    }

    if (!appliedToSelection && activeBlockId) {
      updateBlock(activeBlockId, { fontSize: size });
    }
  };

  const handleSetBlockType = (type: 'paragraph' | 'heading', level: 1 | 2 | 3 = 2) => {
    saveSelection();
    const { text: selectedText, html: selectedHtml, hasSelection } = getSelectedHtmlOrText();

    if (activeBlockId) {
      const currentBlock = blocks.find((b) => b.id === activeBlockId);
      if (currentBlock) {
        if (type === 'heading') {
          // If a specific text part was highlighted inside a larger paragraph, insert heading block
          if (hasSelection && selectedHtml && selectedHtml !== currentBlock.text && currentBlock.text && currentBlock.text.length > selectedHtml.length + 5) {
            addBlockAtCursor('heading', { level, text: selectedHtml });
          } else {
            // Convert current block to heading
            updateBlock(activeBlockId, {
              type: 'heading',
              level,
              text: currentBlock.text || selectedHtml || ''
            });
          }
        } else {
          // Convert current heading/quote/callout to paragraph
          updateBlock(activeBlockId, {
            type: 'paragraph',
            level: undefined,
            text: currentBlock.text || selectedHtml || ''
          });
        }
        return;
      }
    }

    // Fallback: Add new block
    addBlock(type, activeBlockId || undefined, type === 'heading' ? { level, text: selectedHtml } : { text: selectedHtml });
  };

  const handleAlign = (alignType: 'left' | 'center' | 'right' | 'justify') => {
    restoreSelection();
    if (activeBlockId) {
      updateBlock(activeBlockId, { align: alignType });
    }
    if (alignType === 'left') applyExecCommand('justifyLeft');
    else if (alignType === 'center') applyExecCommand('justifyCenter');
    else if (alignType === 'right') applyExecCommand('justifyRight');
    else if (alignType === 'justify') applyExecCommand('justifyFull');
  };

  const handleToggleList = (listType: 'bullet' | 'numbered') => {
    saveSelection();
    const { text: selectedText, html: selectedHtml } = getSelectedHtmlOrText();

    // 1. If text is highlighted in active editable content
    if (selectedText) {
      const lines = selectedText.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
      if (lines.length > 1) {
        // Multi-line highlighted -> convert to list block
        addBlockAtCursor('list', {
          listType,
          items: lines
        });
        return;
      }
      // Single line highlighted -> apply native list execCommand
      applyExecCommand(listType === 'bullet' ? 'insertUnorderedList' : 'insertOrderedList');
      return;
    }

    // 2. If active block is already a 'list' block
    if (activeBlock && activeBlock.id && activeBlock.type === 'list') {
      if (activeBlock.listType === listType) {
        // Toggle list back to paragraph
        const combinedText = (activeBlock.items || []).filter((it) => it.trim()).join('<br/>');
        updateBlock(activeBlock.id, {
          type: 'paragraph',
          text: combinedText || '',
          items: undefined,
          listType: undefined
        });
      } else {
        // Switch between bullet and numbered
        updateBlock(activeBlock.id, { listType });
      }
      return;
    }

    // 3. If active block is a paragraph or heading, convert it directly into a list block
    if (activeBlock && activeBlock.id && (activeBlock.type === 'paragraph' || activeBlock.type === 'heading')) {
      const rawHtml = activeBlock.text || '';
      const temp = document.createElement('div');
      temp.innerHTML = rawHtml;
      const innerText = temp.innerText || temp.textContent || '';
      const lines = innerText
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean);

      const items = lines.length > 0 ? lines : [''];
      updateBlock(activeBlock.id, {
        type: 'list',
        listType,
        items,
        text: ''
      });
      return;
    }

    // 4. Fallback: add a new list block at cursor
    addBlockAtCursor('list', {
      listType,
      items: ['']
    });
  };

  const handleInsertRichBlockWithSelection = (
    type: ArticleBlock['type'],
    extraData: Partial<ArticleBlock> = {}
  ) => {
    saveSelection();
    const { text: selectedText, html: selectedHtml } = getSelectedHtmlOrText();
    const dataToUse = { ...extraData };
    if (selectedHtml || selectedText) {
      if (type === 'quote') {
        dataToUse.text = selectedHtml || selectedText;
      } else if (type === 'callout') {
        dataToUse.text = selectedHtml || selectedText;
      } else if (type === 'code') {
        dataToUse.code = selectedText || selectedHtml;
        dataToUse.text = selectedText || selectedHtml;
      } else if (type === 'columns') {
        dataToUse.leftText = selectedHtml || selectedText;
      }
    }
    addBlockAtCursor(type, dataToUse);
  };

  const checkToolbarActiveStates = () => {
    saveSelection();
    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      strikeThrough: document.queryCommandState('strikeThrough'),
      alignLeft: document.queryCommandState('justifyLeft'),
      alignCenter: document.queryCommandState('justifyCenter'),
      alignRight: document.queryCommandState('justifyRight'),
      alignJustify: document.queryCommandState('justifyFull')
    });
  };

  // Keyboard Shortcuts (Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z, Ctrl+Y) & Selection listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) handleRedo();
        else handleUndo();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        handleRedo();
      }
    };

    const handleSelectionChange = () => {
      saveSelection();
      checkToolbarActiveStates();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, [historyIndex, history]);

  // Cursor tracking for insertion at exact cursor position
  const savedCursorContextRef = useRef<{
    blockId: string;
    beforeText: string;
    afterText: string;
  } | null>(null);

  const captureCursorContext = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return savedCursorContextRef.current;
    }
    const range = selection.getRangeAt(0);
    const targetId = activeBlockId || (blocks.length > 0 ? blocks[blocks.length - 1].id : null);

    if (targetId) {
      const el = document.getElementById(`block-content-${targetId}`);
      if (el && el.contains(range.commonAncestorContainer)) {
        try {
          const preCaretRange = range.cloneRange();
          preCaretRange.selectNodeContents(el);
          preCaretRange.setEnd(range.startContainer, range.startOffset);

          const postCaretRange = range.cloneRange();
          postCaretRange.selectNodeContents(el);
          postCaretRange.setStart(range.endContainer, range.endOffset);

          const tempDivBefore = document.createElement('div');
          tempDivBefore.appendChild(preCaretRange.cloneContents());

          const tempDivAfter = document.createElement('div');
          tempDivAfter.appendChild(postCaretRange.cloneContents());

          const ctx = {
            blockId: targetId,
            beforeText: tempDivBefore.innerHTML,
            afterText: tempDivAfter.innerHTML
          };
          savedCursorContextRef.current = ctx;
          return ctx;
        } catch (_) {}
      }
    }
    return savedCursorContextRef.current;
  };

  const handleBlockSelectionChange = (blockId: string) => {
    setActiveBlockId(blockId);
    saveSelection();
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    const el = document.getElementById(`block-content-${blockId}`);
    if (el && el.contains(range.commonAncestorContainer)) {
      try {
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(el);
        preCaretRange.setEnd(range.startContainer, range.startOffset);

        const postCaretRange = range.cloneRange();
        postCaretRange.selectNodeContents(el);
        postCaretRange.setStart(range.endContainer, range.endOffset);

        const tempDivBefore = document.createElement('div');
        tempDivBefore.appendChild(preCaretRange.cloneContents());

        const tempDivAfter = document.createElement('div');
        tempDivAfter.appendChild(postCaretRange.cloneContents());

        savedCursorContextRef.current = {
          blockId,
          beforeText: tempDivBefore.innerHTML,
          afterText: tempDivAfter.innerHTML
        };
      } catch (_) {}
    }
  };

  // Block management actions
  const updateBlock = (id: string, updates: Partial<ArticleBlock>) => {
    const newBlocks = blocks.map((b) => (b.id === id ? { ...b, ...updates } : b));
    syncChanges(newBlocks);
  };

  const addBlockAtCursor = (
    type: ArticleBlock['type'],
    extraData: Partial<ArticleBlock> = {}
  ) => {
    const newBlock: ArticleBlock = {
      id: `b-${Date.now()}`,
      type,
      text: '',
      align: 'left',
      ...extraData
    };

    if (type === 'table' && !newBlock.headers) {
      newBlock.headers = ['Tiêu chí', 'Sản phẩm A', 'Sản phẩm B', 'Đánh giá'];
      newBlock.rows = [
        ['Công suất', '1500W', '1800W', 'Tốt'],
        ['Dung tích', '5.5 Lít', '6.0 Lít', 'Rất tốt']
      ];
    } else if (type === 'list' && !newBlock.items) {
      newBlock.items = ['Tính năng nổi bật 1', 'Tính năng nổi bật 2'];
      newBlock.listType = 'bullet';
    } else if (type === 'callout' && !newBlock.text) {
      newBlock.calloutType = 'tip';
      newBlock.caption = 'Mẹo Chọn Mua';
      newBlock.text = 'Kiểm tra kỹ tem bảo hành và chứng nhận chất lượng trước khi đặt mua.';
    } else if (type === 'columns' && !newBlock.leftTitle) {
      newBlock.layout = '50-50';
      newBlock.leftTitle = 'Ưu điểm nổi bật';
      newBlock.leftText = 'Thiết kế sang trọng, tiết kiệm điện năng tới 30%.';
      newBlock.rightTitle = 'Lưu ý sử dụng';
      newBlock.rightText = 'Vệ sinh định kỳ sau mỗi lần nấu nướng.';
    }

    const cursorCtx = captureCursorContext();
    const targetBlockId = cursorCtx?.blockId || activeBlockId;
    const currentIdx = targetBlockId ? blocks.findIndex((b) => b.id === targetBlockId) : blocks.length - 1;
    const validIdx = currentIdx !== -1 ? currentIdx : Math.max(0, blocks.length - 1);

    const newBlocks = [...blocks];
    const currentBlock = newBlocks[validIdx];

    // Case 1: Cursor was inside text -> split the active paragraph/heading at cursor
    if (
      cursorCtx &&
      cursorCtx.blockId === targetBlockId &&
      (cursorCtx.beforeText.trim() || cursorCtx.afterText.trim()) &&
      currentBlock &&
      (currentBlock.type === 'paragraph' || currentBlock.type === 'heading')
    ) {
      currentBlock.text = cursorCtx.beforeText;
      const nextParagraph: ArticleBlock = {
        id: `p-${Date.now() + 1}`,
        type: 'paragraph',
        text: cursorCtx.afterText,
        align: currentBlock.align || 'left'
      };

      newBlocks.splice(validIdx + 1, 0, newBlock, nextParagraph);
      syncChanges(newBlocks);
      setActiveBlockId(nextParagraph.id || null);
      savedCursorContextRef.current = null;
      return;
    }

    // Case 2: Current block is an empty paragraph -> replace it with the new block
    if (currentBlock && currentBlock.type === 'paragraph' && (!currentBlock.text || !currentBlock.text.trim())) {
      newBlocks[validIdx] = newBlock;
      const nextParagraph: ArticleBlock = {
        id: `p-${Date.now() + 1}`,
        type: 'paragraph',
        text: '',
        align: 'left'
      };
      newBlocks.splice(validIdx + 1, 0, nextParagraph);
      syncChanges(newBlocks);
      setActiveBlockId(nextParagraph.id || null);
      savedCursorContextRef.current = null;
      return;
    }

    // Case 3: Insert directly after current active block
    const nextParagraph: ArticleBlock = {
      id: `p-${Date.now() + 1}`,
      type: 'paragraph',
      text: '',
      align: 'left'
    };
    newBlocks.splice(validIdx + 1, 0, newBlock, nextParagraph);
    syncChanges(newBlocks);
    setActiveBlockId(nextParagraph.id || null);
    savedCursorContextRef.current = null;
  };

  const addBlock = (type: ArticleBlock['type'], afterId?: string, extraData: Partial<ArticleBlock> = {}) => {
    if (afterId) {
      setActiveBlockId(afterId);
    }
    addBlockAtCursor(type, extraData);
  };

  const handleZoomImage = (blockId: string, currentWidthVal: string | undefined, delta: number) => {
    const current = parsePercent(currentWidthVal);
    const next = Math.min(100, Math.max(20, current + delta));
    updateBlock(blockId, { width: `${next}%` });
  };

  const handlePasteEvent = (e: React.ClipboardEvent<HTMLElement>): boolean => {
    const imageCount = blocks.filter((b) => b.type === 'image').length;

    // 1. Check if image file / screenshot was pasted directly
    const items = e.clipboardData?.items;
    if (items && items.length > 0) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          e.preventDefault();
          const blob = items[i].getAsFile();
          if (blob) {
            const fileName = blob.name && !blob.name.startsWith('image') ? blob.name : '';
            const autoCaption = generateDefaultImageCaption(fileName, slug, title, imageCount);
            const reader = new FileReader();
            reader.onload = (loadEvt) => {
              const dataUrl = loadEvt.target?.result as string;
              if (dataUrl) {
                addBlockAtCursor('image', {
                  url: dataUrl,
                  width: '100%',
                  align: 'center',
                  caption: autoCaption
                });
              }
            };
            reader.readAsDataURL(blob);
          }
          return true;
        }
      }
    }

    // 2. Check if pasted HTML contains <img> tag
    const html = e.clipboardData?.getData('text/html');
    if (html && /<img\b[^>]+src=["']([^"']+)["']/i.test(html)) {
      const match = html.match(/<img\b[^>]+src=["']([^"']+)["']/i);
      if (match && match[1]) {
        e.preventDefault();
        const autoCaption = generateDefaultImageCaption(match[1], slug, title, imageCount);
        addBlockAtCursor('image', {
          url: match[1],
          width: '100%',
          align: 'center',
          caption: autoCaption
        });
        return true;
      }
    }

    return false;
  };

  const deleteBlock = (id: string) => {
    if (blocks.length <= 1) {
      syncChanges([{ id: 'b-1', type: 'paragraph', text: '', align: 'left' }]);
      return;
    }
    const newBlocks = blocks.filter((b) => b.id !== id);
    syncChanges(newBlocks);
  };

  const moveBlock = (id: string, direction: 'up' | 'down') => {
    const idx = blocks.findIndex((b) => b.id === id);
    if (idx === -1) return;
    if (direction === 'up' && idx === 0) return;
    if (direction === 'down' && idx === blocks.length - 1) return;

    const next = [...blocks];
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    const temp = next[idx];
    next[idx] = next[targetIdx];
    next[targetIdx] = temp;
    syncChanges(next);
  };

  const duplicateBlock = (id: string) => {
    const idx = blocks.findIndex((b) => b.id === id);
    if (idx === -1) return;
    const original = blocks[idx];
    const clone: ArticleBlock = {
      ...JSON.parse(JSON.stringify(original)),
      id: `b-${Date.now()}`
    };
    const next = [...blocks];
    next.splice(idx + 1, 0, clone);
    syncChanges(next);
  };

  // Word count & Reading time
  const wordCount = useMemo(() => {
    const allText = blocks
      .map((b) => {
        if (b.type === 'table') return [...(b.headers || []), ...(b.rows || []).flat()].join(' ');
        if (b.type === 'list') return (b.items || []).join(' ');
        return b.text || b.code || '';
      })
      .join(' ')
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    return allText ? allText.split(' ').length : 0;
  }, [blocks]);

  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // Color swatches
  const colorSwatches = [
    '#0f172a', '#334155', '#ea580c', '#e11d48', '#2563eb', '#16a34a', '#d97706', '#9333ea'
  ];
  const highlightSwatches = [
    { name: 'Xóa màu nền', color: 'transparent' },
    { name: 'Vàng chanh', color: '#fef08a' },
    { name: 'Xanh lá nhạt', color: '#bbf7d0' },
    { name: 'Xanh biển nhạt', color: '#bae6fd' },
    { name: 'Hồng phấn', color: '#fbcfe8' },
    { name: 'Cam nhạt', color: '#fed7aa' },
    { name: 'Xám sáng', color: '#e2e8f0' }
  ];

  return (
    <div
      className={`transition-all duration-300 flex flex-col ${
        isFullscreen
          ? 'fixed inset-4 z-50 shadow-2xl bg-white border border-slate-200 rounded-3xl overflow-hidden'
          : embedded
          ? 'relative bg-white'
          : 'relative bg-white border border-slate-200 rounded-3xl shadow-sm'
      }`}
    >
      {/* 1. TOP MS WORD-STYLE RIBBON TOOLBAR - 2 ROWS & STICKY AT TOP */}
      <div className="bg-white/95 border-b border-slate-200 py-2.5 px-3 sm:px-6 select-none sticky top-[57px] z-30 backdrop-blur-md shadow-xs space-y-1.5 rounded-t-3xl">
        {/* ROW 1: Typography & Text Formatting */}
        <div className="flex items-center gap-1 sm:gap-1.5 flex-nowrap overflow-x-auto no-scrollbar pb-0.5">
          {/* History Undo / Redo */}
          <div className="flex items-center bg-slate-50/80 rounded-xl border border-slate-200/90 p-0.5 shadow-2xs shrink-0">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className="p-1 rounded-lg text-slate-700 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
              title="Hoàn tác (Ctrl+Z)"
            >
              <Undo className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="p-1 rounded-lg text-slate-700 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
              title="Làm lại (Ctrl+Y)"
            >
              <Redo className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-4 w-[1px] bg-slate-200 shrink-0" />

          {/* Quick Typography Style Buttons (Applies to highlighted text or active block) */}
          <div className="flex items-center bg-slate-50/80 rounded-xl border border-slate-200/90 p-0.5 shadow-2xs shrink-0">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSetBlockType('paragraph')}
              className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeBlock?.type === 'paragraph'
                  ? 'bg-orange-100 text-orange-700'
                  : 'text-slate-700 hover:bg-white'
              }`}
              title="Chuyển sang đoạn văn thường (hoặc áp dụng cho phần bôi đen)"
            >
              Đoạn
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSetBlockType('heading', 1)}
              className={`px-1.5 py-0.5 rounded-lg text-xs font-black transition-colors cursor-pointer ${
                activeBlock?.type === 'heading' && activeBlock?.level === 1
                  ? 'bg-orange-100 text-orange-700'
                  : 'text-slate-900 hover:bg-white'
              }`}
              title="Chuyển sang tiêu đề H1 (hoặc tạo H1 từ phần bôi đen)"
            >
              H1
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSetBlockType('heading', 2)}
              className={`px-1.5 py-0.5 rounded-lg text-xs font-black transition-colors cursor-pointer ${
                activeBlock?.type === 'heading' && activeBlock?.level === 2
                  ? 'bg-orange-100 text-orange-700'
                  : 'text-slate-900 hover:bg-white'
              }`}
              title="Chuyển sang tiêu đề H2 (hoặc tạo H2 từ phần bôi đen)"
            >
              H2
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSetBlockType('heading', 3)}
              className={`px-1.5 py-0.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeBlock?.type === 'heading' && activeBlock?.level === 3
                  ? 'bg-orange-100 text-orange-700'
                  : 'text-slate-900 hover:bg-white'
              }`}
              title="Chuyển sang tiêu đề H3 (hoặc tạo H3 từ phần bôi đen)"
            >
              H3
            </button>
          </div>

          <div className="h-4 w-[1px] bg-slate-200 shrink-0" />

          {/* Font Size Selector (Applies to highlighted text or active block) */}
          <div
            onMouseDown={() => saveSelection()}
            className="flex items-center bg-slate-50/80 rounded-xl border border-slate-200/90 px-1 py-0.5 shadow-2xs shrink-0"
          >
            <Type className="w-3.5 h-3.5 text-slate-500 mr-0.5 shrink-0" />
            <select
              value={activeBlock?.fontSize || ''}
              onChange={(e) => applyFontSize(e.target.value)}
              className="text-xs font-semibold text-slate-700 bg-transparent py-0.5 pr-0.5 outline-none cursor-pointer hover:text-orange-600 transition-colors"
              title="Chọn cỡ chữ cho đoạn / phần bôi đen"
            >
              <option value="">Cỡ chữ</option>
              <option value="12px">12px</option>
              <option value="13px">13px</option>
              <option value="14px">14px</option>
              <option value="15px">15px</option>
              <option value="16px">16px (Chuẩn)</option>
              <option value="18px">18px</option>
              <option value="20px">20px</option>
              <option value="24px">24px</option>
              <option value="28px">28px</option>
              <option value="32px">32px</option>
              <option value="36px">36px</option>
              <option value="40px">40px</option>
              <option value="48px">48px</option>
            </select>
          </div>

          <div className="h-4 w-[1px] bg-slate-200 shrink-0" />

          {/* Inline Text Styling (B, I, U, S) */}
          <div className="flex items-center bg-slate-50/80 rounded-xl border border-slate-200/90 p-0.5 shadow-2xs shrink-0">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => applyExecCommand('bold')}
              className={`p-1 rounded-lg transition-colors cursor-pointer ${
                activeFormats.bold ? 'bg-orange-100 text-orange-700 font-bold' : 'text-slate-600 hover:bg-white'
              }`}
              title="In đậm (Ctrl+B) cho phần bôi đen"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => applyExecCommand('italic')}
              className={`p-1 rounded-lg transition-colors cursor-pointer ${
                activeFormats.italic ? 'bg-orange-100 text-orange-700' : 'text-slate-600 hover:bg-white'
              }`}
              title="In nghiêng (Ctrl+I) cho phần bôi đen"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => applyExecCommand('underline')}
              className={`p-1 rounded-lg transition-colors cursor-pointer ${
                activeFormats.underline ? 'bg-orange-100 text-orange-700' : 'text-slate-600 hover:bg-white'
              }`}
              title="Gạch chân (Ctrl+U) cho phần bôi đen"
            >
              <Underline className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => applyExecCommand('strikeThrough')}
              className={`p-1 rounded-lg transition-colors cursor-pointer ${
                activeFormats.strikeThrough ? 'bg-orange-100 text-orange-700' : 'text-slate-600 hover:bg-white'
              }`}
              title="Gạch ngang cho phần bôi đen"
            >
              <Strikethrough className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-4 w-[1px] bg-slate-200 shrink-0" />

          {/* Alignment (Left, Center, Right, Justify) */}
          <div className="flex items-center bg-slate-50/80 rounded-xl border border-slate-200/90 p-0.5 shadow-2xs shrink-0">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleAlign('left')}
              className={`p-1 rounded-lg cursor-pointer transition-colors ${
                activeBlock?.align === 'left' || activeFormats.alignLeft ? 'bg-orange-100 text-orange-700 font-bold' : 'text-slate-600 hover:bg-white'
              }`}
              title="Căn trái"
            >
              <AlignLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleAlign('center')}
              className={`p-1 rounded-lg cursor-pointer transition-colors ${
                activeBlock?.align === 'center' || activeFormats.alignCenter ? 'bg-orange-100 text-orange-700 font-bold' : 'text-slate-600 hover:bg-white'
              }`}
              title="Căn giữa"
            >
              <AlignCenter className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleAlign('right')}
              className={`p-1 rounded-lg cursor-pointer transition-colors ${
                activeBlock?.align === 'right' || activeFormats.alignRight ? 'bg-orange-100 text-orange-700 font-bold' : 'text-slate-600 hover:bg-white'
              }`}
              title="Căn phải"
            >
              <AlignRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleAlign('justify')}
              className={`p-1 rounded-lg cursor-pointer transition-colors ${
                activeBlock?.align === 'justify' || activeFormats.alignJustify ? 'bg-orange-100 text-orange-700 font-bold' : 'text-slate-600 hover:bg-white'
              }`}
              title="Căn đều 2 bên (Justify)"
            >
              <AlignJustify className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-4 w-[1px] bg-slate-200 shrink-0" />

          {/* Lists: Bullet & Numbered */}
          <div className="flex items-center bg-slate-50/80 rounded-xl border border-slate-200/90 p-0.5 shadow-2xs shrink-0">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleToggleList('bullet')}
              className={`p-1 rounded-lg transition-colors cursor-pointer ${
                activeBlock?.type === 'list' && activeBlock?.listType !== 'numbered'
                  ? 'bg-orange-100 text-orange-700 font-bold'
                  : 'text-slate-600 hover:text-orange-600 hover:bg-white'
              }`}
              title="Danh sách dấu chấm (Bullet List) cho đoạn / phần bôi đen"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleToggleList('numbered')}
              className={`p-1 rounded-lg transition-colors cursor-pointer ${
                activeBlock?.type === 'list' && activeBlock?.listType === 'numbered'
                  ? 'bg-orange-100 text-orange-700 font-bold'
                  : 'text-slate-600 hover:text-orange-600 hover:bg-white'
              }`}
              title="Danh sách số thứ tự (Numbered List) cho đoạn / phần bôi đen"
            >
              <ListOrdered className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-4 w-[1px] bg-slate-200 shrink-0" />

          {/* Line Spacing Selector (Giãn dòng) */}
          <div
            onMouseDown={() => saveSelection()}
            className="flex items-center bg-slate-50/80 rounded-xl border border-slate-200/90 px-1 py-0.5 shadow-2xs shrink-0"
          >
            <span className="text-[11px] font-bold text-slate-400 mr-0.5 select-none">↕</span>
            <select
              value={activeBlock?.lineHeight || ''}
              onChange={(e) => {
                if (activeBlockId) {
                  updateBlock(activeBlockId, { lineHeight: e.target.value });
                }
              }}
              className="text-xs font-semibold text-slate-700 bg-transparent py-0.5 pr-0.5 outline-none cursor-pointer hover:text-orange-600 transition-colors"
              title="Khoảng cách giãn dòng (Line Spacing)"
            >
              <option value="">Giãn dòng</option>
              <option value="1.0">1.0 (Chặt)</option>
              <option value="1.25">1.25 (Gọn)</option>
              <option value="1.5">1.5 (Chuẩn)</option>
              <option value="1.75">1.75 (Thoáng)</option>
              <option value="2.0">2.0 (Rộng)</option>
              <option value="2.5">2.5 (Rất rộng)</option>
            </select>
          </div>
        </div>

        {/* ROW 2: Insert Media & Rich Elements (Applies to highlighted text or creates new element) */}
        <div className="flex items-center gap-1 sm:gap-1.5 flex-nowrap overflow-x-auto no-scrollbar pt-1.5 border-t border-slate-100">
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              saveSelection();
              captureCursorContext();
              const { text } = getSelectedHtmlOrText();
              setLinkText(text);
              setLinkUrl('');
              setLinkModalOpen(true);
            }}
            className="px-2.5 py-1 rounded-xl bg-slate-50 hover:bg-orange-50 hover:text-orange-600 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Chèn liên kết web (Ctrl+K) vào chữ bôi đen"
          >
            <LinkIcon className="w-3.5 h-3.5 text-orange-500" />
            <span>Liên kết</span>
          </button>

          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              captureCursorContext();
              const existingCount = blocks.filter((b) => b.type === 'image').length;
              setImageCaption(generateDefaultImageCaption(undefined, slug, title, existingCount));
              setImageUrl('');
              setImageTab('upload');
              setImageModalOpen(true);
            }}
            className="px-2.5 py-1 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-600 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Chèn ảnh minh họa (Tải từ máy / URL)"
          >
            <ImageIcon className="w-3.5 h-3.5 text-emerald-500" />
            <span>Hình ảnh</span>
          </button>

          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              captureCursorContext();
              setVideoUrl('');
              setVideoTab('upload');
              setVideoModalOpen(true);
            }}
            className="px-2.5 py-1 rounded-xl bg-slate-50 hover:bg-rose-50 hover:text-rose-600 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Chèn / Tải video (Chọn từ máy / YouTube / Vimeo)"
          >
            <Video className="w-3.5 h-3.5 text-rose-500" />
            <span>Video</span>
          </button>

          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => addBlockAtCursor('table')}
            className="px-2.5 py-1 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Chèn bảng so sánh"
          >
            <TableIcon className="w-3.5 h-3.5 text-indigo-500" />
            <span>Bảng</span>
          </button>

          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => handleInsertRichBlockWithSelection('columns')}
            className="px-2.5 py-1 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-purple-600 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Chèn khối chia 2 cột (sử dụng chữ bôi đen nếu có)"
          >
            <ColumnsIcon className="w-3.5 h-3.5 text-purple-500" />
            <span>Chia cột</span>
          </button>

          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => handleInsertRichBlockWithSelection('quote')}
            className="px-2.5 py-1 rounded-xl bg-slate-50 hover:bg-amber-50 hover:text-amber-600 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Tạo trích dẫn nổi bật từ phần bôi đen"
          >
            <Quote className="w-3.5 h-3.5 text-amber-500" />
            <span>Trích dẫn</span>
          </button>

          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => handleInsertRichBlockWithSelection('callout')}
            className="px-2.5 py-1 rounded-xl bg-slate-50 hover:bg-amber-50 hover:text-amber-600 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Tạo hộp mẹo / lưu ý từ phần bôi đen"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>Mẹo hay</span>
          </button>

          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => handleInsertRichBlockWithSelection('code')}
            className="px-2.5 py-1 rounded-xl bg-slate-50 hover:bg-cyan-50 hover:text-cyan-600 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Tạo đoạn code từ phần bôi đen"
          >
            <CodeIcon className="w-3.5 h-3.5 text-cyan-600" />
            <span>Code</span>
          </button>

          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => addBlockAtCursor('divider')}
            className="px-2.5 py-1 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Chèn đường phân đoạn"
          >
            <Minus className="w-3.5 h-3.5" />
            <span>Phân cách</span>
          </button>
        </div>
      </div>

      {/* 2. EDITOR BODY AREA - Unified Continuous Document Page (Like MS Word) */}
      <div
        className={
          embedded
            ? 'p-6 sm:p-12 max-w-4xl mx-auto w-full space-y-4 relative transition-all'
            : 'flex-1 p-4 sm:p-8 bg-slate-100/60'
        }
        style={{ minHeight }}
      >
        {/* Header Metadata Content (Cover image, Title, Slug, Categories, Excerpt) situated directly inside the document flow */}
        {headerContent && (
          <div className="space-y-6 pb-6 border-b border-slate-100">
            {headerContent}
          </div>
        )}

        <div
          onClick={(e) => {
            if (e.target === e.currentTarget && blocks.length > 0) {
              setActiveBlockId(blocks[blocks.length - 1].id || null);
            }
          }}
          onPaste={(e) => {
            const target = e.target as HTMLElement;
            if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA') return;
            if (!target?.isContentEditable) {
              handlePasteEvent(e);
            }
          }}
          className={
            embedded
              ? 'space-y-2 relative w-full'
              : 'max-w-4xl mx-auto bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-12 min-h-[600px] space-y-2 relative transition-all'
          }
        >
          {blocks.map((block, idx) => {
            return (
              <div
                key={block.id || idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveBlockId(block.id || null);
                }}
                className="relative group my-0.5"
              >
                {/* BLOCK CONTENT BY TYPE */}

                {/* A. HEADING BLOCK */}
                {block.type === 'heading' && (
                  <EditableContent
                    id={`block-content-${block.id}`}
                    html={block.text || ''}
                    onInput={(html) => updateBlock(block.id!, { text: html })}
                    onKeyUp={() => handleBlockSelectionChange(block.id!)}
                    onMouseUp={() => handleBlockSelectionChange(block.id!)}
                    onFocus={() => handleBlockSelectionChange(block.id!)}
                    onBlur={checkToolbarActiveStates}
                    className={`${
                      block.level === 1
                        ? 'text-2xl sm:text-3xl font-black pt-3 pb-1'
                        : block.level === 3
                        ? 'text-lg sm:text-xl font-bold pt-2 pb-0.5'
                        : 'text-xl sm:text-2xl font-black pt-2.5 pb-1'
                    } text-slate-900 outline-none focus:ring-0 leading-snug cursor-text`}
                    style={{
                      textAlign: block.align || 'left',
                      fontSize: block.fontSize || undefined,
                      lineHeight: block.lineHeight || undefined,
                      color: block.color || undefined
                    }}
                    placeholder="Nhập tiêu đề phần..."
                  />
                )}

                {/* B. PARAGRAPH BLOCK */}
                {block.type === 'paragraph' && (
                  <EditableContent
                    id={`block-content-${block.id}`}
                    html={block.text || ''}
                    onInput={(html) => updateBlock(block.id!, { text: html })}
                    onKeyUp={() => handleBlockSelectionChange(block.id!)}
                    onMouseUp={() => handleBlockSelectionChange(block.id!)}
                    onFocus={() => handleBlockSelectionChange(block.id!)}
                    onPaste={(e) => {
                      const handled = handlePasteEvent(e);
                      if (!handled) {
                        e.preventDefault();
                        const html = e.clipboardData.getData('text/html');
                        const text = e.clipboardData.getData('text/plain');
                        if (html) {
                          document.execCommand('insertHTML', false, cleanPastedHtml(html));
                        } else {
                          document.execCommand('insertText', false, text);
                        }
                        const el = document.getElementById(`block-content-${block.id}`);
                        if (el) {
                          updateBlock(block.id!, { text: el.innerHTML });
                        }
                      }
                    }}
                    onBlur={checkToolbarActiveStates}
                    className="text-base text-slate-800 outline-none focus:ring-0 leading-relaxed cursor-text min-h-[1.75em]"
                    style={{
                      textAlign: block.align || 'left',
                      fontSize: block.fontSize || undefined,
                      lineHeight: block.lineHeight || undefined,
                      color: block.color || undefined
                    }}
                    placeholder={placeholder}
                  />
                )}

                {/* C. IMAGE BLOCK */}
                {block.type === 'image' && (() => {
                  const currentWidthStr = block.width || '100%';
                  const currentWidthNum = parsePercent(currentWidthStr);
                  const currentAlign = block.align || 'center';
                  const alignWrapperClass =
                    currentAlign === 'left'
                      ? 'mr-auto items-start text-left'
                      : currentAlign === 'right'
                      ? 'ml-auto items-end text-right'
                      : 'mx-auto items-center text-center';

                  return (
                    <div className={`relative group/media my-6 flex flex-col ${alignWrapperClass} transition-all duration-200`}>
                      {/* Floating Toolbar Beside / Above Image for Zoom & Size Controls */}
                      <div className="flex flex-wrap items-center gap-1 p-1 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-md z-20 mb-2.5 transition-all">
                        {/* Quick Zoom Out */}
                        <button
                          type="button"
                          onClick={() => handleZoomImage(block.id!, block.width, -10)}
                          className="p-1.5 rounded-xl text-slate-600 hover:text-orange-600 hover:bg-orange-50 transition-colors cursor-pointer"
                          title="Thu nhỏ ảnh (-10%)"
                        >
                          <ZoomOut className="w-3.5 h-3.5" />
                        </button>

                        {/* Width Slider & Badge */}
                        <div className="flex items-center gap-1.5 px-2 bg-slate-50 rounded-xl border border-slate-200/80 py-0.5">
                          <input
                            type="range"
                            min="20"
                            max="100"
                            step="5"
                            value={currentWidthNum}
                            onChange={(e) => updateBlock(block.id!, { width: `${e.target.value}%` })}
                            className="w-16 h-1.5 accent-orange-500 bg-slate-200 rounded-lg cursor-pointer"
                            title="Kéo thanh trượt để chỉnh kích thước ảnh"
                          />
                          <span className="text-[11px] font-bold text-slate-700 min-w-[32px] text-right">
                            {currentWidthNum}%
                          </span>
                        </div>

                        {/* Quick Zoom In */}
                        <button
                          type="button"
                          onClick={() => handleZoomImage(block.id!, block.width, 10)}
                          className="p-1.5 rounded-xl text-slate-600 hover:text-orange-600 hover:bg-orange-50 transition-colors cursor-pointer"
                          title="Phóng to ảnh (+10%)"
                        >
                          <ZoomIn className="w-3.5 h-3.5" />
                        </button>

                        <div className="h-4 w-[1px] bg-slate-200 mx-0.5" />

                        {/* Size Presets */}
                        <div className="flex items-center gap-0.5 bg-slate-100/80 p-0.5 rounded-xl text-[11px] font-bold">
                          {['25%', '50%', '75%', '100%'].map((sz) => {
                            const isSelected = currentWidthStr === sz;
                            return (
                              <button
                                key={sz}
                                type="button"
                                onClick={() => updateBlock(block.id!, { width: sz })}
                                className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                                  isSelected
                                    ? 'bg-orange-600 text-white shadow-2xs'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                                }`}
                                title={`Đặt kích thước ${sz}`}
                              >
                                {sz}
                              </button>
                            );
                          })}
                        </div>

                        <div className="h-4 w-[1px] bg-slate-200 mx-0.5" />

                        {/* Alignment buttons */}
                        <div className="flex items-center gap-0.5 bg-slate-100/80 p-0.5 rounded-xl">
                          <button
                            type="button"
                            onClick={() => updateBlock(block.id!, { align: 'left' })}
                            className={`p-1 rounded-lg transition-colors cursor-pointer ${
                              currentAlign === 'left' ? 'bg-white text-orange-600 shadow-2xs font-bold' : 'text-slate-500 hover:bg-white'
                            }`}
                            title="Căn trái ảnh"
                          >
                            <AlignLeft className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => updateBlock(block.id!, { align: 'center' })}
                            className={`p-1 rounded-lg transition-colors cursor-pointer ${
                              currentAlign === 'center' ? 'bg-white text-orange-600 shadow-2xs font-bold' : 'text-slate-500 hover:bg-white'
                            }`}
                            title="Căn giữa ảnh"
                          >
                            <AlignCenter className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => updateBlock(block.id!, { align: 'right' })}
                            className={`p-1 rounded-lg transition-colors cursor-pointer ${
                              currentAlign === 'right' ? 'bg-white text-orange-600 shadow-2xs font-bold' : 'text-slate-500 hover:bg-white'
                            }`}
                            title="Căn phải ảnh"
                          >
                            <AlignRight className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="h-4 w-[1px] bg-slate-200 mx-0.5" />

                        {/* Delete Image button */}
                        <button
                          type="button"
                          onClick={() => deleteBlock(block.id!)}
                          className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Xóa hình ảnh này"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Image Container with Dynamic Scaled Width */}
                      <div
                        className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm transition-all duration-200"
                        style={{ width: `${currentWidthNum}%`, maxWidth: '100%' }}
                      >
                        <img
                          src={optimizeImageUrl(block.url || '', { width: 1200 })}
                          alt={block.caption || 'Ảnh minh họa'}
                          className="w-full h-auto object-cover rounded-2xl block mx-auto transition-transform"
                        />
                      </div>

                      {/* Image Caption */}
                      <input
                        type="text"
                        value={block.caption || ''}
                        onChange={(e) => updateBlock(block.id!, { caption: e.target.value })}
                        placeholder="Nhập chú thích ảnh minh họa (tùy chọn)..."
                        className="text-center text-xs text-slate-500 italic bg-transparent outline-none border-b border-transparent focus:border-slate-300 py-1 transition-all mt-1"
                        style={{ width: `${currentWidthNum}%`, maxWidth: '100%' }}
                      />
                    </div>
                  );
                })()}

                {/* D. QUOTE BLOCK */}
                {block.type === 'quote' && (
                  <div className="relative group/media p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-orange-50/80 to-amber-50/40 border-l-4 border-orange-500 space-y-2 my-4">
                    <button
                      type="button"
                      onClick={() => deleteBlock(block.id!)}
                      className="opacity-0 group-hover/media:opacity-100 transition-opacity absolute top-3 right-3 z-10 p-1.5 rounded-lg bg-white/90 hover:bg-rose-50 text-slate-400 hover:text-rose-600 shadow-xs border border-slate-200 cursor-pointer"
                      title="Xóa trích dẫn"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <EditableContent
                      id={`block-content-${block.id}`}
                      html={block.text || ''}
                      onInput={(html) => updateBlock(block.id!, { text: html })}
                      onKeyUp={() => handleBlockSelectionChange(block.id!)}
                      onMouseUp={() => handleBlockSelectionChange(block.id!)}
                      onFocus={() => handleBlockSelectionChange(block.id!)}
                      className="text-base sm:text-lg italic font-medium text-slate-800 outline-none cursor-text pr-8"
                      style={{
                        textAlign: block.align || 'left',
                        fontSize: block.fontSize || undefined,
                        lineHeight: block.lineHeight || undefined,
                        color: block.color || undefined
                      }}
                      placeholder="Nhập câu trích dẫn nổi bật..."
                    />
                    <input
                      type="text"
                      value={block.author || ''}
                      onChange={(e) => updateBlock(block.id!, { author: e.target.value })}
                      placeholder="Tác giả câu nói (VD: Steve Jobs)..."
                      className="text-xs font-bold text-orange-700 bg-transparent outline-none w-full uppercase tracking-wider"
                    />
                  </div>
                )}

                {/* E. CALLOUT / ALERT BLOCK */}
                {block.type === 'callout' && (
                  <div className="relative group/media p-4 rounded-2xl bg-amber-50/80 border border-amber-300 text-amber-900 space-y-2 my-4">
                    <button
                      type="button"
                      onClick={() => deleteBlock(block.id!)}
                      className="opacity-0 group-hover/media:opacity-100 transition-opacity absolute top-3 right-3 z-10 p-1.5 rounded-lg bg-white/90 hover:bg-rose-50 text-slate-400 hover:text-rose-600 shadow-xs border border-slate-200 cursor-pointer"
                      title="Xóa hộp mẹo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-600" />
                      <input
                        type="text"
                        value={block.caption || 'Mẹo Chọn Mua'}
                        onChange={(e) => updateBlock(block.id!, { caption: e.target.value })}
                        className="font-bold text-xs uppercase tracking-wider bg-transparent outline-none text-amber-900"
                      />
                    </div>
                    <EditableContent
                      id={`block-content-${block.id}`}
                      html={block.text || ''}
                      onInput={(html) => updateBlock(block.id!, { text: html })}
                      onKeyUp={() => handleBlockSelectionChange(block.id!)}
                      onMouseUp={() => handleBlockSelectionChange(block.id!)}
                      onFocus={() => handleBlockSelectionChange(block.id!)}
                      className="text-xs sm:text-sm leading-relaxed outline-none cursor-text pr-8"
                      style={{
                        fontSize: block.fontSize || undefined,
                        lineHeight: block.lineHeight || undefined,
                        textAlign: block.align || 'left'
                      }}
                      placeholder="Nhập nội dung lưu ý / mẹo..."
                    />
                  </div>
                )}

                {/* LIST BLOCK */}
                {block.type === 'list' && block.items && (
                  <div className="relative group/media space-y-2 my-4 pl-2">
                    <button
                      type="button"
                      onClick={() => deleteBlock(block.id!)}
                      className="opacity-0 group-hover/media:opacity-100 transition-opacity absolute top-0 right-2 z-10 p-1 rounded-lg bg-white/90 hover:bg-rose-50 text-slate-400 hover:text-rose-600 shadow-xs border border-slate-200 cursor-pointer"
                      title="Xóa danh sách"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-bold text-orange-600 uppercase text-[11px]">
                        {block.listType === 'numbered' ? 'Danh sách số' : 'Danh sách dấu chấm'}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          updateBlock(block.id!, {
                            listType: block.listType === 'numbered' ? 'bullet' : 'numbered'
                          });
                        }}
                        className="text-[11px] text-slate-500 hover:text-orange-600 underline mr-8 cursor-pointer"
                      >
                        Đổi sang {block.listType === 'numbered' ? 'dấu chấm' : 'số thứ tự'}
                      </button>
                    </div>
                    {block.listType === 'numbered' ? (
                      <ol className="space-y-1.5 list-decimal list-inside text-slate-800 text-sm sm:text-base">
                        {block.items.map((item, iIdx) => (
                          <li key={iIdx} className="pl-1">
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => {
                                const nextItems = [...block.items!];
                                nextItems[iIdx] = e.target.value;
                                updateBlock(block.id!, { items: nextItems });
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  const nextItems = [...block.items!];
                                  nextItems.splice(iIdx + 1, 0, '');
                                  updateBlock(block.id!, { items: nextItems });
                                } else if (e.key === 'Backspace' && !item && block.items!.length > 1) {
                                  e.preventDefault();
                                  const nextItems = block.items!.filter((_, idx2) => idx2 !== iIdx);
                                  updateBlock(block.id!, { items: nextItems });
                                }
                              }}
                              placeholder={`Mục ${iIdx + 1}...`}
                              className="bg-transparent outline-none w-[90%] border-b border-transparent focus:border-slate-300 py-0.5"
                              style={{ fontSize: block.fontSize || undefined, lineHeight: block.lineHeight || undefined }}
                            />
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <ul className="space-y-1.5 list-disc list-inside text-slate-800 text-sm sm:text-base">
                        {block.items.map((item, iIdx) => (
                          <li key={iIdx} className="pl-1">
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => {
                                const nextItems = [...block.items!];
                                nextItems[iIdx] = e.target.value;
                                updateBlock(block.id!, { items: nextItems });
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  const nextItems = [...block.items!];
                                  nextItems.splice(iIdx + 1, 0, '');
                                  updateBlock(block.id!, { items: nextItems });
                                } else if (e.key === 'Backspace' && !item && block.items!.length > 1) {
                                  e.preventDefault();
                                  const nextItems = block.items!.filter((_, idx2) => idx2 !== iIdx);
                                  updateBlock(block.id!, { items: nextItems });
                                }
                              }}
                              placeholder="Nội dung mục danh sách..."
                              className="bg-transparent outline-none w-[90%] border-b border-transparent focus:border-slate-300 py-0.5"
                              style={{ fontSize: block.fontSize || undefined, lineHeight: block.lineHeight || undefined }}
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        updateBlock(block.id!, { items: [...block.items!, ''] });
                      }}
                      className="text-xs text-orange-600 hover:text-orange-700 font-semibold pt-1 block cursor-pointer"
                    >
                      + Thêm mục mới
                    </button>
                  </div>
                )}

                {/* F. TABLE BLOCK */}
                {block.type === 'table' && block.headers && block.rows && (
                  <div className="relative group/media space-y-3 my-4">
                    <button
                      type="button"
                      onClick={() => deleteBlock(block.id!)}
                      className="opacity-0 group-hover/media:opacity-100 transition-opacity absolute top-2 right-2 z-10 p-1.5 rounded-lg bg-white/90 hover:bg-rose-50 text-slate-400 hover:text-rose-600 shadow-xs border border-slate-200 cursor-pointer"
                      title="Xóa toàn bộ bảng"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
                      <table className="w-full text-xs text-left border-collapse">
                        <thead className="bg-slate-100 text-slate-800 font-bold uppercase">
                          <tr>
                            {block.headers.map((h, hIdx) => (
                              <th key={hIdx} className="p-2.5 border-b border-r border-slate-200 last:border-r-0 relative group/col">
                                <div className="flex items-center justify-between gap-1.5">
                                  <input
                                    type="text"
                                    value={h}
                                    onChange={(e) => {
                                      const nextH = [...block.headers!];
                                      nextH[hIdx] = e.target.value;
                                      updateBlock(block.id!, { headers: nextH });
                                    }}
                                    placeholder={`Cột ${hIdx + 1}`}
                                    className="bg-transparent font-bold outline-none w-full text-slate-800"
                                  />
                                  {block.headers!.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const nextH = block.headers!.filter((_, idx) => idx !== hIdx);
                                        const nextR = block.rows!.map((r) => r.filter((_, idx) => idx !== hIdx));
                                        updateBlock(block.id!, { headers: nextH, rows: nextR });
                                      }}
                                      className="opacity-0 group-hover/col:opacity-100 hover:bg-rose-100 p-0.5 rounded text-rose-500 hover:text-rose-700 transition-opacity cursor-pointer shrink-0"
                                      title="Xóa cột này"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  )}
                                </div>
                              </th>
                            ))}
                            <th className="w-8 p-1 border-b border-slate-200 text-center"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {block.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="group/row hover:bg-slate-50/60 transition-colors">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="p-2 border-r border-slate-100 last:border-r-0">
                                  <input
                                    type="text"
                                    value={cell}
                                    onChange={(e) => {
                                      const nextR = block.rows!.map((r) => [...r]);
                                      nextR[rIdx][cIdx] = e.target.value;
                                      updateBlock(block.id!, { rows: nextR });
                                    }}
                                    placeholder="..."
                                    className="bg-transparent outline-none w-full text-slate-700 focus:text-slate-900"
                                  />
                                </td>
                              ))}
                              <td className="w-8 p-1 text-center border-l border-slate-100">
                                {block.rows!.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const nextR = block.rows!.filter((_, idx) => idx !== rIdx);
                                      updateBlock(block.id!, { rows: nextR });
                                    }}
                                    className="opacity-0 group-hover/row:opacity-100 hover:bg-rose-100 p-1 rounded text-rose-400 hover:text-rose-600 transition-opacity cursor-pointer"
                                    title="Xóa hàng này"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          const newRow = new Array(block.headers!.length).fill('');
                          updateBlock(block.id!, { rows: [...block.rows!, newRow] });
                        }}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Thêm hàng</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const nextH = [...block.headers!, `Cột ${block.headers!.length + 1}`];
                          const nextR = block.rows!.map((r) => [...r, '']);
                          updateBlock(block.id!, { headers: nextH, rows: nextR });
                        }}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Thêm cột</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* G. CODE BLOCK */}
                {block.type === 'code' && (
                  <div className="relative group/media rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 text-xs font-mono space-y-2 p-3 my-4">
                    <button
                      type="button"
                      onClick={() => deleteBlock(block.id!)}
                      className="opacity-0 group-hover/media:opacity-100 transition-opacity absolute top-3 right-3 z-10 p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900 text-slate-400 hover:text-rose-300 shadow-xs border border-slate-700 cursor-pointer"
                      title="Xóa khối code"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2 pr-10">
                      <span>Code Editor</span>
                      <input
                        type="text"
                        value={block.language || 'javascript'}
                        onChange={(e) => updateBlock(block.id!, { language: e.target.value })}
                        className="bg-slate-800 px-2 py-0.5 rounded text-[11px] text-orange-400 outline-none w-24"
                      />
                    </div>
                    <textarea
                      rows={4}
                      value={block.code || block.text || ''}
                      onChange={(e) => updateBlock(block.id!, { code: e.target.value, text: e.target.value })}
                      className="w-full bg-transparent text-emerald-400 outline-none resize-none font-mono"
                      placeholder="// Nhập mã nguồn code..."
                    />
                  </div>
                )}

                {/* H. VIDEO BLOCK */}
                {block.type === 'video' && (
                  <div className="relative group/media space-y-2 my-4">
                    <button
                      type="button"
                      onClick={() => deleteBlock(block.id!)}
                      className="opacity-0 group-hover/media:opacity-100 transition-opacity absolute top-3 right-3 z-10 p-1.5 rounded-lg bg-white/90 hover:bg-rose-50 text-slate-400 hover:text-rose-600 shadow-md border border-slate-200 cursor-pointer"
                      title="Xóa video này"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-md border border-slate-200 flex items-center justify-center">
                      {block.url?.startsWith('data:') || block.url?.startsWith('blob:') || block.url?.includes('.mp4') || block.url?.includes('.webm') ? (
                        <video src={block.url} controls className="w-full h-full object-contain" />
                      ) : (
                        <iframe
                          src={formatVideoEmbedUrl(block.url || '')}
                          className="w-full h-full border-0"
                          allowFullScreen
                        />
                      )}
                    </div>
                    <input
                      type="text"
                      value={block.url || ''}
                      onChange={(e) => updateBlock(block.id!, { url: e.target.value })}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 rounded-xl border border-slate-200 outline-none"
                    />
                  </div>
                )}

                {/* I. COLUMNS BLOCK (2 COLUMNS ON 1 ROW WITH TEXT / IMAGE / VIDEO) */}
                {block.type === 'columns' && (
                  <div className="relative group/media my-4 bg-slate-50/80 p-4 rounded-3xl border border-slate-200/90 shadow-2xs space-y-3">
                    <button
                      type="button"
                      onClick={() => deleteBlock(block.id!)}
                      className="opacity-0 group-hover/media:opacity-100 transition-opacity absolute top-3 right-3 z-10 p-1.5 rounded-lg bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 shadow-xs border border-slate-200 cursor-pointer"
                      title="Xóa khối 2 cột"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* === CỘT 1 (TRÁI) === */}
                      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5 flex flex-col">
                        <div className="flex items-center justify-between gap-2">
                          <input
                            type="text"
                            value={block.leftTitle || ''}
                            onChange={(e) => updateBlock(block.id!, { leftTitle: e.target.value })}
                            placeholder="Tiêu đề cột trái..."
                            className="font-bold text-xs text-orange-600 bg-transparent outline-none w-full border-b border-transparent focus:border-orange-300 pb-0.5"
                          />
                          {/* Type Switcher */}
                          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl gap-0.5 text-[11px] font-semibold shrink-0">
                            <button
                              type="button"
                              onClick={() => updateBlock(block.id!, { leftType: 'text' })}
                              className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                                !block.leftType || block.leftType === 'text'
                                  ? 'bg-white text-orange-600 shadow-2xs font-bold'
                                  : 'text-slate-500 hover:text-slate-800'
                              }`}
                            >
                              Văn bản
                            </button>
                            <button
                              type="button"
                              onClick={() => updateBlock(block.id!, { leftType: 'image' })}
                              className={`px-2 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                                block.leftType === 'image'
                                  ? 'bg-white text-emerald-600 shadow-2xs font-bold'
                                  : 'text-slate-500 hover:text-slate-800'
                              }`}
                            >
                              <ImageIcon className="w-3 h-3" />
                              <span>Ảnh</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => updateBlock(block.id!, { leftType: 'video' })}
                              className={`px-2 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                                block.leftType === 'video'
                                  ? 'bg-white text-rose-600 shadow-2xs font-bold'
                                  : 'text-slate-500 hover:text-slate-800'
                              }`}
                            >
                              <Video className="w-3 h-3" />
                              <span>Video</span>
                            </button>
                          </div>
                        </div>

                        {/* Left Content Area */}
                        {(!block.leftType || block.leftType === 'text') && (
                          <textarea
                            rows={4}
                            value={block.leftText || ''}
                            onChange={(e) => updateBlock(block.id!, { leftText: e.target.value })}
                            placeholder="Nhập nội dung văn bản cột trái..."
                            className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200 w-full outline-none focus:ring-1 focus:ring-orange-500/30 flex-1"
                          />
                        )}

                        {block.leftType === 'image' && (
                          <div className="space-y-2 flex-1 flex flex-col justify-between">
                            {block.leftImageUrl ? (
                              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50 group/img">
                                <img
                                  src={block.leftImageUrl}
                                  alt="Preview"
                                  className="w-full h-36 object-contain bg-white"
                                />
                                <button
                                  type="button"
                                  onClick={() => updateBlock(block.id!, { leftImageUrl: '', leftImageCaption: '' })}
                                  className="absolute top-2 right-2 p-1 rounded-lg bg-black/60 text-white hover:bg-rose-600 text-xs transition-colors cursor-pointer"
                                  title="Xóa ảnh"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-xl p-4 cursor-pointer bg-slate-50 hover:bg-emerald-50/20 transition-all">
                                  <Upload className="w-5 h-5 text-emerald-600 mb-1" />
                                  <span className="text-xs font-semibold text-slate-600">Chọn ảnh từ máy</span>
                                  <span className="text-[10px] text-slate-400">PNG, JPG, WebP</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={async (e) => {
                                      const f = e.target.files?.[0];
                                      if (!f) return;
                                      try {
                                        const uploadedUrl = await uploadApi.uploadImage(f);
                                        if (uploadedUrl) {
                                          updateBlock(block.id!, { leftImageUrl: uploadedUrl, leftImageCaption: f.name.replace(/\.[^.]+$/, '') });
                                          return;
                                        }
                                      } catch (err) {
                                        console.warn(err);
                                      }
                                      const reader = new FileReader();
                                      reader.onload = (evt) => {
                                        updateBlock(block.id!, { leftImageUrl: evt.target?.result as string, leftImageCaption: f.name.replace(/\.[^.]+$/, '') });
                                      };
                                      reader.readAsDataURL(f);
                                    }}
                                    className="hidden"
                                  />
                                </label>
                                <input
                                  type="url"
                                  placeholder="Hoặc dán URL ảnh..."
                                  value={block.leftImageUrl || ''}
                                  onChange={(e) => updateBlock(block.id!, { leftImageUrl: e.target.value })}
                                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 rounded-xl border border-slate-200 outline-none"
                                />
                              </div>
                            )}
                            <input
                              type="text"
                              value={block.leftImageCaption || ''}
                              onChange={(e) => updateBlock(block.id!, { leftImageCaption: e.target.value })}
                              placeholder="Chú thích ảnh cột trái..."
                              className="w-full px-2.5 py-1 text-[11px] bg-slate-50 rounded-lg border border-slate-200 outline-none"
                            />
                          </div>
                        )}

                        {block.leftType === 'video' && (
                          <div className="space-y-2 flex-1 flex flex-col justify-between">
                            {block.leftVideoUrl ? (
                              <div className="relative rounded-xl overflow-hidden aspect-video bg-black/90 border border-slate-200">
                                {block.leftVideoUrl.startsWith('data:') || block.leftVideoUrl.endsWith('.mp4') ? (
                                  <video src={block.leftVideoUrl} controls className="w-full h-full object-cover" />
                                ) : (
                                  <iframe
                                    src={formatVideoEmbedUrl(block.leftVideoUrl)}
                                    className="w-full h-full border-0"
                                    allowFullScreen
                                  />
                                )}
                                <button
                                  type="button"
                                  onClick={() => updateBlock(block.id!, { leftVideoUrl: '' })}
                                  className="absolute top-2 right-2 p-1 rounded-lg bg-black/60 text-white hover:bg-rose-600 text-xs transition-colors cursor-pointer"
                                  title="Xóa video"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-rose-500 rounded-xl p-4 cursor-pointer bg-slate-50 hover:bg-rose-50/20 transition-all">
                                  <Upload className="w-5 h-5 text-rose-600 mb-1" />
                                  <span className="text-xs font-semibold text-slate-600">Tải tệp video từ máy</span>
                                  <span className="text-[10px] text-slate-400">MP4, WebM (Tối đa 50MB)</span>
                                  <input
                                    type="file"
                                    accept="video/*"
                                    onChange={(e) => {
                                      const f = e.target.files?.[0];
                                      if (!f) return;
                                      const reader = new FileReader();
                                      reader.onload = (evt) => {
                                        updateBlock(block.id!, { leftVideoUrl: evt.target?.result as string });
                                      };
                                      reader.readAsDataURL(f);
                                    }}
                                    className="hidden"
                                  />
                                </label>
                                <input
                                  type="text"
                                  placeholder="Hoặc dán link YouTube / Video URL..."
                                  value={block.leftVideoUrl || ''}
                                  onChange={(e) => updateBlock(block.id!, { leftVideoUrl: e.target.value })}
                                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 rounded-xl border border-slate-200 outline-none"
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* === CỘT 2 (PHẢI) === */}
                      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5 flex flex-col">
                        <div className="flex items-center justify-between gap-2">
                          <input
                            type="text"
                            value={block.rightTitle || ''}
                            onChange={(e) => updateBlock(block.id!, { rightTitle: e.target.value })}
                            placeholder="Tiêu đề cột phải..."
                            className="font-bold text-xs text-orange-600 bg-transparent outline-none w-full border-b border-transparent focus:border-orange-300 pb-0.5"
                          />
                          {/* Type Switcher */}
                          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl gap-0.5 text-[11px] font-semibold shrink-0">
                            <button
                              type="button"
                              onClick={() => updateBlock(block.id!, { rightType: 'text' })}
                              className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                                !block.rightType || block.rightType === 'text'
                                  ? 'bg-white text-orange-600 shadow-2xs font-bold'
                                  : 'text-slate-500 hover:text-slate-800'
                              }`}
                            >
                              Văn bản
                            </button>
                            <button
                              type="button"
                              onClick={() => updateBlock(block.id!, { rightType: 'image' })}
                              className={`px-2 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                                block.rightType === 'image'
                                  ? 'bg-white text-emerald-600 shadow-2xs font-bold'
                                  : 'text-slate-500 hover:text-slate-800'
                              }`}
                            >
                              <ImageIcon className="w-3 h-3" />
                              <span>Ảnh</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => updateBlock(block.id!, { rightType: 'video' })}
                              className={`px-2 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                                block.rightType === 'video'
                                  ? 'bg-white text-rose-600 shadow-2xs font-bold'
                                  : 'text-slate-500 hover:text-slate-800'
                              }`}
                            >
                              <Video className="w-3 h-3" />
                              <span>Video</span>
                            </button>
                          </div>
                        </div>

                        {/* Right Content Area */}
                        {(!block.rightType || block.rightType === 'text') && (
                          <textarea
                            rows={4}
                            value={block.rightText || ''}
                            onChange={(e) => updateBlock(block.id!, { rightText: e.target.value })}
                            placeholder="Nhập nội dung văn bản cột phải..."
                            className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200 w-full outline-none focus:ring-1 focus:ring-orange-500/30 flex-1"
                          />
                        )}

                        {block.rightType === 'image' && (
                          <div className="space-y-2 flex-1 flex flex-col justify-between">
                            {block.rightImageUrl ? (
                              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50 group/img">
                                <img
                                  src={block.rightImageUrl}
                                  alt="Preview"
                                  className="w-full h-36 object-contain bg-white"
                                />
                                <button
                                  type="button"
                                  onClick={() => updateBlock(block.id!, { rightImageUrl: '', rightImageCaption: '' })}
                                  className="absolute top-2 right-2 p-1 rounded-lg bg-black/60 text-white hover:bg-rose-600 text-xs transition-colors cursor-pointer"
                                  title="Xóa ảnh"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-xl p-4 cursor-pointer bg-slate-50 hover:bg-emerald-50/20 transition-all">
                                  <Upload className="w-5 h-5 text-emerald-600 mb-1" />
                                  <span className="text-xs font-semibold text-slate-600">Chọn ảnh từ máy</span>
                                  <span className="text-[10px] text-slate-400">PNG, JPG, WebP</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={async (e) => {
                                      const f = e.target.files?.[0];
                                      if (!f) return;
                                      try {
                                        const uploadedUrl = await uploadApi.uploadImage(f);
                                        if (uploadedUrl) {
                                          updateBlock(block.id!, { rightImageUrl: uploadedUrl, rightImageCaption: f.name.replace(/\.[^.]+$/, '') });
                                          return;
                                        }
                                      } catch (err) {
                                        console.warn(err);
                                      }
                                      const reader = new FileReader();
                                      reader.onload = (evt) => {
                                        updateBlock(block.id!, { rightImageUrl: evt.target?.result as string, rightImageCaption: f.name.replace(/\.[^.]+$/, '') });
                                      };
                                      reader.readAsDataURL(f);
                                    }}
                                    className="hidden"
                                  />
                                </label>
                                <input
                                  type="url"
                                  placeholder="Hoặc dán URL ảnh..."
                                  value={block.rightImageUrl || ''}
                                  onChange={(e) => updateBlock(block.id!, { rightImageUrl: e.target.value })}
                                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 rounded-xl border border-slate-200 outline-none"
                                />
                              </div>
                            )}
                            <input
                              type="text"
                              value={block.rightImageCaption || ''}
                              onChange={(e) => updateBlock(block.id!, { rightImageCaption: e.target.value })}
                              placeholder="Chú thích ảnh cột phải..."
                              className="w-full px-2.5 py-1 text-[11px] bg-slate-50 rounded-lg border border-slate-200 outline-none"
                            />
                          </div>
                        )}

                        {block.rightType === 'video' && (
                          <div className="space-y-2 flex-1 flex flex-col justify-between">
                            {block.rightVideoUrl ? (
                              <div className="relative rounded-xl overflow-hidden aspect-video bg-black/90 border border-slate-200">
                                {block.rightVideoUrl.startsWith('data:') || block.rightVideoUrl.endsWith('.mp4') ? (
                                  <video src={block.rightVideoUrl} controls className="w-full h-full object-cover" />
                                ) : (
                                  <iframe
                                    src={formatVideoEmbedUrl(block.rightVideoUrl)}
                                    className="w-full h-full border-0"
                                    allowFullScreen
                                  />
                                )}
                                <button
                                  type="button"
                                  onClick={() => updateBlock(block.id!, { rightVideoUrl: '' })}
                                  className="absolute top-2 right-2 p-1 rounded-lg bg-black/60 text-white hover:bg-rose-600 text-xs transition-colors cursor-pointer"
                                  title="Xóa video"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-rose-500 rounded-xl p-4 cursor-pointer bg-slate-50 hover:bg-rose-50/20 transition-all">
                                  <Upload className="w-5 h-5 text-rose-600 mb-1" />
                                  <span className="text-xs font-semibold text-slate-600">Tải tệp video từ máy</span>
                                  <span className="text-[10px] text-slate-400">MP4, WebM (Tối đa 50MB)</span>
                                  <input
                                    type="file"
                                    accept="video/*"
                                    onChange={(e) => {
                                      const f = e.target.files?.[0];
                                      if (!f) return;
                                      const reader = new FileReader();
                                      reader.onload = (evt) => {
                                        updateBlock(block.id!, { rightVideoUrl: evt.target?.result as string });
                                      };
                                      reader.readAsDataURL(f);
                                    }}
                                    className="hidden"
                                  />
                                </label>
                                <input
                                  type="text"
                                  placeholder="Hoặc dán link YouTube / Video URL..."
                                  value={block.rightVideoUrl || ''}
                                  onChange={(e) => updateBlock(block.id!, { rightVideoUrl: e.target.value })}
                                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 rounded-xl border border-slate-200 outline-none"
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* J. DIVIDER BLOCK */}
                {block.type === 'divider' && (
                  <div className="relative group/media py-3 my-2 flex items-center">
                    <button
                      type="button"
                      onClick={() => deleteBlock(block.id!)}
                      className="opacity-0 group-hover/media:opacity-100 transition-opacity absolute right-2 top-1 z-10 p-1 rounded-lg bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 shadow-xs border border-slate-200 cursor-pointer"
                      title="Xóa đường phân đoạn"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                    <hr className="w-full border-t border-slate-200" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. STATUS BAR: WORD COUNT & READING TIME */}
      <div className="bg-slate-50 px-5 py-2.5 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-medium">
        <div className="flex items-center gap-4">
          <span>
            Khối nội dung: <strong className="text-slate-800">{blocks.length}</strong>
          </span>
          <span>•</span>
          <span>
            Số từ: <strong className="text-slate-800">{wordCount}</strong>
          </span>
          <span>•</span>
          <span>
            Thời gian đọc ước tính: <strong className="text-slate-800">{readingTime} phút</strong>
          </span>
        </div>
      </div>

      {/* MODAL 1: INSERT LINK */}
      {linkModalOpen &&
        createPortal(
          <div className="fixed inset-0 bg-black/50 z-[99999] flex items-center justify-center p-4 backdrop-blur-xs animate-page-fade">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto animate-scale-up">
              <div className="flex items-center justify-between">
                <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 text-orange-600" /> Chèn liên kết
                </h4>
                <button onClick={() => setLinkModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Đường dẫn URL:</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Chữ hiển thị (Tùy chọn):</label>
                  <input
                    type="text"
                    placeholder="Xem chi tiết..."
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setLinkModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (linkUrl) {
                      restoreSelection();
                      const finalUrl = linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`;
                      const displayText = linkText.trim() || finalUrl;
                      const html = `<a href="${finalUrl}" target="_blank" rel="noopener noreferrer" class="text-orange-600 font-semibold hover:underline">${displayText}</a>`;
                      document.execCommand('insertHTML', false, html);
                      if (activeBlockId) {
                        const el = document.getElementById(`block-content-${activeBlockId}`);
                        if (el) {
                          updateBlock(activeBlockId, { text: el.innerHTML });
                        }
                      }
                      setLinkModalOpen(false);
                      setLinkUrl('');
                      setLinkText('');
                    }
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-orange-600 text-white hover:bg-orange-700 shadow-xs cursor-pointer"
                >
                  Chèn link
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* MODAL 2: INSERT IMAGE (LOCAL FILE OR URL + AUTO ALIGN CENTER + AUTO CAPTION BASED ON SLUG) */}
      {imageModalOpen &&
        createPortal(
          <div className="fixed inset-0 bg-black/50 z-[99999] flex items-center justify-center p-4 backdrop-blur-xs animate-page-fade">
            <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto animate-scale-up">
              <div className="flex items-center justify-between">
                <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-emerald-600" /> Chèn hình ảnh bài viết
                </h4>
                <button
                  onClick={() => {
                    setImageModalOpen(false);
                    setImageUrl('');
                  }}
                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Tab Selection: Upload from Computer vs Image URL */}
              <div className="flex bg-slate-100 p-1 rounded-2xl gap-1 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setImageTab('upload')}
                  className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    imageTab === 'upload'
                      ? 'bg-white text-emerald-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Tải từ máy tính</span>
                </button>
                <button
                  type="button"
                  onClick={() => setImageTab('url')}
                  className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    imageTab === 'url'
                      ? 'bg-white text-emerald-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                  <span>Đường dẫn URL</span>
                </button>
              </div>

              <div className="space-y-3.5">
                {imageTab === 'upload' ? (
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                      Chọn tệp hình ảnh từ máy:
                    </label>
                    <input
                      ref={imageFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLocalImageSelect}
                      className="hidden"
                    />

                    {imageUrl ? (
                      <div className="relative rounded-2xl border-2 border-emerald-500/50 bg-emerald-50/30 p-2 flex flex-col items-center gap-2">
                        <img
                          src={imageUrl}
                          alt="Preview"
                          className="max-h-48 w-full object-contain rounded-xl bg-white border border-slate-200"
                        />
                        <div className="flex items-center justify-between w-full px-2 text-xs">
                          <span className="text-emerald-700 font-semibold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5 text-emerald-600" /> Đã chọn ảnh thành công
                          </span>
                          <button
                            type="button"
                            onClick={() => imageFileInputRef.current?.click()}
                            className="text-xs font-bold text-slate-600 hover:text-emerald-700 underline cursor-pointer"
                          >
                            Đổi ảnh khác
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => imageFileInputRef.current?.click()}
                        className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-6 text-center cursor-pointer transition-all bg-slate-50/50 hover:bg-emerald-50/20 group"
                      >
                        {isUploadingImage ? (
                          <div className="flex flex-col items-center justify-center gap-2 py-4">
                            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
                            <span className="text-xs font-semibold text-slate-600">Đang tải ảnh lên...</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center gap-2">
                            <div className="p-3 bg-emerald-100/60 text-emerald-600 rounded-2xl group-hover:scale-110 transition-transform">
                              <Upload className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-700">Nhấp để chọn ảnh từ máy tính</p>
                              <p className="text-[11px] text-slate-400">PNG, JPG, WebP, GIF (Tối đa 10MB)</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Đường dẫn hình ảnh (URL / Unsplash / CDN):
                    </label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/... hoặc link ảnh"
                      value={imageUrl}
                      onChange={(e) => {
                        const url = e.target.value;
                        setImageUrl(url);
                        if (url) {
                          try {
                            const urlObj = new URL(url);
                            const pathPart = urlObj.pathname.split('/').filter(Boolean).pop();
                            if (pathPart) {
                              const existingCount = blocks.filter((b) => b.type === 'image').length;
                              setImageCaption(generateDefaultImageCaption(pathPart, slug, title, existingCount));
                            }
                          } catch {
                            // ignore invalid url during typing
                          }
                        }
                      }}
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    {imageUrl && (
                      <div className="mt-2 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 max-h-36 flex items-center justify-center">
                        <img src={imageUrl} alt="Preview" className="max-h-36 object-contain" />
                      </div>
                    )}
                  </div>
                )}

                {/* Auto Caption Based on Image File Name / Slug / Title */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Tên / Chú thích ảnh (Tự động sinh theo tên ảnh):
                    </label>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-md">
                      Auto theo tên ảnh
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Tên chú thích ảnh..."
                    value={imageCaption}
                    onChange={(e) => setImageCaption(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setImageModalOpen(false);
                    setImageUrl('');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  disabled={!imageUrl || isUploadingImage}
                  onClick={() => {
                    if (imageUrl) {
                      const finalCaption =
                        imageCaption.trim() ||
                        generateDefaultImageCaption(
                          undefined,
                          slug,
                          title,
                          blocks.filter((b) => b.type === 'image').length
                        );
                      addBlockAtCursor('image', {
                        url: imageUrl,
                        caption: finalCaption,
                        width: '100%',
                        align: 'center'
                      });
                      setImageModalOpen(false);
                      setImageUrl('');
                      setImageCaption('');
                    }
                  }}
                  className={`px-5 py-2 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all ${
                    imageUrl && !isUploadingImage
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Chèn hình ảnh</span>
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* MODAL 3: INSERT VIDEO (LOCAL FILE OR YOUTUBE / VIMEO URL) */}
      {videoModalOpen &&
        createPortal(
          <div className="fixed inset-0 bg-black/50 z-[99999] flex items-center justify-center p-4 backdrop-blur-xs animate-page-fade">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto animate-scale-up">
              <div className="flex items-center justify-between">
                <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                  <Video className="w-4 h-4 text-rose-600" /> Nhúng / Tải Video bài viết
                </h4>
                <button
                  onClick={() => {
                    setVideoModalOpen(false);
                    setVideoUrl('');
                  }}
                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Tab Selection: Upload Video from Computer vs Video URL */}
              <div className="flex bg-slate-100 p-1 rounded-2xl gap-1 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setVideoTab('upload')}
                  className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    videoTab === 'upload'
                      ? 'bg-white text-rose-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Chọn từ máy tính</span>
                </button>
                <button
                  type="button"
                  onClick={() => setVideoTab('url')}
                  className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    videoTab === 'url'
                      ? 'bg-white text-rose-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                  <span>Link YouTube / Vimeo</span>
                </button>
              </div>

              <div className="space-y-3.5">
                {videoTab === 'upload' ? (
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                      Chọn tệp Video từ máy (MP4, WebM, MOV):
                    </label>
                    <input
                      ref={videoFileInputRef}
                      type="file"
                      accept="video/*"
                      onChange={handleLocalVideoSelect}
                      className="hidden"
                    />

                    {videoUrl ? (
                      <div className="relative rounded-2xl border-2 border-rose-500/50 bg-rose-50/30 p-2 flex flex-col items-center gap-2">
                        <video
                          src={videoUrl}
                          controls
                          className="max-h-48 w-full object-contain rounded-xl bg-black border border-slate-200"
                        />
                        <div className="flex items-center justify-between w-full px-2 text-xs">
                          <span className="text-rose-700 font-semibold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5 text-rose-600" /> Đã chọn video thành công
                          </span>
                          <button
                            type="button"
                            onClick={() => videoFileInputRef.current?.click()}
                            className="text-xs font-bold text-slate-600 hover:text-rose-700 underline cursor-pointer"
                          >
                            Đổi video khác
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => videoFileInputRef.current?.click()}
                        className="border-2 border-dashed border-slate-300 hover:border-rose-500 rounded-2xl p-6 text-center cursor-pointer transition-all bg-slate-50/50 hover:bg-rose-50/20 group"
                      >
                        <div className="flex flex-col items-center justify-center gap-2">
                          <div className="p-3 bg-rose-100/60 text-rose-600 rounded-2xl group-hover:scale-110 transition-transform">
                            <Video className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-700">Nhấp để chọn video từ máy tính</p>
                            <p className="text-[11px] text-slate-400">MP4, WebM, QuickTime MOV</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Đường dẫn Video (YouTube / Vimeo / Web):
                    </label>
                    <input
                      type="url"
                      placeholder="https://www.youtube.com/watch?v=..."
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      Hỗ trợ YouTube standard link, YouTube Shorts, Vimeo...
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setVideoModalOpen(false);
                    setVideoUrl('');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  disabled={!videoUrl}
                  onClick={() => {
                    if (videoUrl) {
                      addBlockAtCursor('video', {
                        url: videoUrl
                      });
                      setVideoModalOpen(false);
                      setVideoUrl('');
                    }
                  }}
                  className={`px-5 py-2 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all ${
                    videoUrl
                      ? 'bg-rose-600 hover:bg-rose-700 text-white cursor-pointer'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Nhúng Video</span>
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
