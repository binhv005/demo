/**
 * Enterprise Media Optimization Utility
 * - Cloudinary & Unsplash CDN on-the-fly transformations
 * - Format conversion, auto quality, auto webp
 * - Video embed URL generator (YouTube, Vimeo)
 */

export function optimizeImageUrl(
  url: string,
  options: {
    width?: number;
    height?: number;
    quality?: string | number;
    format?: string;
    crop?: string;
    blur?: number;
  } = {}
): string {
  if (!url || typeof url !== 'string') return '';

  const { width, height, quality = 'auto:good', format = 'webp', crop = 'limit', blur = 0 } = options;

  // Skip base64, blobs, SVG vectors, and local assets
  if (url.startsWith('data:') || url.startsWith('blob:') || url.endsWith('.svg') || url.startsWith('/')) {
    return url;
  }

  // 1. Cloudinary CDN Transformation
  if (url.includes('res.cloudinary.com')) {
    const uploadIndex = url.indexOf('/upload/');
    if (uploadIndex !== -1) {
      const prefix = url.substring(0, uploadIndex + 8);
      const suffix = url.substring(uploadIndex + 8);

      let versionAndPath = suffix;
      const firstSegment = suffix.split('/')[0];
      if (firstSegment && !firstSegment.startsWith('v') && !firstSegment.includes('.')) {
        versionAndPath = suffix.substring(firstSegment.length + 1);
      }

      const activeFormat = format === 'auto' ? 'webp' : format;
      const transforms = [`f_${activeFormat}`, `q_${quality}`];
      if (width) transforms.push(`w_${Math.round(width)}`);
      if (height) transforms.push(`h_${Math.round(height)}`);
      if (crop && (width || height)) transforms.push(`c_${crop}`);
      if (blur > 0) transforms.push(`e_blur:${Math.round(blur)}`);

      return `${prefix}${transforms.join(',')}/${versionAndPath}`;
    }
    return url;
  }

  // 2. Unsplash CDN Transformation
  if (url.includes('images.unsplash.com')) {
    try {
      const urlObj = new URL(url);
      urlObj.searchParams.set('auto', 'format');
      urlObj.searchParams.set('fit', 'crop');
      urlObj.searchParams.set('fm', format === 'auto' ? 'webp' : format);
      urlObj.searchParams.set('q', typeof quality === 'string' && quality.includes('auto') ? '80' : String(quality));
      if (width) urlObj.searchParams.set('w', String(Math.round(width)));
      if (height) urlObj.searchParams.set('h', String(Math.round(height)));
      if (blur > 0) urlObj.searchParams.set('blur', String(Math.min(100, blur)));
      return urlObj.toString();
    } catch {
      return url;
    }
  }

  // 3. Google User Content / Photos CDN
  if (url.includes('googleusercontent.com')) {
    const cleanUrl = url.replace(/=(?:s|w|h)\d+[^?]*$/i, '');
    if (width) {
      return `${cleanUrl}=w${Math.round(width)}-rw`;
    }
    return `${cleanUrl}=rw`;
  }

  return url;
}

/**
 * Format video URL to secure embeddable URL (YouTube, Vimeo)
 */
export function formatVideoEmbedUrl(rawUrl: string): string {
  if (!rawUrl || typeof rawUrl !== 'string') return '';
  const url = rawUrl.trim();

  // YouTube standard watch & short links
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/i);
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?rel=0&modestbranding=1`;
  }

  // YouTube Shorts
  const ytShortMatch = url.match(/youtube\.com\/shorts\/([\w-]{11})/i);
  if (ytShortMatch && ytShortMatch[1]) {
    return `https://www.youtube-nocookie.com/embed/${ytShortMatch[1]}?rel=0&modestbranding=1`;
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)/i);
  if (vimeoMatch && vimeoMatch[3]) {
    return `https://player.vimeo.com/video/${vimeoMatch[3]}?dnt=1`;
  }

  return url;
}

/**
 * Helper to clean pasted HTML from Word / Google Docs / External websites
 */
export function cleanPastedHtml(html: string): string {
  if (!html) return '';
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Remove meta, style, script, link tags
    doc.querySelectorAll('meta, style, script, link').forEach((el) => el.remove());

    // Unwrap legacy font tags
    doc.querySelectorAll('font').forEach((fontEl) => {
      const parent = fontEl.parentNode;
      if (parent) {
        while (fontEl.firstChild) {
          parent.insertBefore(fontEl.firstChild, fontEl);
        }
        parent.removeChild(fontEl);
      }
    });

    const allElements = doc.body.querySelectorAll('*');
    allElements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      // 1. Remove background styles
      htmlEl.style.backgroundColor = '';
      htmlEl.style.background = '';
      htmlEl.style.backgroundImage = '';
      htmlEl.removeAttribute('bgcolor');

      // 2. Remove external text colors
      htmlEl.style.color = '';
      htmlEl.removeAttribute('color');

      // 3. Remove font family overrides
      htmlEl.style.fontFamily = '';

      // 4. Remove MS Word specific classes
      if (htmlEl.className) {
        const cleanedClass = htmlEl.className
          .split(' ')
          .filter((c) => !c.startsWith('Mso') && !c.startsWith('docs-') && !c.startsWith('Apple-'))
          .join(' ');
        if (cleanedClass) {
          htmlEl.className = cleanedClass;
        } else {
          htmlEl.removeAttribute('class');
        }
      }
    });

    return doc.body.innerHTML;
  } catch {
    return html;
  }
}
