import "./App.scss";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header"

function App() {
  const Layout = () => {
    return (
      <>
        <Header />
        <main>
          <Outlet />
        </main>
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [{ path: "/", element: <Home /> }],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
