import React from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { withNavigation } from "react-navigation";
import { TRANSACTION_TYPE } from "~/lib/types";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Container, InputMask, Link, Row, Title } from "~/components";

import { Actions } from "~/redux/reducers/transfer";
const { transferSetFieldForm } = Actions;

const TransferAddMoney = ({ navigation }) => {
  const dispatch = useDispatch();
  const type = useSelector(({ transfer: { formAdd } }) =>
    formAdd.type == TRANSACTION_TYPE.TRANSFER
      ? "da transferencia"
      : "do deposito"
  );
  return (
    <Container>
      <KeyboardAwareScrollView>
        <Formik
          initialValues={{ value: "" }}
          onSubmit={({ value }) => {
            const newValue = parseFloat(
              value
                .replace("R$", "")
                .replace(/\./g, "")
                .replace(",", ".")
            );
            navigation.navigate("TransferAddPreview");
            dispatch(transferSetFieldForm({ value: newValue }));
          }}
          validationSchema={yup.object().shape({
            value: yup
              .string()
              .required("Valor é obrigatorio")
              .test(
                "len",
                "Você deve digitar um valor maior que R$2,00",
                (val) => parseInt(val?.replace("R$", "")) > 1
              ),
          })}
        >
          {({
            values,
            errors,
            setFieldValue,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit,
          }) => (
            <>
              <Title idTrack="Transaction_Add_Money_Label">
                Qual o valor {type}?
              </Title>
              <Row />
              <InputMask
                idTrack="Transaction_Add_Money"
                type={"money"}
                value={values.value}
                options={{
                  precision: 2,
                  separator: ",",
                  delimiter: ".",
                  unit: "R$",
                  suffixUnit: "",
                }}
                onBlur={() => setFieldTouched("value")}
                onChangeText={(value) => setFieldValue("value", value)}
                placeholder="Digite o valor"
                isErrorVisible={touched.value && errors.value}
                error={errors.value}
                returnKeyType={"next"}
                onSubmitEditing={handleSubmit}
              />
              <Link
                idTrack="Transaction_Add_Money_Next"
                primary={isValid}
                title={"PRÓXIMO"}
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default withNavigation(TransferAddMoney);
