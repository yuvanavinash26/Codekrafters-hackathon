import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    // Duration set to 1000ms (1 second) as requested
    const timer = setTimeout(onClose, 1000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle2 className="text-yellow-400" size={18} />,
    error: <AlertCircle className="text-red-500" size={18} />,
    info: <Info className="text-blue-400" size={18} />
  };

  return (
    <div
      onClick={onClose}
      className="fixed top-24 left-1/2 -translate-x-1/2 z-[110] cursor-pointer animate-in fade-in slide-in-from-top-8 duration-500 cubic-bezier(0.23,1,0.32,1)"
    >
      <div className="bg-black/95 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full shadow-2xl flex items-center gap-4 min-w-[320px] max-w-md">
        <div className="shrink-0">
          {icons[type]}
        </div>
        <p className="text-xs font-black text-white uppercase tracking-widest flex-1">
          {message}
        </p>
        <button className="text-white/30 hover:text-white transition-colors">
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
