import { Link } from "react-router-dom";
import login from "@/assets/login.png";
import { authRegister } from "@/store/auth/registerSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect, useState } from "react";
import { setAuthToken } from "@/utils/api";
import * as yup from "yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegisterForm } from "@/types/register";
import logo from "@/assets/logo.png";

const Login = () => {
  const getToken = localStorage.getItem("token");
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(
    (state: RootState) => state.regisState
  );
  const [message, setMessage] = useState("");

  const schema = yup.object({
    first_name: yup
      .string()
      .required("First name is required")
      .min(3, "First name must be at least 5 characters"),
    last_name: yup
      .string()
      .min(3, "Last name must be at least 4 characters")
      .required("Last name is required"),
    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    passwordConfirmation: yup
      .string()
      .required("Password Confirmation is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IRegisterForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      passwordConfirmation: "",
    },
    reValidateMode: "onSubmit",
    mode: "all",
  });

  useEffect(() => {
    if (getToken) {
      setAuthToken(getToken);
      setTimeout(() => {
        window.location.replace("/");
      }, 200);
    }
  }, [getToken]);

  const handleRegister = async (dataSave: IRegisterForm) => {
    const data = {
      email: dataSave.email,
      password: dataSave.password,
      first_name: dataSave.first_name,
      last_name: dataSave.last_name,
    };
    const res: any = await dispatch(authRegister(data));

    if (res) {
      if (res.payload.status === 200) {
        setMessage("Register berhasil");
      } else {
        setMessage("Register gagal " + res.payload.response.data.message);
      }
    } else {
      setMessage("Error Network!");
    }

  };

  return (
    <div className="flex h-screen justify-between">
      <div className=" flex w-[60%] items-center justify-center">
        <div>
          <div className="flex items-center justify-center font-bold gap-2 mb-2">
            <img src={logo} alt="" />
            <h1 className="text-[24px] ">SIMS PPOB</h1>
          </div>
          <div className="flex flex-col items-center justify-center font-bold gap-1">
            <h1 className="text-[24px]">Lengkapi data untuk </h1>
            <h1 className="text-[24px]">membuat akun</h1>
          </div>

          <div className="flex flex-col gap-2 w-[400px] mt-4 ">
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
              name="first_name"
              render={({ field }) => (
                <>
                  <input
                    className="border border-gray-400 h-8 rounded-md my-2 px-2"
                    type="text"
                    placeholder="Masukkan first name Anda"
                    {...field}
                  />
                  {errors.first_name && (
                    <p className="text-red-500 text-[10px]">
                      {errors.first_name.message}
                    </p>
                  )}
                </>
              )}
            />

            <Controller
              control={control}
              name="last_name"
              render={({ field }) => (
                <>
                  <input
                    className="border border-gray-400 h-8 rounded-md my-2 px-2"
                    type="text"
                    placeholder="Masukkan last name Anda"
                    {...field}
                  />
                  {errors.last_name && (
                    <p className="text-red-500 text-[10px]">
                      {errors.last_name.message}
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

            <Controller
              control={control}
              name="passwordConfirmation"
              render={({ field }) => (
                <>
                  <input
                    className="border border-gray-400 h-8 rounded-md my-2 px-2"
                    type="password"
                    placeholder="Konfirmasi password Anda"
                    {...field}
                  />
                  {errors.passwordConfirmation && (
                    <p className="text-red-500 text-[10px]">
                      {errors.passwordConfirmation.message}
                    </p>
                  )}
                </>
              )}
            />

            <button
              className="bg-red-500 text-white py-2 rounded-md"
              onClick={handleSubmit(handleRegister)}>
              Daftar
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
            Sudah punya akun?{" "}
            <Link className="text-blue-500" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>

      <div className="flex w-[40%]">
        <img src={login} alt="" className="w-screen" />
      </div>
    </div>
  );
};

export default Login;
