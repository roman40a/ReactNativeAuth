import AuthContent, { TAuthData } from "../components/Auth/AuthContent";
import { Keyboard } from "../components/Auth/Keyboard";
import { createUser } from "../utils/auth";
import { useState } from "react";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { useAuthContext } from "../utils/hooks";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const { authenticate } = useAuthContext();

  const signupHandler = async (authData: TAuthData) => {
    try {
      setIsAuthenticating(true);
      const token = await createUser(authData);
      authenticate(token);
    } catch (e) {
      Alert.alert(
        "Authentication failed!",
        "Please check your credentials or try again later!"
      );
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
