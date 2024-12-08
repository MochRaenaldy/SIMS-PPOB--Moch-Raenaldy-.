import { useEffect, useRef, useState } from "react";
import profileImg from "@/assets/Profile.png";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { UpdateImageFetch } from "@/store/profile/UploadImgProfilSlice";
interface IProfileData {
  profile_pic: string;
  refetch: () => void;
}
const ProfilePhoto = ({ profile_pic, refetch }: IProfileData) => {
  const dispatch = useAppDispatch();
  const { isLoading, error, imageUpdate } = useAppSelector(
    (state: RootState) => state.uploadImageState
  );
  const refImage: any = useRef(null);
  const [photo, setPhoto] = useState<string>("");
  const [filePhoto, setFilePhoto] = useState<File>();
  const [message, setMessage] = useState<string>("");
  const handleChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxSize = 100 * 1024;
    if (e.target.files && e.target.files[0]) {
      if (e.target.files[0].size > maxSize) {
        setMessage("File size must be less than 100kb");
      } else {
        const objectUrl = URL.createObjectURL(e.target.files[0]);
        setPhoto(objectUrl);
        setFilePhoto(e.target.files[0]);
      }
    }
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", filePhoto as Blob);

    const res: any = await dispatch(UpdateImageFetch(formData));

    if (res) {
      if (res.payload.status === 200) {
        setMessage("Photo berhasil diubah");
        refetch();
      } else {
        setMessage("Photo gagal diubah " + res.payload.response.data.message);
      }
    } else {
      setMessage("Error Network!");
    }
  };

  useEffect(() => {
   if (photo) {
    uploadImage();
   }
  }, [photo])
  

  return (
    <>
      <div className="flex flex-col items-center">
        <div onClick={() => refImage.current.click()} className="relative">
          <img
            ref={refImage}
            className="inline-block size-16 rounded-full ring-2 ring-white "
            src={profile_pic ? profile_pic : profileImg}
            alt=""></img>
          <div className="absolute z-[99] left-[70%] -bottom-[2px] w-[20px] rounded-full items-center flex justify-center bg-white h-[20px] bottom-0 cursor-pointer">
            <i className="fa fa-pencil cursor-pointer"></i>
          </div>
        </div>
        <input
          type="file"
          ref={refImage}
          className="invisible"
          onChange={handleChangePhoto}
          accept="image/png, image/jpeg"
          src={`${profile_pic}` || ""}
        />
      </div>
      {message && (
        <>
          {error ? (
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
    </>
  );
};

export default ProfilePhoto;
