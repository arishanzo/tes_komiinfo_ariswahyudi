
import { Plus, Edit3, Trash2, Tag, Percent, Save, X, Search } from "lucide-react";
import Pagination from "../components/Pagination";
import toast from "react-hot-toast";
import axiosClient from "../../lib/axios";
import { useEffect, useMemo, useState } from "react";
import LoadingPokemons from "./LoadingPokemons";
import { UseGetPokemons } from "../../hook/useGetPokemons";
import ModalPokemons from "./modal/ModalPokemons";
import ModalEditPokemons from "./modal/ModalEditPokemons";


const Content = () => {
 
    
  
  const [showModalPokemons, setShowModalPokemons] = useState(false);
  const [showModalEditPokemons, setShowModalEditPokemons] = useState(false);
  const [selectedPokemons, setSelectedPokemons] = useState(null);
  
  const [textButtonHapus, setTextButtonHapus] = useState("Hapus");
  const [status, setStatus] = useState("");
  const [disabled, setDisabled] = useState(false);
  
    const [showModalHapus, setShowModalHapus] = useState(false);
    const [selectedHapus, setSelectedHapus] = useState(null);

  const { Pokemons, loading } = UseGetPokemons() || [];


  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);

 const filteredData = useMemo(() => {
    return  Pokemons?.filter((item) => {
    const cocokNama = (item.names || '').toLowerCase().includes(searchTerm.toLowerCase());
    return cocokNama;

     });
  }, [searchTerm, Pokemons]);


   const rowsPerPage = 5;
  
   const tambahData = () => {
     setShowModalPokemons(true);
   }

  const handleEdit = (pokemon_id) => {
      const selected = Pokemons.find(
              (b) => b?.pokemon_id === pokemon_id
            );
            if (selected) {
             setSelectedPokemons(selected);
              setShowModalEditPokemons(true);
            } 
  };

  const handleDelete = (pokemon_id) => {
   
     const selected = Pokemons.find(
              (b) => b?.pokemon_id === pokemon_id
            );
            if (selected) {
             setSelectedHapus(selected);
              setShowModalHapus(true);
            } 
  };


  
 useEffect(() => {
   if (!Pokemons) {
      return;
   } 

   const startIndex = (page - 1) * rowsPerPage;
      const endIndex = page * rowsPerPage;
       
      const newPageData = filteredData?.slice(startIndex, endIndex);
    
       setPaginatedData(newPageData);

  }, [Pokemons, filteredData, page, rowsPerPage]);


    const handleHapus = async (selectedHapus) => {
      try {
        setTextButtonHapus('Prosess...')

        const toastLoading = toast.loading("Memproses data...");
        // kirim request DELETE ke backend
         await axiosClient.delete(`/api/pokemons/${selectedHapus.pokemon_id}`);
        toast.dismiss(toastLoading);
        
        setShowModalHapus(false);
          toast.success("🎉 Pokemons Berhasil Dihapus", {
                style: {
                    border: '1px solid #16A34A',
                    background: '#ECFDF5', 
                    color: '#065F46',
                    fontWeight: '500',
                },
                iconTheme: {
                    primary: '#16A34A',
                    secondary: '#ECFDF5',
                    },
            });
            
        setTimeout(() => window.location.reload(), 2000);
      

      } catch (err) {
         setStatus( err.response.data.messageerors);
       setTextButtonHapus("Edit Pokemons");
      setDisabled(false);
    } finally {
      setTextButtonHapus("Edit Pokemons");
      setTimeout(() => setStatus(""), 3000);
      }
    };

       if(loading) return <LoadingPokemons />; 

  return (
    <>
    <div className="p-6 bg-gray-50 min-h-screen space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          Manajemen Pokemons
        </h1>
        <p className="text-gray-600">Tambah, edit, atau hapus Pokemons dengan mudah.</p>
      </header>


            {status && 
                                <div 
                                role="alert"
                                className={`text-center mb-4 ${status?.includes('Berhasil') ? 'bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mb-3 ' : 'bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3 w-50'}`}>
                                    {status}
                                </div>              
                           }


      {/* Form Tambah / Edit */}
      <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
      

        <div className="grid md:grid-cols-3 gap-4">
          <div className="col-span-full flex gap-3 justify-end mt-2">
            <button
              type="submit"
              onClick={() => tambahData()}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition`}
            >
              <Save className="w-4 h-4" />
              Tambah Pokemons
            </button>
          </div>
        </div>
      </div>

      {/* Daftar Pokemons */}
      <div className="bg-white rounded-2xl shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Daftar Pokemons Aktif
        </h2>
      <div className="relative w-full md:w-1/2 mb-4">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari...."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {paginatedData.length > 0 ? (
        <div className="overflow-x-auto w-full">
        <table className="min-w-full text-sm text-left">

            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-4 font-medium">name</th>
                <th className="py-3 px-4 font-medium">Base Experince</th>
                <th className="py-3 px-4 font-medium">Weight</th>
                <th className="py-3 px-4 font-medium">image</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((Pokemons) => (
                <tr key={Pokemons.pokemon_id} className="border-t hover:bg-gray-50 transition">
                  <td className="py-3 px-4">{Pokemons.name}</td>
                  
                  <td className="py-3 px-4">{Pokemons.base_experience}</td>
                  <td className="py-3 px-4">{Pokemons.weight}</td>
                     <td className="py-3 px-4">
                        <img 
                  src={Pokemons.image_path ? `http://localhost:8000/api/photos/${encodeURIComponent(Pokemons.image_path)}` : 'https://via.placeholder.com/300'}
                  alt={"photo"}
                  className="w-16 h-16 object-cover rounded"
                  draggable={false}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300';
                  }}
                />
                     </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => handleEdit(Pokemons.pokemon_id)}
                        className="text-yellow-500 hover:text-yellow-600"
                      >
                        <Edit3 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(Pokemons.pokemon_id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-6">
            Belum ada Pokemons yang ditambahkan.
          </p>
        )}

           <Pagination
          currentPage={page}
          totalData={filteredData.length}
          onPageChange={setPage}
        />
      </div>

           
    </div>

       <ModalPokemons
                  isOpen={showModalPokemons}
                  onClose={() => setShowModalPokemons(false)}
                />
  <ModalEditPokemons
                  isOpen={showModalEditPokemons}
                  selectedPokemons={selectedPokemons}
                  onClose={() => setShowModalEditPokemons(false)}
                />


                  {/* Modal Popup */}
            {showModalHapus && (
               <div 
  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  onClick={() => setShowModalHapus(false)}
>
  <div 
    className="bg-white rounded-lg p-6 max-w-sm mx-4 relative"
    onClick={(e) => e.stopPropagation()}
  >
    {/* Tombol X */}
    <button
      onClick={() => setShowModalHapus(false)}
      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
    >
      <svg xmlns="http://www.w3.org/2000/svg" 
           className="h-5 w-5" 
           viewBox="0 0 20 20" 
           fill="currentColor">
        <path fillRule="evenodd" 
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 
                 1.414L11.414 10l4.293 4.293a1 1 0 
                 01-1.414 1.414L10 11.414l-4.293 
                 4.293a1 1 0 01-1.414-1.414L8.586 
                 10 4.293 5.707a1 1 0 010-1.414z" 
              clipRule="evenodd" />
      </svg>
    </button>

    <div className="text-center">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 
          2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 
          0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-2">Peringatan!</h3>
      <p className="text-sm text-gray-500 mb-4">Apa Anda Yakin Hapus Data Ini</p>
    <div className="grid grid-cols-2 gap-4">
  <button
   onClick={() => handleHapus(selectedHapus)}
    className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
  >
    {textButtonHapus}
  </button>
  <button
     disabled={disabled}
     onClick={() => setShowModalHapus(false)}
    className={`${
          disabled ? 'cursor-not-allowed opacity-50' : ''
        } w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200`}
  >
    Batal
  </button>
</div>

    </div>
    
  </div>
</div>
)}



                </>
  );
};

export default Content;
