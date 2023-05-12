import AuthContent, { TAuthData } from "../components/Auth/AuthContent";
import { Keyboard } from "../components/Auth/Keyboard";
import { createUser } from "../utils/auth";
import { useState } from "react";
import LoadingOverlay from "../components/ui/LoadingOverlay";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const signupHandler = async (authData: TAuthData) => {
    try {
      setIsAuthenticating(true);
      const res = await createUser(authData);
      console.log("signupHandler", res);
    } catch (e) {
      console.log(e);
    } finally {
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging user..." />;
  }

  return (
    <Keyboard>
      <AuthContent isLogin={false} onAuthenticate={signupHandler} />
    </Keyboard>
  );
}

export default SignupScreen;
