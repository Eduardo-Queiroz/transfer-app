export const request = (state) => ({
  ...state,
});

export const requestPending = (state) => ({
  ...state,
  pending: state.pending + 1,
});

export const requestSuccess = (state, { payload }) => ({
  ...state,
  ...payload,
  pending: state.pending - 1,
});

export const requestError = (state, { payload }) => ({
  ...state,
  pending: state.pending - 1,
  errorMessage: payload,
});
