import { useRoutes } from "react-router-dom";
import AuthLayout from "../page/Author";
import Login from "../components/Login";
import Register from "../components/Register";
import MainLayout from "../page/MainLayout";
import Home from "../page/Home";
import Management from "../layout/Management";
import { useState } from "react";

export default function AppRouter() {
  const [management_nav, setManagement] = useState<string>("");
  const handleManagement = (type: string) => {
    setManagement(type);
  };
  const routes = [
    {
      element: <AuthLayout />, // layout cho login/register
      children: [
        { path: "/", element: <Register /> },
        { path: "/login", element: <Login /> },
      ],
    },
    {
      element: <MainLayout management_nav={management_nav} />, // layout cho trang chính
      children: [
        {
          path: "/catalogue",
          element: (
            <Management type="catalogue" props_type={handleManagement} />
          ),
        },
        {
          path: "/management-test",
          element: <Management type="test" props_type={handleManagement} />,
        },
        // thêm route khác ở đây nếu cần
      ],
    },
    { path: "/home", element: <Home /> },
  ];

  return useRoutes(routes);
}
