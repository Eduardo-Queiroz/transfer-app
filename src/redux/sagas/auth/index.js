import { call, fork, put, takeLatest, select } from "redux-saga/effects";
import { AsyncStorage } from "react-native";
import { Actions, Types } from "~/redux/reducers/auth";
import Service from "~/lib/api/services/auth";
import { navigate } from "~/lib/util";

const {
  authLoginPending,
  authLoginSuccess,
  authLoginError,

  authRegisterPending,
  authRegisterSuccess,
  authRegisterError,
} = Actions;

function* authLoginRequest({ payload }) {
  try {
    yield put(authLoginPending());
    const data = yield call(Service.login, payload);
    yield call(AsyncStorage.setItem, "@User", JSON.stringify(data));
    yield put(authLoginSuccess());
    yield call(navigate, "TransferHome");
  } catch (e) {
    console.log(e);
    yield put(authLoginError(e.message));
  }
}

function* authRegisterRequest({ payload }) {
  try {
    const form = yield select(({ auth }) => auth.formRegister);
    const user = { ...form, ...payload };
    yield put(authRegisterPending());
    yield call(Service.register, user);
    yield call(AsyncStorage.setItem, "@User", JSON.stringify(user));
    yield put(authRegisterSuccess());
    yield call(navigate, "TransferHome");
  } catch (e) {
    console.log(e);
    yield put(authRegisterError(e.message));
  }
}

function* watchLogin() {
  yield takeLatest(Types.AUTH_LOGIN, authLoginRequest);
}

function* watchRegister() {
  yield takeLatest(Types.AUTH_REGISTER, authRegisterRequest);
}

export default function* root() {
  yield fork(watchLogin);
  yield fork(watchRegister);
}
