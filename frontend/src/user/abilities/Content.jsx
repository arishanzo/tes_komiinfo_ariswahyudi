
import { Plus, Edit3, Trash2, Tag, Percent, Save, X, Search } from "lucide-react";
import Pagination from "../components/Pagination";
import toast from "react-hot-toast";
import axiosClient from "../../lib/axios";
import { useEffect, useMemo, useState } from "react";
import LoadingAbilities from "./LoadingAbilities";
import { UseGetAbilities } from "../../hook/useGetAbilities";
import ModalAbilities from "./modal/ModalAbilities";
import ModalEditAbilities from "./modal/ModalEditAbilities";


const Content = () => {
 
    
  
  const [showModalAbilities, setShowModalAbilities] = useState(false);
  const [showModalEditAbilities, setShowModalEditAbilities] = useState(false);
  const [selectedAbilities, setSelectedAbilities] = useState(null);
  
  const [textButtonHapus, setTextButtonHapus] = useState("Hapus");
  const [status, setStatus] = useState("");
  const [disabled, setDisabled] = useState(false);
  
    const [showModalHapus, setShowModalHapus] = useState(false);
    const [selectedHapus, setSelectedHapus] = useState(null);

  const { Abilities, loading } = UseGetAbilities() || [];


  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);

 const filteredData = useMemo(() => {
    return  Abilities?.filter((item) => {
    const cocokNama = (item.Abilities || '').toLowerCase().includes(searchTerm.toLowerCase());
    const cocokPraktek = (item.kouta || '').toLowerCase().includes(searchTerm.toLowerCase());
    return cocokNama || cocokPraktek;

     });
  }, [searchTerm, Abilities]);


   const rowsPerPage = 5;
  
   const tambahData = () => {
     setShowModalAbilities(true);
   }

  const handleEdit = (ablities_id) => {
      const selected = Abilities.find(
              (b) => b?.ablities_id === ablities_id
            );
            if (selected) {
             setSelectedAbilities(selected);
              setShowModalEditAbilities(true);
            } 
  };

  const handleDelete = (ablities_id) => {
   
     const selected = Abilities.find(
              (b) => b?.ablities_id === ablities_id
            );
            if (selected) {
             setSelectedHapus(selected);
              setShowModalHapus(true);
            } 
  };


  
 useEffect(() => {
   if (!Abilities) {
      return;
   } 

   const startIndex = (page - 1) * rowsPerPage;
      const endIndex = page * rowsPerPage;
       
      const newPageData = filteredData?.slice(startIndex, endIndex);
    
       setPaginatedData(newPageData);

  }, [Abilities, filteredData, page, rowsPerPage]);


    const handleHapus = async (selectedHapus) => {
      try {
        setTextButtonHapus('Prosess...')

        const toastLoading = toast.loading("Memproses data...");
        // kirim request DELETE ke backend
         await axiosClient.delete(`/api/hapusabilities/${selectedHapus.ablities_id}`);
        toast.dismiss(toastLoading);
        
        setShowModalHapus(false);
          toast.success("🎉 Abilities Berhasil Dihapus", {
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
       setTextButtonHapus("Edit Abilities");
      setDisabled(false);
    } finally {
      setTextButtonHapus("Edit Abilities");
      setTimeout(() => setStatus(""), 3000);
      }
    };

       if(loading) return <LoadingAbilities />; 

  return (
    <>
    <div className="p-6 bg-gray-50 min-h-screen space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          Manajemen Abilities
        </h1>
        <p className="text-gray-600">Tambah, edit, atau hapus Abilities dengan mudah.</p>
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
              Tambah Abilities
            </button>
          </div>
        </div>
      </div>

      {/* Daftar Abilities */}
      <div className="bg-white rounded-2xl shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Daftar Abilities Aktif
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
                <th className="py-3 px-4 font-medium">Abilities</th>
                <th className="py-3 px-4 font-medium text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((Abilities) => (
                <tr key={Abilities.ablities_id} className="border-t hover:bg-gray-50 transition">
                  <td className="py-3 px-4">{Abilities.name}</td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => handleEdit(Abilities.ablities_id)}
                        className="text-yellow-500 hover:text-yellow-600"
                      >
                        <Edit3 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(Abilities.ablities_id)}
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
            Belum ada Abilities yang ditambahkan.
          </p>
        )}

           <Pagination
          currentPage={page}
          totalData={filteredData.length}
          onPageChange={setPage}
        />
      </div>

           
    </div>

       <ModalAbilities
                  isOpen={showModalAbilities}
                  onClose={() => setShowModalAbilities(false)}
                />
  <ModalEditAbilities
                  isOpen={showModalEditAbilities}
                  selectedAbilities={selectedAbilities}
                  onClose={() => setShowModalEditAbilities(false)}
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
