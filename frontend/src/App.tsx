import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Navbar from "./components/navbar/navbar.tsx";
import Dashboard from "./views/dashboard/dashboard.tsx";

const router = () =>
  createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar/>
          <Dashboard />
        </>
      ),
    },
  ]);

const App = () => {
  return (
    <>
      <RouterProvider router={router()} />
    </>
  );
};

export default App;
