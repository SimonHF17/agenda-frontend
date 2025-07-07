import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header className="w-full flex flex-col items-center justify-center bg-gradient-to-r from-green-200 via-green-50 to-green-400 shadow-xl border-b border-green-300 animate-fade-in py-6 mb-4">
      <div className="flex items-center gap-8 mb-2">
        <span className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-lg border-4 border-green-200 text-green-600 overflow-hidden">
          <img src={logo} alt="Logo RioSuperMarket" className="w-20 h-20 object-contain" />
        </span>
        <h1 className="text-3xl md:text-4xl font-sans font-extrabold uppercase text-green-600 drop-shadow-lg tracking-tight animate-fade-in">
          Agenda Telefónica de <span className="font-black text-green-800">RioSuperMarket</span>
        </h1>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-green-900 text-base md:text-lg font-light italic animate-fade-in-slow">Directorio de empleados y extensiones internas</p>
        <p className="text-green-900 text-base md:text-lg font-semibold italic animate-fade-in-slow mt-1">Sede Corporativa Caracas</p>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease;
        }
        .animate-fade-in-slow {
          animation: fade-in 2s ease;
        }
      `}</style>
    </header>
  );
};

export default Header;
