import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import profileImg from "@/assets/Profile.png";
import { profileFetch } from "@/store/profile/profileSlice";
import { useEffect, useState } from "react";
import { UpdateImageFetch } from "@/store/profile/UploadImgProfilSlice";
import { profilUpdateFetch } from "@/store/profile/editProfileSlice";
import ProfilePhoto from "./ProfilePhoto";

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const {  error, profile } = useAppSelector(
    (state: RootState) => state.profileState
  );
  const { isLoading, error: errorUpdate, } = useAppSelector(
    (state: RootState) => state.editProfileState
  );
  const [enableEdit, setEnableEdit] = useState<boolean>(false);
  const [value, setValue] = useState({
    email: "",
    first_name: "",
    last_name: "",
    profile_image: "",
  });
  const [message, setMessage] = useState("");

  const fetchProfile = () => {
    dispatch(profileFetch());
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      setValue({
        email: profile.email,
        first_name: profile.first_name,
        last_name: profile.last_name,
        profile_image: profile.profile_image,
      });
    }
  }, [profile])

  const handleChange = (e: any) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const simpanProfile = async() => {
    const data = {
      email: value.email,
      first_name: value.first_name,
      last_name: value.last_name,
      profile_image: value.profile_image,
    };
   const res: any = await dispatch(profilUpdateFetch(data));

   if (res) {
    if (res.payload.status === 200) {
      setEnableEdit(false);
      setMessage("Profile berhasil diubah");
      fetchProfile()
    } else {
      setEnableEdit(false);
      setMessage("Profile gagal diubah " + res.payload.response.data.message);
    }
   } else {
    setEnableEdit(false);
    setMessage("Error Network!");
   }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.replace("/login");
  };

  console.log(errorUpdate);

  return (
    <div>
      <div className="mt-14 mb-6 ">
        <div className="flex justify-center">
          <div className="flex flex-col gap-2 items-center">
            <ProfilePhoto
              profile_pic={profile ? profile.profile_image : ""}
              refetch={fetchProfile}
            />
            <h1 className="text-3xl font-bold">
              {profile ? profile.first_name + " " + profile.last_name : "-"}
            </h1>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        {message && (
          <>
            {errorUpdate ? (
              <div className="text-red-500 bg-red-100 w-[300px] h-max flex justify-between text-center my-2 px-[10px]">
                {message}{" "}
                <span className="cursor-pointer" onClick={() => setMessage("")}>
                  x
                </span>
              </div>
            ) : (
              <div className="text-green-500 bg-green-100 w-[300px] h-max flex justify-between text-center my-2 px-[10px]">
                {message}{" "}
                <span className="cursor-pointer" onClick={() => setMessage("")}>
                  x
                </span>
              </div>
            )}
          </>
        )}
      </div>
      <div className="flex justify-center my-2">
        <div className="flex flex-col gap-2 w-1/3">
          <p>Email </p>
          <input
            name="email"
            className="border border-gray h-8 px-2"
            type="text"
            value={value ? value.email : "-"}
            onChange={handleChange}
            disabled={!enableEdit}
          />
          <p>Nama Depan </p>
          <input
            name="first_name"
            className="border border-gray h-8 px-2"
            type="text"
            value={value ? value.first_name : "-"}
            onChange={handleChange}
            disabled={!enableEdit}
          />
          <p>Nama Belakang </p>
          <input
            name="last_name"
            className="border border-gray h-8 px-2"
            value={value ? value.last_name : "-"}
            type="text"
            onChange={handleChange}
            disabled={!enableEdit}
          />
          {enableEdit ? (
            <>
              <button
                className="bg-red-500 text-white-500 border border-red-500 py-2 rounded-md  my-4"
                onClick={simpanProfile}>
                Simpan
              </button>
              <button
                className="bg-white-500  border border-red-500 py-2 hover:text-red-500 rounded-md"
                onClick={() => setEnableEdit(false)}>
                Batalkan
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-white text-red-500 border border-red-500 py-2 rounded-md hover:text-red-500 my-4"
                onClick={() => setEnableEdit(true)}>
                Edit Profile
              </button>
              <button
                className="bg-red-500 text-white py-2 rounded-md"
                onClick={logout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
