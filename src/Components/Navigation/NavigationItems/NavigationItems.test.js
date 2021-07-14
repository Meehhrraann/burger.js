import React from "react";

import Enzyme, { shallow } from "enzyme";

import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

// const Adapter = require("@wojtekmaj/enzyme-adapter-react-17");

Enzyme.configure({ adapter: new Adapter() });

describe("<NavigationItems/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it("not auth --> 2 <NavigationItem/>", () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it("auth --> 3 <NavigationItem/>", () => {
    //wrapper = shallow(<NavigationItems isAuthenticated />);
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it("contain logout button", () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(
      wrapper.contains(
        <NavigationItem link="/logout" exact>
          Logout
        </NavigationItem>
      )
    ).toEqual(true);
  });
});
