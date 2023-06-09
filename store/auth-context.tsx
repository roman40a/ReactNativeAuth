import { createContext, FC, ReactElement, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type TAuthData =
  | { token?: undefined; isAuthenticated: false }
  | { token: string; isAuthenticated: true };

type TAuthContext = {
  authenticate: (token: string) => void;
  logout: () => void;
} & TAuthData;

export const AuthContext = createContext<TAuthContext>({
  token: undefined,
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
});

type TAuthContextProviderProps = { children: ReactElement | ReactElement[] };
export const AuthContextProvider: FC<TAuthContextProviderProps> = ({
  children,
}) => {
  const [authToken, setAuthToken] = useState<string | undefined>(undefined);

  const authData: TAuthData =
    typeof authToken === "undefined"
      ? {
          isAuthenticated: false,
        }
      : {
          token: authToken,
          isAuthenticated: true,
        };

  const authenticate = async (token: string): Promise<void> => {
    setAuthToken(token);
    try {
      await AsyncStorage.setItem("token", token);
    } catch (e) {
      console.error(e);
    }
  };
  const logout = async (): Promise<void> => {
    setAuthToken(undefined);
    try {
      await AsyncStorage.removeItem("token");
    } catch (e) {
      console.error(e);
    }
  };

  const value: TAuthContext = {
    ...authData,
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
