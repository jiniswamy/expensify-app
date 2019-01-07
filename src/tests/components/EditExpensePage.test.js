import React from 'react';
import { shallow} from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expense';


let history,wrapper,editExpense,removeExpense;

beforeEach(() => {
    editExpense = jest.fn();
    history = {
        push: jest.fn()
    };
    removeExpense = jest.fn();
    wrapper = shallow(<EditExpensePage editExpense={editExpense} 
        expense={expenses[0]} history={history} removeExpense={removeExpense}/>);
})
test('should test edit expense page',() => {
    expect(wrapper).toMatchSnapshot();
});

test('should test edit expense page on submit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
    expect(editExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[0]);
    expect(history.push).toHaveBeenCalledWith("/");

});

test('should test remove expense',() => {
    wrapper.find('button').simulate('click');
    expect(removeExpense).toHaveBeenLastCalledWith(expenses[0].id);
    expect(history.push).toHaveBeenCalledWith("/");
});
