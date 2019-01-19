import expensesReducer  from '../../reducers/expenses';
import expenses from '../fixtures/expense'

test('should add expense ',() => {
    const state = expensesReducer(undefined,{type:'@@INIT'})
   expect(state).toEqual([]);
});

test('should add new expense  ',() => {
    const action = {
        type:'ADD_EXPENSE',
        expense: {
            description:'New Item',
            amount:1000,
            note:'YEARLY',
            createdAt:1000
        }
    };
    const state = expensesReducer(expenses,action);
   expect(state).toEqual([...expenses,action.expense]);
});

test('should remove expense by id',() =>{
    const action= {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    }
    const state = expensesReducer(expenses,action);
    expect(state).toEqual([expenses[0],expenses[2]]);
});
test('should not remove expense by id',() =>{
    const action= {
        type: 'REMOVE_EXPENSE',
        id: 'abc'
    }
    const state = expensesReducer(expenses,action);
    expect(state).toEqual(expenses);
});

test('should edit expense by id',() =>{
    const action= {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates:{
            description:'Test'
        }
    }
    const state = expensesReducer(expenses,action);
    expect(state[1].description).toEqual('Test');
});

test('should not edit expense by id',() =>{
    const action= {
        type: 'EDIT_EXPENSE',
        id: -1,
        updates:{
            description:'Test'
        }
    }
    const state = expensesReducer(expenses,action);
    expect(state).toEqual(expenses);
});

test('should set expenses',() =>{
    const action= {
        type: 'SET_EXPENSES',
        expenses : [expenses[1]]
    }
    const state = expensesReducer(expenses,action);
    expect(state).toEqual([expenses[1]]);
});