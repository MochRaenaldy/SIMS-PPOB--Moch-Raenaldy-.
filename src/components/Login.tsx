import { Link } from "react-router-dom";
import login from "../assets/login.png";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import { useEffect, useState } from "react";
import { authLogin, ILogin } from "@/store/auth/loginSlice";
import { setAuthToken } from "@/utils/api";

const Login = () => {
    const getToken = localStorage.getItem("token");
    const dispatch = useAppDispatch();
    const { isLoading, error, isAuthenticated, token }: ILogin = useAppSelector(
      (state: RootState) => state.loginState
    );

    const [value, setValue] = useState({
      email: "",
      password: "",
    });

    useEffect(() => {
      if (isAuthenticated || token || getToken) {
        // localStorage.setItem("token", token || getToken || "");
        setAuthToken(token || getToken || null);
        setTimeout(() => {
          window.location.replace("/");
        }, 1500);
      }
    }, [isLoading, error, isAuthenticated, token]);

    const submitLogin = () => {
      const data = {
        email: value.email,
        password: value.password,
      };
      dispatch(authLogin(data));
    };


  return (
    <div className="flex justify-between">
      <div className=" flex items-center justify-center">
        <div>
          <h1 className="text-2x1">SIMS PPOB</h1>
          <h1>Masuk atau Buat Akun untuk Memulai</h1>
          <div className="flex flex-col gap-2">
            <input
              className="border border-black"
              type="text"
              placeholder="Masukkan Email Anda"
              value={value.email}
              onChange={(e) => setValue({ ...value, email: e.target.value })}
            />
            <input
              className="border border-black"
              type="password"
              placeholder="Massukkan Password Anda"
              value={value.password}
              onChange={(e) => setValue({ ...value, password: e.target.value })}
            />
            <button
              className="bg-red-500 text-white py-2 rounded-md"
              onClick={submitLogin}
            >
              Masuk
            </button>
          </div>
          <p>
            Belum Punya Akun?{" "}
            <Link className="text-blue-500" to="/register">
              Buat Akun
            </Link>
          </p>
        </div>
      </div>

      <div className="flex flex-row-reverse">
        <img src={login} alt="" className="max-h-screen" />
      </div>
    </div>
  );
};

export default Login;
