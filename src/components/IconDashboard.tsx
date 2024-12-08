import { serviceFetch } from "@/store/dashboard/sevicesSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";
import profile from "../assets/Game.png";

const IconDashboard = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, services } = useAppSelector(
    (state: RootState) => state.serviceState
  );
  console.log(services);

  const fetchServices = () => {
    dispatch(serviceFetch());
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // if  (isLoading) {
  //     return <div>Loading...</div>;
  // } else if (error) {
  //     return <div>{error}</div>;
  // }

  return (
    <div className="gap-2">
      {services.map((service: any) => (
        <div>
          <img src={service.service_icon} alt="" />
          <p>{service.service_name}</p>
        </div>
      ))}
    </div>
  );
};

export default IconDashboard;
