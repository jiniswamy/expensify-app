import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';
export const ExpenseSummary =  (props) => {
    if(props.expenses && props.expenses.length > 0){
        return <div>Viewing {props.expenses.length} expenses totaling {numeral(props.expenseTotal/100).format('$0,0.00')}</div> }
    else
        return <div></div>
};
const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters),
        expenseTotal: getExpensesTotal(state.expenses)
    };
};


export default connect(mapStateToProps)(ExpenseSummary);