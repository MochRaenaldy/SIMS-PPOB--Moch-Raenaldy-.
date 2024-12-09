import { serviceFetch } from "@/store/dashboard/sevicesSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";
import { bannerFetch } from "@/store/dashboard/bannerSlice";
import { useNavigate } from "react-router-dom";

const IconDashboard = () => {
  const dispatch = useAppDispatch();
  const router = useNavigate()
  const {services } = useAppSelector(
    (state: RootState) => state.serviceState
  );
  const {
    banner,
  } = useAppSelector((state: RootState) => state.bannerState);

  const fetchServices = () => {
    dispatch(serviceFetch());
    dispatch(bannerFetch());
  };
  

  useEffect(() => {
    fetchServices();
  }, []);

  console.log(services);

  const handlePayment = (services: any) => {
    localStorage.setItem("service", JSON.stringify(services))
   router("/payment")
  }

  return (
    <div>
      <div className="flex">
        {services &&
          services.map((service: any) => (
            <div
              onClick={() => handlePayment(service)}
              className="w-[200px] h-[100px] flex flex-col justify-between items-center text-center cursor-pointer">
              <img src={service.service_icon} alt="" width={50} height={50} />
              <p>{service.service_name}</p>
            </div>
          ))}
      </div>
      <p className="text-1xl font-bold py-4 px-4">Temukan Promo Menarik</p>
      <div className="flex gap-4 w-full">
        {banner &&
          banner.map((banner: any) => (
            <div className="">
              <img src={banner.banner_image} alt="" width={300} height={50} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default IconDashboard;
