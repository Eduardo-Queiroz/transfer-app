import { textGenerator } from "../util";
import {
  goToDeposit,
  goToTransfer,
  transferName,
  transferMoney,
  transferPreview,
  transferList,
  transferToggleVisible,
} from "./feature";
import { login, addUser } from "../Auth/feature";

export default function(spec) {
  spec.describe("Menu Flux", () => {
    spec.it("it should create a transfer with success", async () => {
      await addUser();
      await login(spec);
      await goToTransfer(spec);
      await transferName(spec);
      await transferMoney(spec);
      await transferPreview(spec);
    });

    // spec.it("it should create a deposit with success", async () => {
    //   await addUser();
    //   await login(spec);
    //   await goToDeposit(spec);
    //   await transferName(spec, { nameLabel: "Qual a descrição do deposito?" });
    //   await transferMoney(spec, { moneyLabel: "Qual o valor deposito?" });
    //   await transferPreview(spec, { typeLabel: "Você está depositando" });
    // });

    // spec.it(
    //   "it should create a transfer with success and check in list",
    //   async () => {
    //     const nameTransfer = textGenerator();
    //     await addUser();
    //     await login(spec);
    //     await goToTransfer(spec);
    //     await transferName(spec, { nameInput: nameTransfer });
    //     await transferMoney(spec, { moneyInput: 2002 });
    //     await transferPreview(spec);
    //     await transferList(spec, { nameItem: nameTransfer, valueItem: -20.02 });
    //   }
    // );

    // spec.it(
    //   "it should create a deposit with success and check in list",
    //   async () => {
    //     const nameTransfer = textGenerator();
    //     await addUser();
    //     await login(spec);
    //     await goToDeposit(spec);
    //     await transferName(spec, {
    //       nameLabel: "Qual a descrição do deposito?",
    //       nameInput: nameTransfer,
    //     });
    //     await transferMoney(spec, {
    //       moneyLabel: "Qual o valor deposito?",
    //       moneyInput: 2002,
    //     });
    //     await transferPreview(spec, {
    //       typeLabel: "Você está depositando",
    //       valueItem: 20.02,
    //     });
    //   }
    // );

    // spec.it("it should toggle the balance with success", async () => {
    //   await addUser();
    //   await login(spec);
    //   await transferToggleVisible(spec);
    // });

    // spec.it(
    //   "it should failed in create a transfer because dont have description",
    //   async () => {
    //     await addUser();
    //     await login(spec);
    //     await goToTransfer(spec);
    //     await transferName(spec, {
    //       nameInput: "",
    //       nameError: "A descrição é obrigatória",
    //     });
    //   }
    // );

    // spec.it(
    //   "it should failed in create a transfer because dont have value",
    //   async () => {
    //     await addUser();
    //     await login(spec);
    //     await goToTransfer(spec);
    //     await transferName(spec);
    //     await transferMoney(spec, {
    //       moneyInput: "",
    //       nameError: "Valor é obrigatorio",
    //     });
    //   }
    // );

    // spec.it(
    //   "it should failed in create a transfer because value is lower than 2",
    //   async () => {
    //     await addUser();
    //     await login(spec);
    //     await goToTransfer(spec);
    //     await transferName(spec);
    //     await transferMoney(spec, {
    //       moneyInput: "10",
    //       nameError: "Você deve digitar um valor maior que R$2,00",
    //     });
    //   }
    // );
  });
}
