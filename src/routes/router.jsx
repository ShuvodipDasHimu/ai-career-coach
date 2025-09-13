import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import HomePage from "../pages/HomePage"
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        path: "",
        Component: HomePage,
      },
      {
        path:"/register",
        Component: Register
      },
      {
        path:"/login",
        Component: Login
      }
    ],
  },
]);

export default router;