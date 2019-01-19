import authReducer from '../../reducers/auth';

test('should set uid on login ',() => {
    const uid = 123;
    const action = {
        type:'LOGIN',
        uid: uid
    };
    const state = authReducer({},action);
   expect(state.uid).toBe(action.uid);
});

test('should set uid on logout ',() => {
    const action = {
        type:'LOGOUT',       
    };
    const state = authReducer({uid:'anything'},action);
   expect(state).toEqual({});
});