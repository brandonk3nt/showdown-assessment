import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home-page";
// import LeaderboardPage from "./pages/leaderboard-page";
import ErrorPage from "./pages/error-page";
import Layout from "./components/layout";
import { isAuthCookieValid, redirectToAuth } from "./utils/cookie";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      // {
      //   path: "leaderboard",
      //   element: <LeaderboardPage />,
      // },
    ],
  },
]);

const App = () => {
  const authCookieIsValid = isAuthCookieValid();

  useEffect(() => {
    if (!authCookieIsValid) {
      redirectToAuth();
    }
  }, [authCookieIsValid]);
  return <RouterProvider router={router} />;
};

export default App;
