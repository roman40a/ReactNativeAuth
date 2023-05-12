import axios from "axios";
import { TAuthData } from "../components/Auth/AuthContent";

const API_KEY = "AIzaSyA1zVst_OlCUQ5EYa78XZPOr9oBuVCzSV4";

export const authenticate = async (
  mode: "signUp" | "signInWithPassword",
  authData: TAuthData
) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  return await axios.post(url, {
    email: authData.email,
    password: authData.password,
    returnSecureToken: true,
  });
};

export const createUser = async (authData: TAuthData) => {
  return await authenticate("signUp", authData);
};

export const loginUser = async (authData: TAuthData) => {
  return await authenticate("signInWithPassword", authData);
};
