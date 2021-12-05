import { ReactElement } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { Login } from "../components/pages/Login";
import { AuthProvider, useLoginUser } from "../hooks/providers/useAuthProvider";
import { Signup } from "../components/pages/Signup";
import { Page404 } from "../components/pages/Page404";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { homeRoutes } from "./HomeRouters";
import { useAuth } from "hooks/useAuth";

export const Router = () => {
  const { getCurrentUser } = useAuth();
  const { loading, isLogin } = useLoginUser();

  // const Private = ({ children }: { children: ReactElement }) => {
  //   console.log('private')
  //   getCurrentUser()
  //   if (!loading) {
  //     if (isLogin) {
  //       return children
  //     } else {
  //       return <Redirect to="/login" />
  //     }
  //   } else {
  //     return <></>
  //   }
  // }
  return (
    <Switch>
      <AuthProvider>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route
          path="/home"
          render={({ match: { url } }) => (
            <Switch>
              {homeRoutes.map((route) => (
                <Route
                  key={route.path}
                  exact={route.exact}
                  path={`${url}${route.path}`}
                >
                  <HeaderLayout>{route.children}</HeaderLayout>
                </Route>
              ))}
            </Switch>
          )}
        />
      </AuthProvider>
      <Route path="*">
        <Page404 />
      </Route>
    </Switch>
  );
};
