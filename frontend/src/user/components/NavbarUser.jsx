
import { Link, Navigate } from "react-router-dom";

const NavbarUser = () => {
  
  
 

  return (
    <>
     <nav className="fixed flex-1 top-0 right-0 z-40 py-4 md:pt-2  bg-white/80 backdrop-blur-md md:left-68 sm:left-64 left-0">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 ">
          <div className="flex justify-between items-center h-16">
            
            {/* Left side - Profile */}
            <div className="flex items-center">
              <div className="relative">
                <button
                 
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
         

                  <div className=" md:block text-left">
                  </div>
                
                </button>

         
              </div>
            </div>

         
            {/* Right side - Notifications */}
            <div className="flex items-center space-x-4">
              
              {/* Quick Actions */}
             

              {/* Notifications */}
              <div className="relative">
             

 
             
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 z-50 w-full bg-white border-t border-gray-200">
        <div className="grid h-16 max-w-lg grid-cols-5 mx-auto">
          <Link to="/dashboard" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
            <svg className="w-5 h-5 mb-1 text-gray-500 group-hover:text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs text-gray-500 group-hover:text-indigo-600">Home</span>
          </Link>
          
          <Link to="/cari-guru" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
            <svg className="w-5 h-5 mb-1 text-gray-500 group-hover:text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-xs text-gray-500 group-hover:text-indigo-600">Cari</span>
          </Link>
          
          <Link to="/kelas-saya" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
            <svg className="w-5 h-5 mb-1 text-gray-500 group-hover:text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="text-xs text-gray-500 group-hover:text-indigo-600">Kelas</span>
          </Link>
          
          <Link to="/pesan" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group relative">
            <svg className="w-5 h-5 mb-1 text-gray-500 group-hover:text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            <span className="text-xs text-gray-500 group-hover:text-indigo-600">Pesan</span>
            <span className="absolute top-2 right-3 block h-2 w-2 rounded-full bg-indigo-400"></span>
          </Link>
          
          <Link to="/profil" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
            <svg className="w-5 h-5 mb-1 text-gray-500 group-hover:text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs text-gray-500 group-hover:text-indigo-600">Profil</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavbarUser;