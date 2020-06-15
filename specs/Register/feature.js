import { expectRoute, containsText } from "../util";
import { navigate } from "~/lib/util";
import { AsyncStorage } from "react-native";

export const goToRegister = async (
  spec,
  { route } = {
    route: "RegisterEmail",
  }
) => {
  navigate("Login");
  await spec.press("Login_Register");
  expectRoute(route);
};

export const registerEmail = async (
  spec,
  { email, emailError, route } = {
    email: "e@e.com",
    emailError: "",
    route: "RegisterPassword",
  }
) => {
  if (email) await spec.fillIn("Register_Email", email);
  if (emailError) {
    const registerEmailError = await spec.findComponent(`Register_Email_Error`);
    containsText(registerEmailError, emailError);
  }
  await spec.press("Register_Email_Next");
  await spec.pause(500);
  expectRoute(route);
};

export const registerPassword = async (
  spec,
  { password, passwordError, route } = {
    password: "teste",
    passwordError: "",
    route: "TransferHome",
  }
) => {
  if (password) await spec.fillIn("Register_Password", password);
  if (passwordError) {
    const registerPasswordError = await spec.findComponent(
      `Register_Password_Error`
    );
    containsText(registerPasswordError, passwordError);
  }
  await spec.press("Register_Password_Next");
  await spec.pause(1500);
  expectRoute(route);
};
