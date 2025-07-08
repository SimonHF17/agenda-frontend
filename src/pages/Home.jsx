import { useState, useEffect } from 'react';
import { getEmpleados } from '../services/api.js';
import { ContactList } from '../components/ContactList';
import Header from '../components/Header';
import ExportPDFButton from '../components/ExportPDFButton';

export const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadContacts = async () => {
      const data = await getEmpleados();
      setContacts(data);
    };
    loadContacts();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden bg-gradient-to-br from-green-200 via-green-50 to-green-400">
      <Header />
      <div className="flex-1 w-full px-2 md:px-8 py-4 md:py-0 overflow-y-auto flex flex-col items-center">
        <div className="w-full flex flex-col items-center mb-8">
          <div className="flex flex-row w-full max-w-xl gap-3 items-center justify-center">
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre o apellido"
              className="flex-1 rounded-lg border border-green-300 bg-white/80 px-4 py-3 text-lg text-green-900 shadow focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition"
            />
            <ExportPDFButton contacts={contacts} />
          </div>
        </div>
        <div className="w-full">
          <ContactList contacts={contacts} searchTerm={searchTerm} />
        </div>
      </div>
    </div>
  );
};