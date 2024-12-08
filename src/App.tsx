import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes/Routes";
import { useEffect } from "react";
import { setAuthToken } from "./utils/api";

function App() {
  const getToken = localStorage.getItem("token");

  useEffect(() => {
    if (getToken) {
      setAuthToken(getToken);
    }
  }, [getToken]);
  return <RouterProvider router={createBrowserRouter(routes)} />;
}

export default App;
