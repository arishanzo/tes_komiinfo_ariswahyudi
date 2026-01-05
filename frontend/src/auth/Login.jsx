
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../lib/axios";
import { useAuth } from "../context/AuthContext";
import UsePageLoadig from "../hook/usePageLoading";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { isNetworkError } from "../utils/connectionCheck";

const Login = () => {
  const { pageLoading } = UsePageLoadig();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [textButton, setTextButton] = useState("Sign In");

  const handleChange = (e) =>
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    setTextButton("Sedang Masuk…");
    setErrors({}); // reset

    try {
      // 1) ambil CSRF cookie
      await axiosClient.get("/sanctum/csrf-cookie");
      await axiosClient.post("/api/login", formData);
    
      const userResponse = await axiosClient.get("/api/user");
      await login(userResponse.data);
    
      
      setStatus("Login berhasil. Mengalihkan ke dashboard...");
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
   
      
    } catch (err) {
      console.error("Login error:", err);
      
      if (isNetworkError(err)) {
        setStatus("Tidak dapat terhubung ke server. Periksa koneksi internet Anda.");
      } else {
        const data = err.response?.data || {};
        setErrors(data.errors || { general: [data.message || "Login gagal."] });
        setStatus(data.message || "Login gagal. Silakan coba lagi.");
      }
    } finally {
      setDisabled(false);
      setTextButton("Sign In");
      setTimeout(() => setStatus(""), 3000);
    }
  };


    if (pageLoading) {
    return <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
    }

    

    return (
        <>
 <div className="min-h-screen bg-gradient-to-b from-teal-400 via-indigo-400 to-blue-300 text-gray-900 flex justify-center">
      <div className="max-w-screen-sm m-0 sm:m-10 bg-white shadow-xl sm:rounded-lg flex justify-center flex-1">
        <div className="max-w-full p-6 ">
        
          <div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcycOyTYkYV2Gu0JQxchy9A2wwIG5bATQwbA&s"
              className="mx-auto h-80"
              alt="Logo"
            />

            
          </div>
        
          <div className=" flex flex-col items-center">
            <div className="w-full flex-1 ">
                <h1 className="text-2xl font-bold text-center mb-2">
                    Login Untuk Admin
                    </h1>
   <p className="text-center text-gray-600 mb-6"> 
                </p>
                               {status && 
                                <div 
                                role="alert"
                                className={`text-center mb-4 ${status?.includes('berhasil') ? 'bg-indigo-100 rounded-lg py-5 px-6 mb-4 text-base text-indigo-700 mb-3 ' : 'bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3 w-50'}`}>
                                    {status}
                                </div>              
                           }


              <div className="mx-auto max-w-full">


            <form  onSubmit={handleSubmit}>

                 <div className="mb-4">
                   <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="namalengkap">
                     Username
                  </label>

                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  value={formData.username}
                   onChange={handleChange}
                  placeholder="Masukan Username Anda"
                  name="username"
                />
            {errors?.username?.[0] && <small style={{color: 'red'}}>{errors.username[0]}</small>}

                </div>

                
                <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700" htmlFor="namalengkap">
              Password
              </label>    
             <input
                                                     value={formData.password}
                                         onChange={handleChange}

                              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
                              type="password"
                                name='password'
                              placeholder="Masukan Password Anda"
                            />

              {errors?.password?.[0] && <small style={{color: 'red'}}>{errors.password[0]}</small>}
            </div>
                <button 
                type="submit"
                  disabled={disabled}
                  className={`${
                      disabled ? 'cursor-not-allowed opacity-50' : ''
                     } mt-5 tracking-wide font-semibold bg-indigo-400 text-white w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}>
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-4">{textButton}</span>
                </button>

</form>

                <div className="flex mt-4 flex-col items-center">




               <hr className="mb-6 border-t" />
                 
                                

                <p className="mt-6 text-xs text-gray-600 text-center">
                  I agree to abide by Cartesian Kinetics{" "}
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Terms of Service
                  </a>{" "}
                  and its{" "}
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
 </>
    );
};


export default Login;