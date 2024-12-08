import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { topupFetch } from "@/store/topup/topupSlice";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Topup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error, topup } = useAppSelector(
    (state: RootState) => state.topupState
  );
  
  const [message, setMessage] = useState("");
  const [value, setValue] = useState<number>(0);

  const handleValue = (e: number) => {
    setValue(e);
  };

  const handleTopup = async () => {
    const data = {
      top_up_amount: value,
    };
    const res: any = await dispatch(topupFetch(data));
    if (res) {
      if (res.payload.status === 200) {
        setMessage("TopUp berhasil");
        setTimeout(() => {
            navigate("/transaction");
        }, 2000);
      } else {
        setMessage("TopUp gagal " + res.payload.response.data.message);
      }
    } else {
      setMessage("Error Network!");
    }
  };

  return (
    <div className="px-4">
      <div>Silahkan Masukkan </div>
      <div className="font-bold text-2xl">Nominal Topup</div>

      <div>
        {value > 1000000 && (
          <p className="text-red-500">
            Nominal topup tidak boleh melebihi dari Rp 1.000.000
          </p>
        )}
        {value < 10000 && (
          <p className="text-red-500">
            Nominal topup tidak boleh kurang dari Rp 10.000
          </p>
        )}
      </div>
      <div className="my-[20px] flex">
        <div className="flex flex-col">
          <input
            type="text"
            className="w-[700px] border border-gray-300 h-10 px-4 rounded-md"
            placeholder="Masukan nominal topup"
            value={value}
            onChange={(e) =>
              handleValue(Number(e.target.value.replace(/[^0-9]/g, "")))
            }
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white mt-4 rounded-md disabled:bg-gray-400"
            disabled={!value || value < 10000 || value > 1000000}
            onClick={handleTopup}>
            Top up
          </button>

          <div className="flex justify-center">
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
          </div>
        </div>
        <div>
          <div className="flex gap-4 ml-4">
            <button
              onClick={() => handleValue(10000)}
              className="px-4 py-2 bg-white-500 border text-black w-[120px] rounded-md">
              Rp 10.000
            </button>
            <button
              onClick={() => handleValue(20000)}
              className="px-4 py-2 bg-white-500 border text-black w-[120px] rounded-md">
              Rp 20.000
            </button>
            <button
              onClick={() => handleValue(50000)}
              className="px-4 py-2 bg-white-500 border text-black w-[120px] rounded-md">
              Rp 50.000
            </button>
          </div>
          <div className="flex gap-4 ml-4">
            <button
              onClick={() => handleValue(100000)}
              className="px-4 py-2 bg-white-500 border text-black w-[120px] mt-4 rounded-md">
              Rp 100.000
            </button>
            <button
              onClick={() => handleValue(250000)}
              className="px-4 py-2 bg-white-500 border text-black w-[120px] mt-4 rounded-md">
              Rp 250.000
            </button>
            <button
              onClick={() => handleValue(500000)}
              className="px-4 py-2 bg-white-500 border text-black w-[120px] mt-4 rounded-md">
              Rp 500.000
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topup;
