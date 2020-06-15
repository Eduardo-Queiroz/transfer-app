import { createActions, createReducer } from "reduxsauce";

const INITIAL_STATE = {
  isVisibleError: false,
  messageError: "",
  hasConnectivity: true,
};

export const { Types, Creators: Actions } = createActions({
  globalChangeConnectivity: (payload) => ({
    type: "GLOBAL_CHANGE_CONNECTIVITY",
    payload,
  }),
});

export const HANDLERS = {
  [Types.GLOBAL_CHANGE_CONNECTIVITY]: (state, { payload }) => ({
    ...state,
    hasConnectivity: payload,
  }),
};

export const Reducer = createReducer(INITIAL_STATE, HANDLERS);
