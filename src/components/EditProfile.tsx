import { profileFetch } from "@/store/profile/profileSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect, useState } from "react";
import profileImg from "../assets/Profile.png";

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, profile } = useAppSelector(
    (state: RootState) => state.profileState
  );

  const fetchProfile = () => {
    dispatch(profileFetch());
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const [value, setValue] = useState({
    email: "",
    first_name: "",
    last_name: "",
    profile_image: "",
  });

  const simpanProfile = () => {
    const data = {
      email: value.email,
      first_name: value.first_name,
      last_name: value.last_name,
      profile_image: value.profile_image,
    };
    dispatch(profileFetch());
  };

  return (
    <div>
      <div className="my-14 ">
        <div className="flex justify-center">
          <div>
            <img
              className="inline-block size-16 rounded-full ring-2 ring-white "
              src={
                profile && profile.profile_image
                  ? profile.profile_image
                  : profileImg
              }
              alt=""></img>
            <h1 className="text-3xl font-bold">
              {profile ? profile.first_name + " " + profile.last_name : "-"}
            </h1>
          </div>
        </div>
      </div>
      <div className="flex justify-center my-2">
        <div className="flex flex-col gap-2 w-1/3">
          <p>Email </p>
          <input
            className="border border-gray h-8 px-2"
            type="text"
            placeholder={profile ? profile.email : "-"}
          />
          <p>Nama Depan </p>
          <input
            className="border border-gray h-8 px-2"
            type="text"
            placeholder={profile ? profile.first_name : "-"}
          />
          <p>Nama Belakang </p>
          <input
            className="border border-gray h-8 px-2"
            placeholder={profile ? profile.last_name : "-"}
            type="text"
          />
          <button className="bg-red-500 text-white py-2 rounded-md my-4">
            Simpan
          </button>
          <button className="bg-white text-red-500 border border-red-500 py-2 rounded-md hover:text-red-500">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
