import React, { useState } from "react";
import BG from "./assets/bg.jpg";
import { useAuth } from "./Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, currentUser, signInWithGoogle } = useAuth();

  const navigate = useNavigate();
  const toastStyle = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signIn(email, password);
      navigate("/");
    } catch {
      toast.error("LogIn Failed.", toastStyle);
    }
    setLoading(false);
  };

  // const handleGoogleSignIn = () => {
  //   try {
  //     signInWithGoogle();
  //   } catch {
  //     console.error("SOmething went wrong");
  //   }
  // };

  return (
    <main
      className="flex flex-col items-center justify-center w-screen h-screen overflow-y-hidden bg-fixed bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${BG})` }}
    >
      <div className="w-[80%] h-[500px] md:w-[60%] lg:w-[40%] md:h-[550px] fixed translate-y-[-50px] md:translate-y-[0px]">
        <form
          className="flex flex-col items-center justify-center w-full h-full login-form"
          onSubmit={handleSubmit}
        >
          <h1 className="text-[#fefefe] mb-10 text-[30px] ">
            Login as <span className="text-[#ff697d]">Admin</span>
          </h1>
          <input
            className="w-[90%] h-[50px] border-2 border-[#252525] p-3 m-2 rounded-xl focus:outline-none bg-transparent hover:bg-[#272727] cursor-pointer  focus:border-[#6b6b6b] text-lg text-[#cccaca] focus:cursor-text"
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="off"
          />
          <input
            className="w-[90%] h-[50px] border-2 border-[#252525] p-3 m-2 rounded-xl focus:outline-none   hover:bg-[#272727] cursor-pointer bg-transparent focus:border-[#6b6b6b] text-lg text-[#cccaca] focus:cursor-text"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="off"
          />
          <button
            type="submit"
            className=" text-white text-xl mt-10 p-5 border bg-none rounded-xl font-bold max-w-[250px] border-[#ff697d] hover:bg-[#ff697d]"
            disabled={loading}
          >
            Submit
          </button>
          {/* <p className="p-3 text-[#fefefe] ">Or</p>
          <div className="flex items-center justify-center gap-3 px-3 py-4 border rounded-lg cursor-pointer hover:bg-[#887c7e] hover:border-transparent " onClick={handleGoogleSignIn}>
            <p className="text-[#fefefe] text-[16px]">Sign in Using</p>
            <img src={GOOGLE} className="w-[18px] h-[18px]" />
          </div> */}
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </main>
  );
};

export default Login;
