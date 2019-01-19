import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {startSetExpenses, startAddExpense, startRemoveExpense, startEditExpense, addExpense, removeExpense, editExpense, setExpenses } from '../../actions/expenses'
import expenses from '../fixtures/expense'
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expenseData = {};
    expenses.forEach( ({id,description,amount,note,createdAt}) => {
        expenseData[id] = {description,amount,note,createdAt};
    })
    database.ref('expenses').set(expenseData).then(() => done());
});

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

test('Should setup setExpensesaction object with data',() => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type:'SET_EXPENSES',
        expenses
    })
});

test('Should load Expenses to store', (done) => {
    const store = createMockStore({});
    store.dispatch(startSetExpenses()).then( () => {
        const actions = store.getActions();
       expect(actions[0]).toEqual({
           type: 'SET_EXPENSES',
           expenses});
        done();
    });
    
});


test('Should remove expense from firebase', (done) => {
    const store = createMockStore({});
    const idToRemove = expenses[0].id;
    store.dispatch(startRemoveExpense({id: idToRemove})).then(() =>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type:'REMOVE_EXPENSE',
            id: idToRemove
        });

        return database.ref(`expenses/${idToRemove}`).once('value');
       
    }).then((snapshot) => 
    {
        expect(snapshot.val()).toEqual(null);
        done();
    });
    
});

test('Should edit expense from firebase', (done) => {
    const store = createMockStore({});
    const idToEdit = expenses[0].id;
    const updates = {
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    }
    store.dispatch(startEditExpense(idToEdit, updates)).then(() =>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type:'EDIT_EXPENSE',
            id: idToEdit,
            updates
        });

        return database.ref(`expenses/${idToEdit}`).once('value');
       
    }).then((snapshot) => 
    {
        expect(snapshot.val()).toEqual(updates);
        done();
    });
    
});