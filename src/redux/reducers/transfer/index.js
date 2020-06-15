import { createActions, createReducer } from "reduxsauce";
import { request, requestPending, requestSuccess, requestError } from "../util";

const INITIAL_STATE = {
  balance: null,
  list: null,
  isBalanceVisible: true,
  formAdd: {},
  pending: 0,
};

const balance = {
  transferBalance: () => ({
    type: "TRANSFER_BALANCE",
  }),
  transferBalanceSuccess: (payload) => ({
    type: "TRANSFER_BALANCE_SUCCESS",
    payload,
  }),
  transferBalanceError: (payload) => ({
    type: "TRANSFER_BALANCE_ERROR",
    payload,
  }),
  transferBalancePending: () => ({
    type: "TRANSFER_BALANCE_PENDING",
  }),
};

const list = {
  transferList: () => ({
    type: "TRANSFER_LIST",
  }),
  transferListSuccess: (payload) => ({
    type: "TRANSFER_LIST_SUCCESS",
    payload,
  }),
  transferListError: (payload) => ({
    type: "TRANSFER_LIST_ERROR",
    payload,
  }),
  transferListPending: () => ({
    type: "TRANSFER_LIST_PENDING",
  }),
};

const add = {
  transferAdd: () => ({
    type: "TRANSFER_ADD",
  }),
  transferAddSuccess: () => ({
    type: "TRANSFER_ADD_SUCCESS",
  }),
  transferAddError: (payload) => ({
    type: "TRANSFER_ADD_ERROR",
    payload,
  }),
  transferAddPending: () => ({
    type: "TRANSFER_ADD_PENDING",
  }),
};

const toggleVisibleBalance = {
  transferToggleVisibleBalance: () => ({
    type: "TRANSFER_TOGGLE_VISIBLE_BALANCE",
  }),
};

const transferSetFieldForm = {
  transferSetFieldForm: (payload) => ({
    type: "TRANSFER_SET_FIELD_FORM",
    payload,
  }),
};

export const { Types, Creators: Actions } = createActions({
  ...balance,
  ...list,
  ...add,
  ...toggleVisibleBalance,
  ...transferSetFieldForm,
});

//reducer functions
const toggleIsBalanceVisible = (state) => ({
  ...state,
  isBalanceVisible: !state.isBalanceVisible,
});

const clearForm = (state) => ({
  ...state,
  pending: 0,
  formAdd: {},
});

const setFieldForm = (state, { payload }) => ({
  ...state,
  formAdd: {
    ...state.formAdd,
    ...payload,
  },
});

export const HANDLERS = {
  [Types.TRANSFER_TOGGLE_VISIBLE_BALANCE]: toggleIsBalanceVisible,
  [Types.TRANSFER_SET_FIELD_FORM]: setFieldForm,

  [Types.TRANSFER_BALANCE]: request,
  [Types.TRANSFER_BALANCE_PENDING]: requestPending,
  [Types.TRANSFER_BALANCE_ERROR]: requestError,
  [Types.TRANSFER_BALANCE_SUCCESS]: requestSuccess,

  [Types.TRANSFER_LIST]: request,
  [Types.TRANSFER_LIST_PENDING]: requestPending,
  [Types.TRANSFER_LIST_ERROR]: requestError,
  [Types.TRANSFER_LIST_SUCCESS]: requestSuccess,

  [Types.TRANSFER_ADD]: request,
  [Types.TRANSFER_ADD_PENDING]: requestPending,
  [Types.TRANSFER_ADD_ERROR]: requestError,
  [Types.TRANSFER_ADD_SUCCESS]: clearForm,
};

export const Reducer = createReducer(INITIAL_STATE, HANDLERS);
