import axios from "axios";
import { TAuthData } from "../components/Auth/AuthContent";

const API_KEY = "AIzaSyA1zVst_OlCUQ5EYa78XZPOr9oBuVCzSV4";

export const authenticate = async (
  mode: "signUp" | "signInWithPassword",
  authData: TAuthData
): Promise<string> => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const res = await axios.post(url, {
    email: authData.email,
    password: authData.password,
    returnSecureToken: true,
  });

  return res.data.idToken as string;
};

export const createUser = (authData: TAuthData): Promise<string> => {
  return authenticate("signUp", authData);
};

export const loginUser = (authData: TAuthData): Promise<string> => {
  return authenticate("signInWithPassword", authData);
};
