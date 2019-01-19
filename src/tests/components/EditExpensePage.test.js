import React from 'react';
import { shallow} from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expense';


let history,wrapper,startRemoveExpense, startEditExpense;

beforeEach(() => {
    startEditExpense = jest.fn();
    history = {
        push: jest.fn()
    };
    startRemoveExpense = jest.fn();
    wrapper = shallow(<EditExpensePage startEditExpense={startEditExpense} 
        expense={expenses[0]} history={history} startRemoveExpense={startRemoveExpense}/>);
})
test('should test edit expense page',() => {
    expect(wrapper).toMatchSnapshot();
});

test('should test edit expense page on submit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
    expect(startEditExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[0]);
    expect(history.push).toHaveBeenCalledWith("/");

});

test('should test remove expense',() => {
    wrapper.find('button').simulate('click');
    expect(startRemoveExpense).toHaveBeenLastCalledWith(expenses[0].id);
    expect(history.push).toHaveBeenCalledWith("/");
});


