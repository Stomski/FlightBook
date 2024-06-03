import { createBrowserRouter } from "react-router-dom";

import Layout from "./Layout";
import MainPage from "../components/MainPage/MainPage";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
    ],
  },
]);
