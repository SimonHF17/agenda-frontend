import React from "react";

const ModalContact = ({ contact, onClose }) => {
  if (!contact) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full relative animate-fade-in">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-green-600 text-2xl flex items-center gap-2"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <span className="text-base font-medium">Cerrar</span>
        </button>
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-3xl font-bold shadow">
            {contact.nombre.charAt(0)}
            {contact.apellido.charAt(0)}
          </div>
          <h2 className="text-2xl font-semibold text-green-700 mb-2">
            {contact.nombre} {contact.apellido}
          </h2>
          <div className="w-full">
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Departamento:</span>{" "}
              {contact.departamento}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Extensión:</span> {contact.extension}
            </p>
            {/* Agrega aquí más campos si tienes más información */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalContact;
