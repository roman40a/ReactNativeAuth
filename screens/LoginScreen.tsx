import AuthContent from "../components/Auth/AuthContent";
import { Keyboard } from "../components/Auth/Keyboard";

function LoginScreen() {
  return (
    <Keyboard>
      <AuthContent isLogin />
    </Keyboard>
  );
}

export default LoginScreen;
