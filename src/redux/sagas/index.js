import { fork, put, take, select, call, takeLatest } from "redux-saga/effects";

import transfer from "./transfer";
import auth from "./auth";
import global from "./global";

export default function* root() {
  try {
    yield fork(global);
    yield fork(auth);
    yield fork(transfer);
  } catch (e) {
    console.error(e);
  }
}
