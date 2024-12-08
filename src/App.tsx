import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes/Routes";
import { useEffect } from "react";
import { setAuthToken } from "./utils/api";

function App() {
  const getToken = localStorage.getItem("token");
  const pathName = window.location.pathname;

  console.log(pathName);

  useEffect(() => {
    if (getToken) {
      setAuthToken(getToken);
    }  else {
      if (pathName === "/login" || pathName === "/register") return;
      else setAuthToken(null); 
    }
  }, [getToken]);
  return <RouterProvider router={createBrowserRouter(routes)} />;
}

export default App;
