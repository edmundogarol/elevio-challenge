import { call, all, takeLatest, put } from "redux-saga/effects";
import {
  searching,
  updateArticles,
  SEARCH_TEXT,
  SEARCH_LOG,
  ARTICLE_VIEW_LOG,
} from "../../actions/App";

export async function elevioFetch(url: string, params: any = {}) {
  const apiEndpoint = "https://api.elevio-staging.com";
  const composedURL = new URL(url, apiEndpoint);

  params.headers = {
    ...params.headers,
    "x-api-key": "4a453cfa4c2018b15ee575c8cea281d1",
  };

  params.body = JSON.stringify(params.body);

  try {
    const response = await fetch(composedURL.toString(), params).catch(
      (exc) => {
        console.error(exc);
        throw exc;
      }
    );

    if (response.ok) {
      const data = await response.json();

      return { details: response, data };
    }
  } catch (exc) {
    console.error("Elevio Fetch Error", exc);
    return { details: { ok: false } };
  }
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
    yield put(updateArticles(response.data.results));
  } else {
    console.error("Controller API error", response);
  }
}

export function* searchLogApiCall(action: {
  type: string;
  payload: { search: string };
}) {
  const response: { details: Response; data: any } = yield call(
    elevioFetch,
    `/log-search/?search=${action.payload.search}`
  );

  if (response.details.ok) {
  } else {
    console.error("Search Log API error", response);
  }
}

export function* articleViewLogApiCall(action: {
  type: string;
  payload: { article: number };
}) {
  const response: { details: Response; data: any } = yield call(
    elevioFetch,
    `/article-view-log/?article=${action.payload.article}`
  );

  if (response.details.ok) {
  } else {
    console.error("Article View Log API error", response);
  }
}

export default function* appSaga() {
  yield all([
    takeLatest(SEARCH_TEXT, searchTextApiCall),
    takeLatest(SEARCH_LOG, searchLogApiCall),
    takeLatest(ARTICLE_VIEW_LOG, articleViewLogApiCall),
  ]);
}
