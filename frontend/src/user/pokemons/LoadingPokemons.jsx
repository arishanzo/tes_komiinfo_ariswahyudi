const LoadingPokemons = () => {
  return (
   <div className="p-6 bg-gray-50 min-h-screen space-y-8 animate-pulse">
  
        <header>
          <div className="h-8 w-48 bg-gray-200 rounded-md mb-3" />
          <div className="h-4 w-64 bg-gray-200 rounded-md" />
        </header>

        <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
          <div className="h-6 w-40 bg-gray-200 rounded-md" />
          <div className="grid md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded-xl" />
            ))}
          </div>
          <div className="flex justify-end gap-3 mt-3">
            <div className="h-10 w-20 bg-gray-200 rounded-xl" />
            <div className="h-10 w-32 bg-gray-200 rounded-xl" />
          </div>
        </div>

       
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="h-6 w-48 bg-gray-200 rounded-md mb-4" />
          <div className="h-10 w-1/2 bg-gray-200 rounded-xl mb-6" />

          <div className="flex justify-between border-b pb-3 mb-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 w-24 bg-gray-200 rounded-md" />
            ))}
          </div>

          
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex justify-between items-center py-3 border-b">
              {[...Array(5)].map((_, j) => (
                <div key={j} className="h-4 w-24 bg-gray-200 rounded-md" />
              ))}
            </div>
          ))}
          
          <div className="flex justify-center mt-6 gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-8 w-8 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
  );
};
export default LoadingPokemons;   