const LoadingPokemonAbilities = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-8">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
          <div className="h-10 bg-gray-300 rounded w-full"></div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex space-x-4">
                <div className="h-4 bg-gray-300 rounded flex-1"></div>
                <div className="h-4 bg-gray-300 rounded flex-1"></div>
                <div className="h-4 bg-gray-300 rounded flex-1"></div>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPokemonAbilities;