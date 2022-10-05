import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Root, { ErrorPage as RootErrorPage } from "./routes/root";
import Repos from "./routes/repos";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <RootErrorPage />,
  },
  {
    path: "/repos",
    element: <Repos />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
