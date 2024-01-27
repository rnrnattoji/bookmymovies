import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import Dashboard from "./views/dashboard/dashboard.tsx";

const router = () =>
  createBrowserRouter([
    {
      path: "/",
      element: (
        <>
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
