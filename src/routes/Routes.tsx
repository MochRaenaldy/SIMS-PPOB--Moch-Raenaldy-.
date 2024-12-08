import { RouteObject } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "@/pages/Home";
import RegisterPage from "@/pages/Register";
import LoginPage from "@/pages/Login";
import ProfilePage from "@/pages/Profile";
import TransactionPage from "@/pages/Transaction";
import TopupPage from "@/pages/TopupPage";
import PaymentPage from "@/pages/Payment";

const route: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/topup",
        element: <TopupPage />,
      },
      {
        path: "/transaction",
        element: <TransactionPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/payment",
        element: <PaymentPage />,
      }
    ],
  },
];

export default route;
