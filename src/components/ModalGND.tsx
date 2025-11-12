import React from 'react';

interface ModalGNDProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  widthClassName?: string; // e.g., max-w-2xl
}

export const ModalGND: React.FC<ModalGNDProps> = ({ isOpen, onClose, title, children, widthClassName = 'max-w-2xl' }) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998] transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-4 pointer-events-none">
        <div className={`pointer-events-auto w-full ${widthClassName} bg-white rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden animate-fade-in-up`} role="dialog" aria-modal="true" aria-labelledby={title ? 'modal-gnd-title' : undefined}>
          {title && (
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 id="modal-gnd-title" className="text-xl sm:text-2xl font-bold text-slate-900">{title}</h2>
            </div>
          )}
          <div className="p-6 sm:p-8">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};


