import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/Interview";
import Layout from "./features/Navbar/Layout";

export const router = createBrowserRouter([
  {
    element: <Layout/>, // Navbar will be inside Router now
    children: [
      {
        path: "/",
        element: (
          <Protected>
            <Home />
          </Protected>
        ),
      },
      {
        path: "/interview/:interviewId",
        element: (
          <Protected>
            <Interview />
          </Protected>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
