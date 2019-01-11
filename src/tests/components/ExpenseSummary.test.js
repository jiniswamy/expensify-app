import React from 'react'
import { shallow } from 'enzyme';
import { ExpenseSummary } from '../../components/ExpenseSummary'
import expenses from '../fixtures/expense';
import getExpensesTotal from '../../selectors/expenses-total';

test('should render ExpenseSummary with more expenses', () => {   
    const total = getExpensesTotal(expenses);   
    const wrapper = shallow(<ExpenseSummary expenses={expenses} expenseTotal={total} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseSummary with only one expenses',() => {
    const total = getExpensesTotal(expenses[0]); 
    const wrapper = shallow(<ExpenseSummary expenses={[expenses[0]]} expenseTotal={total} />);
    expect(wrapper).toMatchSnapshot();
})