import React, { useEffect, useRef } from 'react';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, onClose]);

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto h-full w-full">
      <div
        ref={modalRef}
        className="relative top-20 mx-auto p-5 border w-2/3 shadow-lg rounded-md bg-white"
        onClick={(e) => e.stopPropagation()} // Prevent click events from bubbling up
      >
        <div>{children}</div>
        <div className="text-right mt-4">
          <button onClick={onClose} className="py-2 px-4 bg-red-500 text-white rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
