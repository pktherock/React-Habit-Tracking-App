import { RouterProvider } from "react-router-dom";
import "./App.css";
import appRoutes from "./app.routes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer newestOnTop />
      <RouterProvider router={appRoutes} />
    </>
  );
}

export default App;
