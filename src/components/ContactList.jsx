import { useState } from 'react';
import logo from '../assets/logo.png';

const DepartamentoModal = ({ departamento, contactos, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div className="bg-white rounded-lg shadow-2xl p-8 max-w-lg w-full relative animate-fade-in">
      <button
        className="absolute top-3 right-3 text-gray-400 hover:text-green-600 text-2xl flex items-center gap-2"
        onClick={onClose}
        aria-label="Cerrar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        <span className="text-base font-medium">Cerrar</span>
      </button>
      <div className="flex flex-col items-center gap-4">
        <img src={logo} alt="Logo departamento" className="w-20 h-20 object-contain mb-2" />
        <h2 className="text-2xl font-bold text-green-700 mb-2 text-center">{departamento}</h2>
        <div className="w-full">
          {contactos.length === 0 ? (
            <p className="text-gray-500 text-center">No hay contactos en este departamento.</p>
          ) : (
            <ul className="divide-y divide-green-100">
              {contactos.map((c, idx) => (
                <li key={idx} className="py-2">
                  <span className="font-semibold text-green-700">{c.nombre} {c.apellido}</span>
                  <span className="text-gray-500 text-sm ml-2"><span className="font-bold uppercase">EXT:</span> {c.extension}</span>
                  <span className="text-gray-400 text-xs ml-2">{c.email}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  </div>
);

export const ContactList = ({ contacts, searchTerm }) => {
  const [hoveredDept, setHoveredDept] = useState(null);
  const [selectedDept, setSelectedDept] = useState(null);

  // Agrupar contactos por departamento y filtrar por búsqueda
  const filteredContacts = contacts.filter(contact =>
    contact.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.apellido.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const grouped = filteredContacts.reduce((acc, contact) => {
    acc[contact.departamento] = acc[contact.departamento] || [];
    acc[contact.departamento].push(contact);
    return acc;
  }, {});

  return (
    <div className="relative w-full h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full h-full">
        {Object.entries(grouped).map(([departamento, _]) => (
          <div
            key={departamento}
            className={`group bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer relative 
              ${hoveredDept && hoveredDept !== departamento ? 'opacity-50 grayscale' : 'opacity-100'}
              ${hoveredDept === departamento ? 'animate-bounce-slow z-10 scale-105 shadow-2xl' : ''}`}
            onMouseEnter={() => setHoveredDept(departamento)}
            onMouseLeave={() => setHoveredDept(null)}
            onClick={() => setSelectedDept(departamento)}
          >
            <img src={logo} alt="Logo departamento" className="w-20 h-20 object-contain mb-4" />
            <h3 className="text-xl font-bold text-green-700 mb-2 tracking-wide uppercase drop-shadow-md text-center">{departamento}</h3>
          </div>
        ))}
      </div>
      {/* Modal de departamento mostrando los contactos */}
      {selectedDept && (
        <DepartamentoModal 
          departamento={selectedDept} 
          contactos={grouped[selectedDept] || []} 
          onClose={() => setSelectedDept(null)} 
        />
      )}
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          20% { transform: translateY(-10px); }
          40% { transform: translateY(0); }
          60% { transform: translateY(-6px); }
          80% { transform: translateY(0); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 1.2s infinite;
        }
      `}</style>
    </div>
  );
};