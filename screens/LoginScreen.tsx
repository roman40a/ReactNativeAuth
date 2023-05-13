import AuthContent, { TAuthData } from "../components/Auth/AuthContent";
import { Keyboard } from "../components/Auth/Keyboard";
import { useState } from "react";
import { loginUser } from "../utils/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { useAuthContext } from "../utils/hooks";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const { authenticate } = useAuthContext();

  const loginHandler = async (authData: TAuthData) => {
    try {
      setIsAuthenticating(true);
      const token = await loginUser(authData);
      authenticate(token);
    } catch (e) {
      Alert.alert(
        "Authentication failed!",
        "Could not create user, please check your input try again later!"
      );
    } finally {
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return (
    <Keyboard>
      <AuthContent isLogin onAuthenticate={loginHandler} />
    </Keyboard>
  );
}

export default LoginScreen;
