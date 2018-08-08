import React from 'react';
import ReactDOM from 'react-dom';

import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow, mount, render } from 'enzyme';

import {HologramButton} from 'components/hologramButton';

configure({ adapter: new Adapter() });

let hologram = {
	firstName: 'test',
	lastName: 'ing'
}

function handleOnClick(){

}

describe('<HologramButton />', () => {
  it('should contain 1 button', () => {
    const wrapper = shallow(<HologramButton hologram={HologramButton} />);
    expect(wrapper.find('button').length).toBe(1);
  });
  
  it('simulates click events', () => {
    const wrapper = shallow(<HologramButton hologram={HologramButton} handleOnClick={handleOnClick} />);
    wrapper.find('button').simulate('click', { preventDefault() {} });
  });
  

});