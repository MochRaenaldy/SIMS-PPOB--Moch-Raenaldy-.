import profile from "../assets/Profile.png";

const Profile = () => {
  const editProfile = () => {
    window.location.replace("/editProfile");
  };

  return (
    <div>
      <div className="my-14 ">
        <div className="flex justify-center">
          <div>
            <img
              className="inline-block size-16 rounded-full ring-2 ring-white "
              src={profile}
              alt=""></img>
            <h1 className="text-3xl">Kristanto Wijaya</h1>
          </div>
        </div>
      </div>
      <div className="flex justify-center my-2">
        <div className="flex flex-col gap-2 w-1/3">
          <p>Email </p>
          <input
            className="border border-gray h-8 px-2"
            type="text"
            placeholder={"Email"}
            disabled
          />
          <p>Nama Depan </p>
          <input
            className="border border-gray h-8 px-2"
            type="text"
            placeholder={"Nama Depan"}
            disabled
          />
          <p>Nama Belakang </p>
          <input
            className="border border-gray h-8 px-2"
            placeholder={"Nama Belakang"}
            type="text"
            disabled
          />
          <button
            className="bg-white text-red-500 border border-red-500 py-2 rounded-md hover:text-red-500 my-4"
            onClick={editProfile}>
            Edit Profile
          </button>
          <button className="bg-red-500 text-white py-2 rounded-md">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
