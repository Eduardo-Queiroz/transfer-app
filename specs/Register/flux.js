import { goToRegister, registerEmail, registerPassword } from "./feature";

export default function(spec) {
  spec.describe("Register Flux", () => {
    spec.it("it should register with success", async () => {
      await goToRegister(spec);
      await registerEmail(spec);
      await registerPassword(spec);
    });
    spec.it(
      "it should failed register because is a invalid email",
      async () => {
        await goToRegister(spec);
        await registerEmail(spec, {
          email: "teste",
          emailError: "Digite um e-mail válido",
          route: "RegisterEmail",
        });
      }
    );
    spec.it("it should failed register because dont have email", async () => {
      await goToRegister(spec);
      await registerEmail(spec, {
        emailError: "Você precisa digitar seu e-mail para logar",
        route: "RegisterEmail",
      });
    });
    spec.it(
      "it should failed register because dont have password",
      async () => {
        await goToRegister(spec);
        await registerEmail(spec);
        await registerPassword(spec, {
          passwordError: "Senha é obrigatoria",
          route: "RegisterPassword",
        });
      }
    );
  });
}
