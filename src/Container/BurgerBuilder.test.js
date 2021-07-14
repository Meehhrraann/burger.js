import React from "react";

import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import { BurgerBuilder } from "./BurgerBuilder";
import BuildsControls from "../Components/Burger/BuildControls/BuildControls";

Enzyme.configure({ adapter: new Adapter() });

describe("<BurgerBuilder/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
  });

  it("should render BuildControls when receiving ingredients", () => {
    wrapper.setProps({ ings: { salad: 0 } });
    expect(wrapper.find(BuildsControls)).toHaveLength(1);
  });
});
