import React, { useState, useRef } from 'react';
import { uploadApi } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { Upload, Image as ImageIcon, Loader2, X, Plus, Star, Link as LinkIcon, RefreshCw, Trash2 } from 'lucide-react';

interface ImageUploadProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  values?: string[];
  onChangeMultiple?: (urls: string[]) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  multiple?: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  label = 'Hình ảnh',
  value,
  onChange,
  values,
  onChangeMultiple,
  placeholder = 'https://...',
  required = false,
  className = '',
  multiple = true
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadCount, setUploadCount] = useState({ current: 0, total: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInputValue, setUrlInputValue] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  const handleFiles = async (fileList: FileList | File[]) => {
    const files = Array.from(fileList);
    if (!files || files.length === 0) return;

    // Filter valid image files and check size (max 10MB per file)
    const validFiles = files.filter((f) => {
      if (!f.type.startsWith('image/')) {
        showToast(`Tệp "${f.name}" không phải là ảnh hợp lệ!`, { type: 'error' });
        return false;
      }
      if (f.size > 10 * 1024 * 1024) {
        showToast(`Tệp "${f.name}" vượt quá 10MB!`, { type: 'error' });
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    try {
      setIsUploading(true);
      setUploadCount({ current: 0, total: validFiles.length });

      if (!multiple || validFiles.length === 1) {
        // Single file upload
        const uploadedUrl = await uploadApi.uploadImage(validFiles[0]);
        if (multiple && onChangeMultiple) {
          const currentList = values && values.length > 0 ? values : (value ? [value] : []);
          const updated = Array.from(new Set([...currentList, uploadedUrl].filter(Boolean)));
          onChangeMultiple(updated);
          if (!value) {
            onChange(uploadedUrl);
          }
        } else {
          onChange(uploadedUrl);
        }
        showToast('Tải ảnh lên thành công!', { type: 'success' });
      } else {
        // Multiple files upload
        const uploadedUrls = await uploadApi.uploadMultipleImages(validFiles);
        if (uploadedUrls.length > 0) {
          if (multiple && onChangeMultiple) {
            const currentList = values && values.length > 0 ? values : (value ? [value] : []);
            const updated = Array.from(new Set([...currentList, ...uploadedUrls].filter(Boolean)));
            onChangeMultiple(updated);
            if (!value || !updated.includes(value)) {
              onChange(updated[0] || uploadedUrls[0]);
            }
          } else {
            onChange(uploadedUrls[0]);
          }
          showToast(`Đã tải thành công ${uploadedUrls.length} ảnh!`, { type: 'success' });
        }
      }
    } catch (err: any) {
      console.error('Image upload failed:', err);
      showToast('Không thể tải ảnh lên', {
        type: 'error',
        description: err.response?.data?.message || err.message
      });
    } finally {
      setIsUploading(false);
      setUploadCount({ current: 0, total: 0 });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const allThumbnails = multiple
    ? Array.from(new Set([...(values || []), value].filter(Boolean)))
    : value ? [value] : [];

  const handleRemoveImage = (imgUrl: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (multiple && onChangeMultiple) {
      const remaining = allThumbnails.filter((url) => url !== imgUrl);
      onChangeMultiple(remaining);
      if (value === imgUrl) {
        onChange(remaining[0] || '');
      }
    } else {
      if (value === imgUrl) {
        onChange('');
      }
    }
  };

  const handleAddUrl = (e: React.FormEvent) => {
    e.preventDefault();
    const url = urlInputValue.trim();
    if (!url) return;
    if (multiple && onChangeMultiple) {
      const updated = Array.from(new Set([...(values || []), value, url].filter(Boolean)));
      onChangeMultiple(updated);
      if (!value) {
        onChange(url);
      }
    } else {
      onChange(url);
    }
    setUrlInputValue('');
    setShowUrlInput(false);
    showToast('Đã cập nhật ảnh từ link thành công!', { type: 'success' });
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label Bar */}
      <div className="flex items-center justify-between">
        {label && (
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            {label} {required && <span className="text-rose-500">*</span>}
          </label>
        )}
        <div className="flex items-center gap-2">
          {multiple && allThumbnails.length > 1 && (
            <span className="text-[11px] font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">
              {allThumbnails.length} ảnh
            </span>
          )}
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="text-[11px] text-slate-400 hover:text-orange-600 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <LinkIcon className="w-3 h-3" />
            <span>{showUrlInput ? 'Đóng nhập link' : 'Dán link ảnh'}</span>
          </button>
        </div>
      </div>

      {/* Optional Manual URL Input */}
      {showUrlInput && (
        <form onSubmit={handleAddUrl} className="flex gap-2 items-center p-2 bg-slate-50 rounded-xl border border-slate-200">
          <input
            type="text"
            value={urlInputValue}
            onChange={(e) => setUrlInputValue(e.target.value)}
            placeholder="Dán link ảnh (https://...)"
            className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-orange-600 text-white rounded-lg text-xs font-bold hover:bg-orange-700 cursor-pointer"
          >
            Áp dụng
          </button>
        </form>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* RENDER MODE 1: SINGLE IMAGE (multiple === false) */}
      {!multiple ? (
        !value ? (
          /* Empty Single Dropzone */
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2.5 ${
              isDragging
                ? 'border-orange-500 bg-orange-50/70 scale-[0.99]'
                : 'border-slate-300 hover:border-orange-400 hover:bg-orange-50/20 bg-slate-50/60'
            }`}
          >
            {isUploading ? (
              <div className="flex flex-col items-center gap-2 py-3">
                <Loader2 className="w-7 h-7 text-orange-600 animate-spin" />
                <span className="text-xs font-bold text-slate-700">Đang tải ảnh lên...</span>
              </div>
            ) : (
              <>
                <div className="w-11 h-11 rounded-2xl bg-orange-100/80 text-orange-600 flex items-center justify-center shadow-xs">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-800">
                    <span className="text-orange-600 hover:underline">Bấm để chọn ảnh</span> hoặc kéo thả vào đây
                  </div>
                  <p className="text-[11px] text-slate-400">JPG, PNG, WebP tối đa 10MB</p>
                </div>
              </>
            )}
          </div>
        ) : (
          /* Single Image Display Card */
          <div className="relative w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 group shadow-xs">
            <div className="w-full h-48 sm:h-64 flex items-center justify-center bg-slate-950/20 overflow-hidden">
              <img
                src={value}
                alt={label || 'Ảnh đã chọn'}
                className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            {/* Overlay Action Bar */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3.5 sm:p-4">
              <span className="text-xs font-semibold text-white/90 drop-shadow-xs flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                Ảnh đã tải lên
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-xl bg-white/95 hover:bg-white text-slate-800 text-xs font-bold flex items-center gap-1.5 shadow-md backdrop-blur-md transition-all active:scale-95 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-orange-600" />
                  <span>Đổi ảnh khác</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(value)}
                  className="px-3 py-1.5 rounded-xl bg-rose-600/90 hover:bg-rose-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md backdrop-blur-md transition-all active:scale-95 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Xóa ảnh</span>
                </button>
              </div>
            </div>
          </div>
        )
      ) : (
        /* RENDER MODE 2: MULTI IMAGES GALLERY (multiple === true) */
        allThumbnails.length === 0 ? (
          /* Empty State Dropzone */
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2.5 ${
              isDragging
                ? 'border-orange-500 bg-orange-50/70 scale-[0.99]'
                : 'border-slate-300 hover:border-orange-400 hover:bg-orange-50/20 bg-slate-50/60'
            }`}
          >
            {isUploading ? (
              <div className="flex flex-col items-center gap-2 py-3">
                <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
                <span className="text-xs font-bold text-slate-700">
                  Đang tải {uploadCount.total > 1 ? `(${uploadCount.total} ảnh)...` : 'ảnh lên...'}
                </span>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-2xl bg-orange-100/80 text-orange-600 flex items-center justify-center shadow-xs">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-800">
                    <span className="text-orange-600 hover:underline">Bấm để tải ảnh</span> hoặc kéo thả ảnh vào đây
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Hỗ trợ tải 1 hoặc nhiều ảnh (JPG, PNG, WebP tối đa 10MB)
                  </p>
                </div>
              </>
            )}
          </div>
        ) : (
          /* Images Gallery State */
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border rounded-2xl p-3.5 space-y-3 transition-all ${
              isDragging ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-400' : 'border-slate-200 bg-slate-50/40'
            }`}
          >
            {/* Gallery Grid */}
            <div className="flex flex-wrap gap-3 items-center">
              {allThumbnails.map((imgUrl, idx) => {
                const isSelected = imgUrl === value;
                return (
                  <div
                    key={idx}
                    onClick={() => onChange(imgUrl)}
                    className={`group relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-white border-2 transition-all cursor-pointer flex-shrink-0 shadow-xs ${
                      isSelected
                        ? 'border-orange-500 ring-2 ring-orange-500/40'
                        : 'border-slate-200 hover:border-slate-400 opacity-80 hover:opacity-100'
                    }`}
                    title={isSelected ? 'Ảnh chính hiện tại' : 'Bấm để chọn làm ảnh chính'}
                  >
                    <img
                      src={imgUrl}
                      alt={`Ảnh ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />

                    {/* Main Badge */}
                    {isSelected && (
                      <div className="absolute top-1.5 left-1.5 bg-orange-600 text-white px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase shadow-xs flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5 fill-white" />
                        <span>Chính</span>
                      </div>
                    )}

                    {/* Hover Overlay with Delete Button */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => handleRemoveImage(imgUrl, e)}
                        className="p-1.5 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors shadow-sm cursor-pointer"
                        title="Xóa ảnh này"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Add More Tile */}
              <button
                type="button"
                disabled={isUploading}
                onClick={() => fileInputRef.current?.click()}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 border-dashed border-slate-300 hover:border-orange-500 hover:bg-orange-50/50 text-slate-400 hover:text-orange-600 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer flex-shrink-0 text-xs font-semibold disabled:opacity-50"
                title="Tải thêm ảnh từ máy"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-orange-600" />
                    <span className="text-[10px]">Đang tải...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    <span className="text-[11px]">Thêm ảnh</span>
                  </>
                )}
              </button>
            </div>

            {/* Action Helper Bar */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-200/60">
              <span>Bấm vào ảnh để chọn làm ảnh chính (⭐).</span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-orange-600 font-bold hover:underline cursor-pointer flex items-center gap-1"
              >
                <Upload className="w-3 h-3" />
                <span>Tải thêm từ máy</span>
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};
