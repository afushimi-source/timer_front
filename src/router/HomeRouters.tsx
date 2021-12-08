import { Home } from "../components/pages/home/Home";
import { Setting } from "../components/pages/home/Setting";
import { Record } from "../components/pages/home/Record";
import { Page404 } from "../components/pages/Page404";

export const homeRoutes = [
  {
    path: "/",
    exact: true,
    children: <Home />,
  },
  {
    path: "/record",
    exact: false,
    children: <Record />,
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
