import { call, all, takeLatest, put } from "redux-saga/effects";
import { searching, updateArticles, SEARCH_TEXT } from "../../actions/App";

export type ApiResponse = {
  ok: boolean;
  data: { articles: any[] };
};

export async function elevioFetch(url: string, params: any = {}) {
  const apiEndpoint = "https://api.elevio-staging.com";
  console.log({ url, params });
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
    "x-api-key": "da12774fb45e3c5d22d2bf6eb2704d96",
    Authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwcC5lbGV2aW8tc3RhZ2luZy5jb20iLCJzdWIiOiI2MTFiNDU3ODUyYWI4IiwiZXhwIjozMjA1OTg2NzM1LCJpYXQiOjE2MjkxODY3MzUsImp0aSI6IjZuNGoyM2FiMzh1ZGdvYnNlbmNkODBwczZyYWJ0dHZnIiwKICAidXNlck5hbWUiIDogImVkbXVuZG8uZ2Fyb2xAemVwYmVuLmNvbSIsCiAgInNjb3BlIiA6IFsgInJlYWQ6YXJ0aWNsZSIsICJ3cml0ZTphbGwiLCAid3JpdGU6YXJ0aWNsZSIgXSwKICAidXNlcklkIiA6IDEzMTMwLAogICJ0cmFpdHMiIDogewogICAgImdyb3VwcyIgOiBbIF0sCiAgICAicmVnaXN0ZXJlZEF0IiA6IDE2MjkxNzcxNDAwMDAsCiAgICAibGFzdE5hbWUiIDogIkdhcm9sIiwKICAgICJmaXJzdE5hbWUiIDogIkVkbXVuZG8iCiAgfQp9.lKfRzyg4nqp0GRG10gjh5r1Eb4h9yFWtxkgBOLmlqps",
  };

  finalParams.body = JSON.stringify(finalParams.body);

  const response = await fetch(composedURL.toString(), finalParams).catch(
    (exc) => {
      console.error(exc);
      throw exc;
    }
  );

  return response;
}

export function* searchTextApiCall(action: {
  type: string;
  payload: { text: string };
}) {
  yield put(searching());
  const response: ApiResponse = yield call(
    elevioFetch,
    `/v1/search/en?query=${action.payload.text}`
  );

  if (response.ok) {
    console.log({ response });
    yield put(updateArticles(response.data.articles));
  } else {
    console.error("Controller API error", response);
  }
}

export default function* appSaga() {
  yield all([takeLatest(SEARCH_TEXT, searchTextApiCall)]);
}
