export default (expenses) => {
    const expensesArray = [].concat(expenses || []);
    const expenseAmounts = expensesArray.map((expense) => expense.amount);
    const reducer = (a,c) => a+c;
    return expenseAmounts.reduce(reducer,0);
}