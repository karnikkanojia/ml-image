import { CircleX } from "lucide-react";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <section className="modal-overlay" aria-modal="true" role="dialog">
      <dialog open={isOpen} className="modal-content mt-20" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} aria-label="Close modal" className="modal-close-button">
            <CircleX size={24} color="red" />
        </button>
        {children}
      </dialog>
    </section>
  );
};

export default Modal;
