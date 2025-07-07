export const SearchBar = ({searchTerm, setSearchTerm}) => {
    return (
        <div className="flex flex-col justify-start p-6 bg-white shadow-md rounded-2xl min-w-[250px] w-full max-w-xs">
            <label htmlFor="search" className="mb-4 text-lg font-semibold text-gray-900">Buscar Empleado</label>
            <input 
                type="text" 
                id="search" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" 
                placeholder="Buscar por nombre" 
            />
        </div>
    )
}