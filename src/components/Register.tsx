import { Link } from "react-router-dom";
import login from "../assets/login.png";
import { authRegister } from "@/store/auth/registerSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { useState } from "react";

const Login = () => {
    const dispatch = useAppDispatch();
    const { isLoading, error } = useAppSelector(
      (state: RootState) => state.regisState
    );

    const [value, setValue] = useState({
      email: "",
      first_name: "",
      last_name: "",
      password: "",
    });

    const handleRegister = () => {
      const data = {
        email: value.email,
        password: value.password,
        first_name: value.first_name,
        last_name: value.last_name,
      };
      dispatch(authRegister(data));
      ;
    };

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }


  return (
    <div className="flex justify-between">
      <div className=" flex items-center justify-center">
        <div>
          <h1 className="text-2x1">SIMS PPOB</h1>
          <h1>Lengkapi data dengan membuat akun</h1>
          <div className="flex flex-col gap-2">
            <input
              className="border border-black"
              type="text"
              placeholder="Masukkan email Anda"
              value={value.email}
              onChange={(e) => setValue({ ...value, email: e.target.value })}
            />
            <input
              className="border border-black"
              type="text"
              placeholder="Nama depan"
              value={value.first_name}
              onChange={(e) => setValue({ ...value, first_name: e.target.value })}
            />
            <input
              className="border border-black"
              type="text"
              placeholder="Nama belakang"
              value={value.last_name}
              onChange={(e) => setValue({ ...value, last_name: e.target.value })}
            />
            <input
              className="border border-black"
              type="password"
              placeholder="buat password"
              value={value.password}
              onChange={(e) => setValue({ ...value, password: e.target.value })}
            />
            {/* <input
              className="border border-black"
              type="password"
              placeholder="konfirmasi password"
              value={value.password}
              onChange={(e) => setValue({ ...value, password: e.target.value })}
            /> */}
            <button className="bg-red-500 text-white py-2 rounded-md" onClick={handleRegister}>

              Daftar
            </button>
          </div>
          <p>
            Sudah punya akun?{" "}
            <Link className="text-blue-500" to="/login">
              Login
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
