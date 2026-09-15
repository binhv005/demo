import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { AlertTriangle, Trash2, Info, X } from 'lucide-react';

export type ConfirmType = 'danger' | 'warning' | 'info';

export interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: ConfirmType;
}

interface ConfirmContextType {
  confirm: (options: ConfirmOptions | string) => Promise<boolean>;
}

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export const ConfirmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    type: ConfirmType;
  }>({
    isOpen: false,
    title: 'Xác nhận thao tác',
    message: '',
    confirmText: 'Xác nhận',
    cancelText: 'Hủy bỏ',
    type: 'danger'
  });

  const resolverRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = useCallback((options: ConfirmOptions | string): Promise<boolean> => {
    return new Promise((resolve) => {
      resolverRef.current = resolve;
      if (typeof options === 'string') {
        setDialogState({
          isOpen: true,
          title: 'Xác nhận thao tác',
          message: options,
          confirmText: 'Xác nhận',
          cancelText: 'Hủy bỏ',
          type: 'danger'
        });
      } else {
        setDialogState({
          isOpen: true,
          title: options.title || (options.type === 'info' ? 'Thông báo' : 'Xác nhận thao tác'),
          message: options.message,
          confirmText: options.confirmText || (options.type === 'danger' ? 'Xác nhận xóa' : 'Đồng ý'),
          cancelText: options.cancelText || 'Hủy bỏ',
          type: options.type || 'danger'
        });
      }
    });
  }, []);

  const handleClose = (result: boolean) => {
    setDialogState((prev) => ({ ...prev, isOpen: false }));
    if (resolverRef.current) {
      resolverRef.current(result);
      resolverRef.current = null;
    }
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}

      {/* Centered Modal Card Dialog */}
      {dialogState.isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 select-none animate-fade-in">
          {/* Backdrop Blur */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => handleClose(false)}
          />

          {/* Modal Box */}
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all z-10 p-6 sm:p-7 space-y-5 animate-modal-in">
            {/* Close Button */}
            <button
              onClick={() => handleClose(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Icon & Content */}
            <div className="flex flex-col items-center text-center space-y-3 pt-2">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${
                  dialogState.type === 'danger'
                    ? 'bg-rose-50 border border-rose-200/80 text-rose-600 shadow-rose-500/10'
                    : dialogState.type === 'warning'
                    ? 'bg-amber-50 border border-amber-200/80 text-amber-600 shadow-amber-500/10'
                    : 'bg-indigo-50 border border-indigo-200/80 text-indigo-600 shadow-indigo-500/10'
                }`}
              >
                {dialogState.type === 'danger' ? (
                  <Trash2 className="w-7 h-7" />
                ) : dialogState.type === 'warning' ? (
                  <AlertTriangle className="w-7 h-7" />
                ) : (
                  <Info className="w-7 h-7" />
                )}
              </div>

              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                {dialogState.title}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed max-w-xs font-normal">
                {dialogState.message}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleClose(false)}
                className="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all duration-200 cursor-pointer text-center"
              >
                {dialogState.cancelText}
              </button>
              <button
                type="button"
                onClick={() => handleClose(true)}
                className={`w-full py-3 px-4 rounded-2xl font-bold text-sm text-white shadow-lg transition-all duration-200 cursor-pointer text-center ${
                  dialogState.type === 'danger'
                    ? 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 shadow-rose-600/25 hover:shadow-rose-600/40'
                    : dialogState.type === 'warning'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-amber-500/25 hover:shadow-amber-500/40'
                    : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-indigo-600/25 hover:shadow-indigo-600/40'
                }`}
              >
                {dialogState.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error('useConfirm must be used within a ConfirmProvider');
  }
  return context;
};
