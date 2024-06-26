"use client"
import React from "react";
import Link from "next/link";
import api from "@/utils/api";
import { redirect, useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export default function Login() {
  const [username, setUsername] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [birthdate, setBirthdate] = React.useState("");
  const [thumbnail, setThumbnail] = React.useState(null); // Ubah default state menjadi null
  const [isSend, setIsSend] = React.useState(false);
  const router = useRouter();
  const [error, setError] = React.useState({});
  const [isRegisterError, setIsRegisterError] = React.useState(null);

  React.useEffect(() => {
    checkForm();
  },[ email, phone, password, confirmPassword]);

  function checkForm() {
    let errors ={}
    if (email == "" || email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
      errors.email = false;
    }
    else{
      errors.email = true;
    }

    if (phone == "" || phone.match(/\d/g).length>11){
    
      errors.phone = false;
    }
    else{
      errors.phone = true;
    }
    if (password != confirmPassword){
      errors.password = true;
      errors.confirmPassword = true;
    }
    else{
      errors.password = false;
      errors.confirmPassword = false;
    }

    setError(errors);

  }
  
  const [authedUser, setAuthedUser] = React.useState(null);

  async function handleRegister(e) {
    e.preventDefault();
    setIsSend(true);
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData);
		let thumbnailPath = null;
		if (thumbnail) {
			const response1 = await api.uploads(formData);
			if (!response1.ok) {
				throw new Error('Network response was not ok');
			}
			thumbnailPath = response1.filePath;
		}
    console.log(thumbnailPath);
    try {
      const response = await api.register({username, name, password, email, phone, birthdate, thumbnail: thumbnailPath});
      if (response) {
        onRegisterSuccess(response.token);
      }
      else{
        setIsSend(false);
      }
    } catch (error) {
      setIsSend(false);
      setIsRegisterError(error.message)
    }
  }

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  function handleShowConfirmPassword() {
    setShowConfirmPassword(!showConfirmPassword);
  }
  function handleShowPassword() {
    setShowPassword(!showPassword);
  }
  async function onRegisterSuccess(token) {
    api.putAccessToken(token);
    
    router.push('/form');
    setIsSend(false);
  }

  async function checkLoggedIn() {
    const accessToken = api.getAccessToken();
    if (accessToken) {
      const data  = await api.getUserLoggedIn();
      setAuthedUser(data);
    }

    console.log("authedUser", authedUser);
  }

  React.useEffect(() => {
    checkLoggedIn();
  },[]);

  



return (
    <>
      <div className="container my-auto mx-auto px-4 h-screen">
        <div className="flex content-center items-center justify-center h-full my-auto">
          <div className="w-full lg:w-4/12 px-4 ">
            <div className="relative flex flex-col min-w-0 break-words w-full pt-6 shadow-xl rounded-lg border-0 bg-white h-1/2">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-xl text-center mb-3 font-bold py-4">
                  Register 
                </div>
                <div className={`bg-red-100 my-6 border border-red-400 text-red-700 px-4 py-3 rounded relative ${isRegisterError ? "block" : "hidden"}`}>
                  {isRegisterError}
                </div>
                <form encType="multipart/form-data" onSubmit={handleRegister}>


                  <input
                    type="text"
                    className={`border-0 px-3 py-3 placeholder-gray-600 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 mt-4 ${error.username ? 'border-red-500 border-1' : 'border-0'} `}
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                  />

                  <input
                    type="email"
                    className={`border-0 px-3 py-3 placeholder-gray-600 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 mt-4 ${error.email ? 'border-red-500 border-1' : 'border-0'} `}

                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />



                  <input
                    type="text"
                    className={`border-0 px-3 py-3 placeholder-gray-600 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 mt-4 ${error.phone ? 'border-red-500 border-1' : 'border-0'} `}

                    placeholder="Phone"
                    onChange={(e) => setPhone(e.target.value)}
                  />

                 
                  <input
                    type="date"
                    className={`border-0 px-3 py-3 placeholder-gray-600 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 mt-4 ${error.birthdate ? 'border-red-500 border-1' : 'border-0'} `}
                    placeholder="Birthdate"
                    onChange={(e) => setBirthdate(e.target.value)}
                  />

                  <input
                    type="text"
                    className={`border-0 px-3 py-3 placeholder-gray-600 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 mt-4 ${error.username ? 'border-red-500 border-1' : 'border-0'} `}
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={`border-0 px-3 py-3 placeholder-gray-600 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 mt-4 ${error.password ? 'border-red-500 border-1' : 'border-0'} `}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                                      <button type="button" className="absolute right-0 bottom-3 pr-3" onClick={handleShowPassword}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />  }
                    </button>
                  </div>
                  <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className={`border-0 px-3 py-3 placeholder-gray-600 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 mt-4 ${error.confirmPassword ? 'border-red-500 border-1' : 'border-0'} `}
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                                      <button type="button" className="absolute right-0 bottom-3 pr-3" onClick={handleShowConfirmPassword}>
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />  }
                    </button>
                  </div>

                  <input
                    type="file"
                    className="border-0 px-3 py-3 placeholder-gray-600 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 mt-4"
                    placeholder="Photo"
                    name="thumbnail"
                    onChange={(e) => setThumbnail(e.target.files[0] || null)} // Ubah handler untuk mengatur thumbnail menjadi null jika tidak ada file yang dipilih
                  />

                  <div className="text-center mt-6">
                    <button
                      className="bg-blue-800 text-white active:bg-blue-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150 disabled:cursor-not-allowed disabled:bg-blue-400"
                      type="submit"
                      disabled={isSend ? true : false}
                      
                    >
                      Register
                    </button>
                  </div>
                  
                  <hr className="my-3 border-b-1 border-blueGray-300" />
                  <Link
                    href={"/login"}
                    className="bg-slate-50 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full block ease-linear transition-all duration-150 text-center"
                  >
                    Login
                  </Link>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


