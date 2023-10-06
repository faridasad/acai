import "./App.scss";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Category from "./pages/Category";

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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
