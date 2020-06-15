import React from "react";
import { withNavigation } from "react-navigation";
import { useDispatch, useSelector } from "react-redux";
import { TRANSACTION_TYPE } from "~/lib/types";

import * as yup from "yup";
import { Formik } from "formik";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Container, Link, Row, Input, Title } from "~/components";

import { Actions } from "~/redux/reducers/transfer";
const { transferSetFieldForm } = Actions;

const TransferAddName = ({ navigation }) => {
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
          initialValues={{ name: "" }}
          onSubmit={({ name }) => {
            navigation.navigate("TransferAddMoney");
            dispatch(transferSetFieldForm({ name }));
          }}
          validationSchema={yup.object().shape({
            name: yup.string().required("A descrição é obrigatória"),
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
              <Title idTrack="Transaction_Add_Name_Label">
                Qual a descrição {type}?
              </Title>
              <Row />
              <Input
                idTrack="Transaction_Add_Name"
                placeholder="Digite o titulo"
                autoCapitalize="words"
                onChangeText={(value) => {
                  setFieldValue("name", value);
                }}
                onBlur={() => setFieldTouched("name")}
                isErrorVisible={touched.name && errors.name}
                error={errors.name}
                returnKeyType={"next"}
                onSubmitEditing={handleSubmit}
              />
              <Link
                idTrack="Transaction_Add_Name_Next"
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

export default withNavigation(TransferAddName);
