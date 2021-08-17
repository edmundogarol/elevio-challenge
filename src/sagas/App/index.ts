import { call, all, takeLatest, put } from "redux-saga/effects";
import { searching, updateArticles, SEARCH_TEXT } from "../../actions/App";

export type ApiResponse = {
  ok: boolean;
  data: { articles: any[] };
};

export async function elevioFetch(url: string, params: any = {}) {
  const apiEndpoint = "api.elevio-staging.com";
  const composedURL = new URL(url, apiEndpoint);

  const {
    contentType = "application/json",
    params: queryParams,
    ...inputParams
  } = params;

  const finalParams = {
    credentials: "same-origin",
    ...inputParams,
  };

  finalParams.headers = {
    ...finalParams.headers,
    "Content-Type": contentType,
    mode: "no cors",
    "Retry-After": 3600,
  };

  finalParams.body = JSON.stringify(finalParams.body);

  const response = await fetch(composedURL.toString(), finalParams).catch(
    (exc) => {
      throw exc;
    }
  );

  return response;
}

export function* searchTextApiCall() {
  yield put(searching());
  const response: ApiResponse = yield call(elevioFetch, "");

  if (response.ok) {
    yield put(updateArticles(response.data.articles));
  } else {
    console.error("Controller API error", response);
  }
}

export default function* appSaga() {
  yield all([takeLatest(SEARCH_TEXT, searchTextApiCall)]);
}
