import AuthContent, { TAuthData } from "../components/Auth/AuthContent";
import { Keyboard } from "../components/Auth/Keyboard";
import { useState } from "react";
import { loginUser } from "../utils/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const loginHandler = async (authData: TAuthData) => {
    try {
      setIsAuthenticating(true);
      const res = await loginUser(authData);
      console.log("loginHandler", res);
    } catch (e) {
      console.log(e);
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
