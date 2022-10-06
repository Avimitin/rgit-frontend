import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Root, { ErrorPage as RootErrorPage } from "./routes/root";
import Repos from "./routes/repos";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import createConfig from "./config";

const config = createConfig();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root config={config} />,
    errorElement: <RootErrorPage />,
  },
  {
    path: "/repos",
    element: <Repos config={config} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
