import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import HomePage from "../pages/HomePage"
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import Dashboard from "../pages/Dashboard"
import ResumeAnalyzer from "../pages/ResumeAnalyzer"
import RoadmapGenerator from "../pages/RoadmapGenerator"
import ErrorPage from "../pages/ErrorPage"

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage/>,
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
      },
      {
        path:"/dashboard",
        Component: Dashboard
      },
      {
        path:"/resume-analyzer",
        Component: ResumeAnalyzer
      },
      {
        path:"/roadmap-generator",
        Component: RoadmapGenerator
      }
    ],
  },
]);

export default router;