import { createBrowserRouter } from "react-router-dom";
import { PublicLayout } from "./layouts";
import { ErrorPage } from "./components";
import { habitRoutes } from "./features/habit";

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <ErrorPage />,
    children: [...habitRoutes],
  },
]);

export default appRoutes;
