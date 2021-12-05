import { Home } from "../components/pages/home/Home";
import { Setting } from "../components/pages/home/Setting";
import { Page404 } from "../components/pages/Page404";

export const homeRoutes = [
  {
    path: "/",
    exact: true,
    children: <Home />,
  },
  {
    path: "/setting",
    exact: false,
    children: <Setting />,
  },
  {
    path: "*",
    exact: false,
    children: <Page404 />,
  },
];
