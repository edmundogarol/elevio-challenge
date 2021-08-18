import { call, all, takeLatest, put } from "redux-saga/effects";
import { searching, updateArticles, SEARCH_TEXT } from "../../actions/App";

export async function elevioFetch(url: string, params: any = {}) {
  const apiEndpoint = "https://api.elevio-staging.com";
  console.log({ url, params });
  const composedURL = new URL(url, apiEndpoint);

  params.headers = {
    ...params.headers,
    "x-api-key": "4a453cfa4c2018b15ee575c8cea281d1",
  };

  params.body = JSON.stringify(params.body);

  const response = await fetch(composedURL.toString(), params).catch((exc) => {
    console.error(exc);
    throw exc;
  });

  const data = await response.json();

  return { details: response, data };
}

export function* searchTextApiCall(action: {
  type: string;
  payload: { text: string };
}) {
  yield put(searching());
  const response: { details: Response; data: any } = yield call(
    elevioFetch,
    `/v1/search/en?query=${action.payload.text}`
  );

  if (response.details.ok) {
    console.log({ response, data: response.data });
    yield put(updateArticles(response.data.results));
  } else {
    console.error("Controller API error", response);
  }
}

export default function* appSaga() {
  yield all([takeLatest(SEARCH_TEXT, searchTextApiCall)]);
}
