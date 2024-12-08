import bgsaldo from "../assets/BgSaldo.png"
import profile from "../assets/Profile.png"

const Dashboard = () => {
  return (
    <div className="flex justify-between my-4 px-4">
      <div>
        <img
          className="inline-block size-10 rounded-full ring-2 ring-white"
          src={profile}
          alt=""></img>
        <p>Selamat Datang,</p>
        <p className="font-bold text-2xl">Kritstanto Wibowo</p>
      </div>
      <div className="flex flex-col gap-2 border border-black p-4 w-1/3 bg-red-500 rounded-md text-white">
        <p>Saldo Anda</p>
        <p className="font-bold text-2xl">Rp</p>
        <p>Lihat Saldo</p>
      </div>
    </div>
  );
};

export default Dashboard;
