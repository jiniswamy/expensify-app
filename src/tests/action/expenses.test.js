import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {startAddExpense, addExpense, removeExpense, editExpense } from '../../actions/expenses'
import expenses from '../fixtures/expense'
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

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
    expect(addExpense(expenses[2])).toEqual({type:'ADD_EXPENSE', expense: expenses[2]});
});
//done is required to let the test know that it has to wait for the asyncronus call 
//to complete before returning the test result
test('Should add Expense to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description:'Mouse',
        amount:3000,
        note:'This one',
        createdAt:1000
    };
    store.dispatch(startAddExpense(expenseData)).then(() =>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type:'ADD_EXPENSE',
            expense: {
                id:expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
       
    }).then((snapshot) => 
    {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
    
});

test('Should add expense with default to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description:'',
        amount:0,
        note:'',
        createdAt:0
    };
    store.dispatch(startAddExpense({})).then(() =>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type:'ADD_EXPENSE',
            expense: {
                id:expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
       
    }).then((snapshot) => 
    {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
    
});

// test('Should setup addExpense with default values',() => {
//     const expenseData = {
//         description:'',
//         amount:0,
//         note:'',
//         createdAt:0
//     };
//     expect(addExpense()).toEqual({type:'ADD_EXPENSE', expense: {
//         id:expect.any(String),
//         ...expenseData
//     }});
// });

