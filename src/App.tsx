import "./App.scss";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import Error from "./pages/Error";

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
      children: [
        { path: "/", element: <Home /> },
        { path: "/:category", element: <Category /> },
        { path: "/cart", element: <Cart /> },
        { path: "*", element: <Error /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
