import { useNavigation, useRoute } from "@react-navigation/native";
import { NavigationProp, RouteProp } from "@react-navigation/core/src/types";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";

type TParamList = {
  Login: undefined;
  Signup: undefined;
};
export const useAppNavigation = useNavigation<NavigationProp<TParamList>>;

export const useAppRoute = useRoute<RouteProp<TParamList>>;

export const useAuthContext = () => useContext(AuthContext);
