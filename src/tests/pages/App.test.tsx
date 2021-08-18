import * as React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallowToJson } from "enzyme-to-json";
import { shallow, configure } from "enzyme";

import Ui from "../../pages/App/ui";
import { DispatchProps, StateProps } from "../../pages/App/types";

configure({ adapter: new Adapter() });

describe("Testing App UI", () => {
  const props: StateProps & DispatchProps = {
    searching: false,
    articles: [],
    searchTextCall: () => {},
    searchLog: () => {},
    articleViewLog: () => {},
  };

  let ui = <Ui {...props} />;
  let wrapper = shallow(ui);

  it("check if component renders", () => {
    expect(wrapper.length).toEqual(1);
  });

  it("check rendered ui to match snapshot", () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
