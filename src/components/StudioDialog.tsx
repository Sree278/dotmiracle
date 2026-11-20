import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { X } from 'lucide-react';
export default function StudioDialog({ children, onClose, wide = false }: { children: ReactNode; onClose: () => void; wide?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (dialog && !dialog.open) dialog.showModal();
    return () => { dialog?.close(); document.body.style.overflow = overflow; if (previous?.isConnected) previous.focus({ preventScroll: true }); };
  }, []);
  return <dialog ref={ref} className={`studio-dialog ${wide ? 'dialog-wide' : ''}`} aria-labelledby="dialog-title" onCancel={e => { e.preventDefault(); onClose(); }} onClick={e => { if (e.target !== ref.current) return; const rect = ref.current?.getBoundingClientRect(); if (rect && (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom)) onClose(); }}><div className="dialog-inner"><button type="button" className="dialog-close" onClick={onClose} aria-label="Close dialog"><X size={19}/></button>{children}</div></dialog>;
}
