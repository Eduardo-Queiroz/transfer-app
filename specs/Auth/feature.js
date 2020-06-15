import { expectRoute, containsText, expectBool } from "../util";
import { navigate } from "~/lib/util";
import { getCurrentToast } from "~/lib/util/toastLogger";
import { AsyncStorage } from "react-native";

export const addUser = async (
  { email, password } = {
    email: "e@e.com",
    password: "123@qwe",
  }
) => {
  await AsyncStorage.setItem(
    "@Auth:" + email,
    JSON.stringify({
      email,
      password,
    })
  );
};

export const login = async (
  spec,
  { login, password, loginError, passwordError, route, globalError } = {
    login: "e@e.com",
    password: "123@qwe",
    loginError: "",
    passwordError: "",
    route: "TransferHome",
    globalError: "",
  }
) => {
  navigate("Login");
  await spec.pause(500);
  if (login) await spec.fillIn("Login_Email", login);
  if (password) await spec.fillIn("Login_Password", password);
  await spec.press("Login_Signin");
  await spec.pause(1500);
  if (loginError) {
    const loginEmailError = await spec.findComponent(`Login_Email_Error`);
    containsText(loginEmailError, loginError);
  }
  if (passwordError) {
    const loginPasswordError = await spec.findComponent(`Login_Password_Error`);
    containsText(loginPasswordError, passwordError);
  }
  if (globalError) expectBool(getCurrentToast() == globalError);
  expectRoute(route);
};

export const logout = async (
  spec,
  { route } = {
    route: "Login",
  }
) => {
  await spec.pause(500);
  await spec.press("Transaction_Header_Logout");
  expectRoute(route);
};
