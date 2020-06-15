import styled from "styled-components/native";
// import { colors } from "~/styles";

const TitleRow = styled.View`
  align-items: center;
  padding-top: 10px;
  margin: 24px 0px;
  /* background-color: ${colors.primary}; */
`;

const DescriptionRow = styled.View`
  margin-bottom: 12px;
  flex-direction: row;
  justify-content: space-between;
`;

export { DescriptionRow, TitleRow };
