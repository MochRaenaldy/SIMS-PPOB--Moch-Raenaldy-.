import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { transactionFetch } from "@/store/transaction/transactionSlice";
import { useEffect, useState } from "react";

const HistoryTransaction = () => {
  const dispatch = useAppDispatch();
  const { transaction } = useAppSelector(
    (state: RootState) => state.transactionState
  );
  const [limit, setLimit] = useState(5);

  const handleShowMore = () => {
    setLimit(limit + 5);
  };
 

  const fetchServices = () => {
    const param = { limit: limit };
    dispatch(transactionFetch(param));
  };

  useEffect(() => {
    fetchServices();
  }, [limit]);
  return (
    <div className="px-4">
      <div className="font-bold text-1xl">Semua transaksi</div>
      {transaction &&
        transaction?.map((item: any) => (
          <div className="mt-4 border flex justify-between h-24 p-4">
            <div>
              {item.transaction_type === "TOPUP" ? (
                <div>
                  <p className="font-bold text-2xl text-green-500">
                    + Rp {item.total_amount}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="font-bold text-2xl text-red-500">
                    - Rp {item.total_amount}
                  </p>
                </div>
              )}

              <p className="text-sm text-gray-500">{item.created_on}</p>
            </div>
            <p>{item.description}</p>
          </div>
        ))}

        <div className="text-center text-red-400 my-5 cursor-pointer" onClick={handleShowMore}>Show More</div>
    </div>
  );
};

export default HistoryTransaction;
