import logo from '../assets/logo.png';

export const ContactCard = ({ contact }) => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-6 w-full h-full">
      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-green-100 flex items-center justify-center shadow-md overflow-hidden">
        <img
          src={logo}
          alt="Logo contacto"
          className="w-12 h-12 object-contain"
        />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{contact.nombre} {contact.apellido}</h3>
        <p className="text-gray-500 text-sm mb-1">{contact.departamento}</p>
        <p className="text-green-400 text-sm font-medium mb-1 break-all">{contact.email}</p>
        <p className="text-gray-700 text-xs">Ext: {contact.extension}</p>
      </div>
    </div>
  );
};