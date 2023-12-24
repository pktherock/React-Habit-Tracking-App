import { RouterProvider } from "react-router-dom";
import "./App.css";
import appRoutes from "./app.routes";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <ToastContainer newestOnTop />
      <RouterProvider router={appRoutes} />
    </Provider>
  );
}

export default App;
