import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  PrimaryButton,
  Container,
  Title,
  Subheading,
  Paragraph,
} from "~/components";
import { formatDate } from "~/lib/util";
import { Actions } from "~/redux/reducers/transfer";
import { formatMoney } from "~/lib/util";
import { DescriptionRow, TitleRow } from "./styles";
import { TRANSACTION_TYPE } from "~/lib/types";
const { transferAdd } = Actions;

const TransferPreview = () => {
  const dispatch = useDispatch();
  const { formAdd, pending } = useSelector(
    ({ transfer: { formAdd, pending } }) => ({ formAdd, pending })
  );
  const type = useSelector(({ transfer: { formAdd } }) =>
    formAdd.type == TRANSACTION_TYPE.TRANSFER ? "transferindo" : "depositando"
  );
  const { value, name } = formAdd;
  return (
    <Container>
      <TitleRow>
        <Title idTrack="Transaction_Add_Preview_Type">Você está {type}</Title>
        <Subheading idTrack="Transaction_Add_Preview_Type">
          {formatMoney(value)}
        </Subheading>
      </TitleRow>
      <DescriptionRow>
        <Paragraph>Agendado para</Paragraph>
        <Paragraph idTrack="Transaction_Add_Preview_Date">
          {formatDate(new Date())}
        </Paragraph>
      </DescriptionRow>
      <DescriptionRow>
        <Paragraph>Descrição</Paragraph>
        <Paragraph idTrack="Transaction_Add_Preview_Description">
          {name}
        </Paragraph>
      </DescriptionRow>
      <PrimaryButton
        idTrack="Transaction_Add_Preview_Confirm"
        loading={pending}
        style={{ marginTop: 50 }}
        title="Confirmar"
        onPress={() => dispatch(transferAdd())}
      />
    </Container>
  );
};

export default TransferPreview;
