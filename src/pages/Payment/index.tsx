import Card from "@/components/Card";
import { paymentFetch } from "@/store/payment/paymentSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
   const navigate = useNavigate();
  const getServices = localStorage.getItem("service");
  const services = getServices ? JSON.parse(getServices) : null;
  const dispatch = useAppDispatch();
  const {  error, payment } = useAppSelector(
    (state: RootState) => state.paymentState
  );
  console.log(payment)

  const [message, setMessage] = useState("");

  const handlePayment = async () => {
    const data = {
      service_code: services?.service_code,
    };
   const res: any = await dispatch(paymentFetch(data));

   if (res) {
     if (res.payload.status === 200) {
       setMessage("Payment berhasil");
       setTimeout(() => {
         navigate("/transaction");
       }, 2000);
     } else {
       setMessage("Payment gagal " + res.payload.response.data.message);
     }
   } else {
     setMessage("Error Network!");
   }
  };

  return (
    <Card>
      <div className="px-4">
        <div>Pembayaran</div>
        <div className="flex gap-2 items-center text-sm mb-4">
          <img src={services?.service_icon} className="w-[40px]" />
          <div>{services?.service_name}</div>
        </div>
        <div className="w-1/2 flex flex-col gap-4">
          <input
            className=" border rounded-md p-2"
            type="text"
            placeholder="Nominal"
            value={services?.service_tariff}
            disabled
          />
          <button
            className="bg-red-500 text-white p-2 rounded-md"
            onClick={handlePayment}>
            Bayar
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
      </div>
    </Card>
  );
};

export default PaymentPage;
