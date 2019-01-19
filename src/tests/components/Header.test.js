import React from 'react';
import { shallow } from 'enzyme';
//import ReactShallowRenderer from 'react-test-renderer/shallow';
//import toJSON from 'enzyme-to-json';
import { Header } from '../../components/Header';
import { start } from 'repl';


test('should render Header correctly', () => {
    const wrapper = shallow(<Header startLogout= {() => {}} />);
    expect(wrapper).toMatchSnapshot();
    // const renderer = new ReactShallowRenderer();
    // renderer.render(<Header/>);
    // expect(renderer.getRenderOutput()).toMatchSnapshot();
});

test('should call startlogout on button click',() => {
    let startLogout = jest.fn();
    const wrapper = shallow(<Header startLogout= {startLogout}/>);
    wrapper.find('button').simulate('click');
    expect(startLogout).toHaveBeenCalled();
})