import { call, fork, put, takeLatest, select } from "redux-saga/effects";
import { TRANSACTION_TYPE } from "~/lib/types";
import { Actions, Types } from "~/redux/reducers/transfer";
import Service from "~/lib/api/services/transfer";
import { navigate } from "~/lib/util";

const {
  transferBalance,
  transferBalancePending,
  transferBalanceSuccess,
  transferBalanceError,

  transferList,
  transferListPending,
  transferListSuccess,
  transferListError,

  transferAddPending,
  transferAddSuccess,
  transferAddError,
} = Actions;

const convertSignal = (form) => {
  const newValue =
    form.type == TRANSACTION_TYPE.TRANSFER ? form.value * -1 : form.value;
  return { ...form, value: newValue };
};

function* transferBalanceRequest() {
  try {
    yield put(transferBalancePending());
    const balance = yield call(Service.balance);
    yield put(transferBalanceSuccess({ balance }));
  } catch ({ message }) {
    yield put(transferBalanceError(message));
  }
}

function* transferListRequest() {
  try {
    yield put(transferListPending());
    const list = yield call(Service.list);
    yield put(transferListSuccess({ list }));
  } catch ({ message }) {
    yield put(transferListError(message));
  }
}

function* transferAddRequest() {
  try {
    const form = yield select(({ transfer }) => transfer.formAdd);
    const formatedType = convertSignal(form);
    yield put(transferAddPending());
    yield call(Service.add, formatedType);
    yield put(transferAddSuccess());
    yield put(transferBalance());
    yield put(transferList());
    yield call(navigate, "TransferHome");
  } catch ({ message }) {
    yield put(transferAddError(message));
  }
}

function* watchBalance() {
  yield takeLatest(Types.TRANSFER_BALANCE, transferBalanceRequest);
}

function* watchList() {
  yield takeLatest(Types.TRANSFER_LIST, transferListRequest);
}

function* watchAdd() {
  yield takeLatest(Types.TRANSFER_ADD, transferAddRequest);
}

export default function* root() {
  yield fork(watchBalance);
  yield fork(watchList);
  yield fork(watchAdd);
}
