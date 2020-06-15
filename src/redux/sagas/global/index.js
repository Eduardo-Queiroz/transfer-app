import { fork, takeLatest } from "redux-saga/effects";
import { Toast } from "~/lib/util/toastLogger";

const filterError = ({ type }) => {
  const conditions = ["ERROR"];
  const notConditions = [];

  const isIncluded = conditions.length
    ? conditions.every((a) => type.includes(a))
    : false;
  const isNotIncluded = notConditions.length
    ? notConditions.every((a) => type.includes(a))
    : false;

  return isIncluded && !isNotIncluded;
};

function* errorHandling({ payload }) {
  try {
    Toast(payload, 2);
  } catch (e) {
    console.log(e);
  }
}

function* watchError() {
  yield takeLatest(filterError, errorHandling);
}

export default function* root() {
  yield fork(watchError);
}
