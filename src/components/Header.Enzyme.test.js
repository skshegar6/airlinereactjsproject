import React from "react";
import Header from "./Header.jsx";
import { shallow } from "enzyme";
//import { MemoryRouter,Link} from 'react-router';

it("header link element checking",()=> {
  const wrapper = shallow(<Header />);
  expect(wrapper.find('Link').length).toBe(2);
  //expect(wrapper.find('Link').first().text()).toEqual('/mission');  
});

