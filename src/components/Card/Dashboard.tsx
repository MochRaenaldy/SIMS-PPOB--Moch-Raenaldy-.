import { useEffect, useState } from "react";
import profileImage from "../../assets/Profile.png";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { balanceFetch } from "@/store/dashboard/balanceSlice";
import { profileFetch } from "@/store/profile/profileSlice";

const Dashboard = () => {
  const {
    profile,
  } = useAppSelector((state: RootState) => state.profileState);
  const [showSaldo, setShowSaldo] = useState(false);
  const dispatch = useAppDispatch();
  const { balance } = useAppSelector(
    (state: RootState) => state.balanceState
  );

  const fetchServices = () => {
    dispatch(balanceFetch());
    dispatch(profileFetch());
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="flex justify-between my-4 px-4">
      <div>
        <img
          className="inline-block size-10 rounded-full ring-2 ring-white"
          src={
            profile && profile.profile_image
              ? profile.profile_image
              : profileImage
          }
          alt=""></img>
        <p>Selamat Datang,</p>
        <p className="font-bold text-3xl">
          {profile ? profile.first_name + " " + profile.last_name : "-"}
        </p>
      </div>
      <div className="flex flex-col gap-2 border border-black p-4 w-1/3 bg-red-500 rounded-md text-white">
        <p>Saldo Anda</p>
        <p className="font-bold text-2xl">
          Rp {showSaldo ? (balance ? balance : "0") : "* * * * * *"}{" "}
        </p>
        <div
          className="cursor-pointer w-[100px]"
          onClick={() => setShowSaldo(!showSaldo)}>
          {showSaldo ? <p>Tutup Saldo</p> : <p>Lihat Saldo</p>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
