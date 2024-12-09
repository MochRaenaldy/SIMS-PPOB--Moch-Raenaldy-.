import { Link } from "react-router-dom";
import login from "@/assets/login.png";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect, useState } from "react";
import { authLogin, ILogin } from "@/store/auth/loginSlice";
import { setAuthToken } from "@/utils/api";
import logo from "@/assets/logo.png";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILoginForm } from "@/types/login";
import { Controller, useForm } from "react-hook-form";

const Login = () => {
  const getToken = localStorage.getItem("token");
  const dispatch = useAppDispatch();
  const { error, isAuthenticated, token }: ILogin = useAppSelector(
    (state: RootState) => state.loginState
  );
  const [message, setMessage] = useState("");

   const schema = yup.object({
     email: yup
       .string()
       .required("Email is required")
       .email("Email is invalid"),
     password: yup
       .string()
       .required("Password is required")
       .min(8, "Password must be at least 8 characters"),
   });

   const {
     handleSubmit,
     control,
     formState: { errors },
   } = useForm<ILoginForm>({
     resolver: yupResolver(schema),
     defaultValues: {
       email: "",
       password: "",
     },
     reValidateMode: "onSubmit",
     mode: "all",
   });

  useEffect(() => {
    if (isAuthenticated || token || getToken) {
      setAuthToken(token || getToken || null);
      setTimeout(() => {
        window.location.replace("/");
      }, 200);
    }
  }, [ isAuthenticated, token]);

  const submitLogin = async (dataLogin: ILoginForm) => {
    const data = {
      email: dataLogin.email,
      password: dataLogin.password,
    };
   const res: any = await dispatch(authLogin(data));

    if (res) {
      if (res.payload.status === 200) {
        setMessage("Login berhasil");
      } else {
        setMessage("Login gagal " + res.payload.response.data.message);
      }
    } else {
      setMessage("Error Network!");
    }
  };

  console.log(error)

  return (
    <div className="flex h-screen justify-between">
      <div className=" flex w-[60%] items-center justify-center">
        <div>
          <div className="flex items-center justify-center font-bold gap-2 mb-2">
            <img src={logo} alt="" />
            <h1 className="text-[24px] ">SIMS PPOB</h1>
          </div>
          <div className="flex flex-col items-center justify-center font-bold gap-1">
            <h1 className="text-[24px]">Masuk atau membuat akun </h1>
            <h1 className="text-[24px]">untuk memulai</h1>
          </div>
          <div className="flex flex-col gap-2 w-[400px]">
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <>
                  <input
                    className="border border-gray-400 h-8 rounded-md my-2 px-2"
                    type="text"
                    placeholder="Masukkan email Anda"
                    {...field}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-[10px]">
                      {errors.email.message}
                    </p>
                  )}
                </>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <>
                  <input
                    className="border border-gray-400 h-8 rounded-md my-2 px-2"
                    type="password"
                    placeholder="Masukkan password Anda"
                    {...field}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-[10px]">
                      {errors.password.message}
                    </p>
                  )}
                </>
              )}
            />

            <button
              className="bg-red-500 text-white py-2 rounded-md"
              onClick={handleSubmit(submitLogin)}>
              Masuk
            </button>
          </div>
          {message && (
            <>
              {error ? (
                <div className="text-red-500 bg-red-100 w-full h-max flex justify-between text-center my-2 px-[10px]">
                  {message}{" "}
                  <span
                    className="cursor-pointer"
                    onClick={() => setMessage("")}>
                    x
                  </span>
                </div>
              ) : (
                <div className="text-green-500 bg-green-100 w-full h-max flex justify-between text-center my-2 px-[10px]">
                  {message}{" "}
                  <span
                    className="cursor-pointer"
                    onClick={() => setMessage("")}>
                    x
                  </span>
                </div>
              )}
            </>
          )}
          <p>
            Belum Punya Akun?{" "}
            <Link className="text-blue-500" to="/register">
              Buat Akun
            </Link>
          </p>
        </div>
      </div>

      <div className="flex w-[40%] ">
        <img src={login} alt="" className="w-screen" />
      </div>
    </div>
  );
};

export default Login;
