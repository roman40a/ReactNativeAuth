import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { Colors } from "./constants/styles";
import { AuthContextProvider } from "./store/auth-context";
import { useAuthContext } from "./utils/hooks";
import { IconButton } from "./components/ui/IconButton";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const { logout } = useAuthContext();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              name="exit"
              size={24}
              color={tintColor}
              onPress={logout}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const { isAuthenticated } = useAuthContext();

  return (
    <NavigationContainer>
      {isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [loading, setLoading] = useState(true);

  const { authenticate } = useAuthContext();
  useEffect(() => {
    async function fetchToken() {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token !== null) {
          authenticate(token);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchToken();
  }, []);

  if (loading) {
    return <AppLoading />;
  }

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
