import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import Cookies from "js-cookie";

import { User } from "types/api/user";
import client from "lib/api/client";
import { useAuth } from "hooks/useAuth";

type AuthContextType = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: User | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = (props: { children: ReactNode }) => {
  console.log("初期化");
  // console.log(`isLogin: ${isLogin}`)
  const { children } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  // console.log(`isLogin: ${isLogin}`);

  // const { getCurrentUser } = useAuth()
  const handleGetCurrentUser = () => {
    if (
      !Cookies.get("_access_token") ||
      !Cookies.get("_client") ||
      !Cookies.get("_uid")
    )
      return;

    client
      .get("auth/sessions", {
        headers: {
          "access-token": Cookies.get("_access_token")!,
          client: Cookies.get("_client")!,
          uid: Cookies.get("_uid")!,
        },
      })
      .then((res) => {
        if (res.data.isLogin === true) {
          setIsLogin(true);
          setCurrentUser(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  // useEffect(() => {
  //   handleGetCurrentUser()
  // }, [setCurrentUser, setIsLogin])

  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        isLogin,
        setIsLogin,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useLoginUser = (): AuthContextType => useContext(AuthContext);
