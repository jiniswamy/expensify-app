import {addExpense, removeExpense, editExpense } from '../../actions/expenses'

test('Test remove expense',() => {
    expect(removeExpense({id:'123'})).toEqual({id:'123',type:'REMOVE_EXPENSE'});
});

test('Test edit expense',() => {
    const updates = {
        description : 'Coffee',
        note: 'Daily',
        amount: 15,
        createdAt: 1000
    };
    expect(editExpense('123',updates)).toEqual({id:'123',type:'EDIT_EXPENSE',updates});
});

test('Should setup addExpense with provided values', () => {
    const expenseData = {
        description:'Rent',
        amount:200,
        note:'Monthly',
        createdAt:1000
    };
    expect(addExpense(expenseData)).toEqual({type:'ADD_EXPENSE', expense: {
        id:expect.any(String),
        ...expenseData
    }});
});

test('Should setup addExpense with default values',() => {
    const expenseData = {
        description:'',
        amount:0,
        note:'',
        createdAt:0
    };
    expect(addExpense()).toEqual({type:'ADD_EXPENSE', expense: {
        id:expect.any(String),
        ...expenseData
    }});
});

