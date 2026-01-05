import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { getMenuItems } from "../../lib/MenuItems/getMenuItem";

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const isActive = (path, activePaths = []) => {
    if (activePaths.length > 0) {
      return activePaths.some(activePath => location.pathname.startsWith(activePath));
    }
    return location.pathname === path;
  };
  
  const menuItems = getMenuItems();

 
  
  return (
    <div className={` hidden sm:flex flex-col z-50 bg-white shadow-xl border-r border-gray-200 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'md:w-64'
    } min-h-screen`}>
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <a href="/dashboard" className="flex items-center space-x-2">
            <img className="w-20 h-20" src="data:image/png;base64,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" alt="Logo" />
  
          </a>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
         
        </button>
      </div>

    

      {/* Main Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <a
            key={item.path}
            href={item.path}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${
              isActive(item.path, item.activePaths)
                ? 'bg-indigo-100 text-indigo-700 shadow-sm'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <div className={`${isActive(item.path, item.activePaths) ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
              {item.icon}
            </div>
            {!isCollapsed && (
              <>
                <span className="font-medium">{item.name}</span>
                {item.notification && (
                  <span className="ml-auto bg-indigo-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                    {item.notification}
                  </span>
                )}
              </>
            )}
            {isCollapsed && item.notification && (
              <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {item.notification}
              </span>
            )}
          </a>
        ))}

        
      <div className="p-4 border-t border-gray-200 space-y-2">
         {/* Profile Link */}
        <a
          href="/profil"
          className={`flex items-start space-x-3  py-2.5 rounded-lg transition-all duration-200 group ${
            isActive('/profil')
              ? 'bg-indigo-100 text-indigo-700 shadow-sm'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          

        </a>
      </div>
      </nav>

        
       
      </div>
 
  );
};

export default Sidebar;