// React and Hooks
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

// Components and Pages
import Home from "./pages/Home";
import Header from "./components/Header";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import Error from "./pages/Error";
import Order from "./pages/Order";

// Assets and Styles
import "./App.scss";
import Kitchen from "./pages/Kitchen";

// Types
// *

function App() {
  const Layout = () => {
    const { pathname } = useLocation();

    const headerNeededPages = ["/order"]

    return (
      <>
        {!headerNeededPages.includes(pathname) && <Header />}
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
      children: [
        { path: "/", element: <Home /> },
        { path: "/:category", element: <Category /> },
        { path: "/cart", element: <Cart /> },
        { path: "/order", element: <Order /> },
        { path: "/kitchen", element: <Kitchen /> },
        { path: "*", element: <Error /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
