import { createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/pages/LoginPage.jsx";
import Register from "./features/auth/pages/Register.jsx";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
