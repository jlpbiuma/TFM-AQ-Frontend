const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded">
        <button onClick={onClose} className="mb-4 text-red-500">
          Cerrar
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
