import SagaTester from "redux-saga-tester";

import { searchTextApiCall } from "../../sagas/App";
import { searching, searchText, updateArticles } from "../../actions/App";

describe("App sagas", () => {
  let sagaTester: any = null;

  jest.setTimeout(10000);

  it("searches elevio-staging published articles", async () => {
    sagaTester = new SagaTester();

    await sagaTester.run(searchTextApiCall, searchText("gday"));

    expect(sagaTester.getCalledActions()).toEqual([
      searching(),
      updateArticles([
        {
          id: "3",
          title: "<em>Gday</em> Punch Manga Meets On Hiatus",
        },
      ]),
    ]);
  });
});
