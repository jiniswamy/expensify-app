import getExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expense'

test('should correctly add one expenses', () => {
    const total = getExpensesTotal(expenses[0]);
    expect(total).toBe(195);
})


test('should correctly add up multiple expses', () => {
    const total = getExpensesTotal(expenses);
    expect(total).toBe(114195);
})


test('should  total when no expenses', () => {
    const total = getExpensesTotal();
    expect(total).toBe(0);
})


test('should  total when empty expenses', () => {
    const total = getExpensesTotal([]);
    expect(total).toBe(0);
})