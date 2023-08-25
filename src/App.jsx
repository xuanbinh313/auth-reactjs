import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Components
import UserName from "./components/UserName";
import Register from "./components/Register";
import Password from "./components/Password";
import Reset from "./components/Reset";
import Recovery from "./components/Recovery";
import Profile, { loader } from "./components/Profile";
import PageNotFound from "./components/PageNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserName />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/password",
    element: <Password />,
  },
  {
    path: "/reset",
    element: <Reset />,
  },
  {
    path: "/recovery",
    element: <Recovery />,
  },
  {
    path: "/profile",
    loader: loader,
    element: <Profile />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
function App() {
  return <main><RouterProvider router={router} /></main>
}

export default App
