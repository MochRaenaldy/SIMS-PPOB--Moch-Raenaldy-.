const EditProfile = () => {
  return (
    <div>
      <div className="my-14 ">
        <div className="flex justify-center">
          <div>
            <img
              className="inline-block size-16 rounded-full ring-2 ring-white "
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""></img>
            <h1 className="text-3xl">Kristanto Wijaya</h1>
          </div>
        </div>
      </div>
      <div className="flex justify-center my-2">
        <div className="flex flex-col gap-2 w-1/3">
          <p>Email </p>
          <input className="border border-black h-8 px-2" type="text" />
          <p>Nama Depan </p>
          <input className="border border-black h-8 px-2" type="text" />
          <p>Nama Belakang </p>
          <input className="border border-black h-8 px-2" type="text" />
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
