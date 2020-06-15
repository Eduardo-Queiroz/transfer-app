import React from "react";
import { IconButton as RNIconButton } from "react-native-paper";
import { useCavy } from "cavy";

export const IconButton = ({ idTrack, ref, ...props }) => {
  const generateTestHook = useCavy();
  return <RNIconButton ref={generateTestHook(idTrack, ref)} {...props} />;
};
