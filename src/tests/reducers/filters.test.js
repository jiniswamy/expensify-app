import moment from 'moment';
import filtersReducer from '../../reducers/filters';


test('should test filter reducer',() => {
    const defaultFilters = {
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
      };
      const action = {type: '@@INIT'};
      const result = filtersReducer(undefined,action);
      expect(result).toEqual(defaultFilters);

});

test('should test sort by amount',() => {
  
      const state = filtersReducer(undefined,{type:'SORT_BY_AMOUNT'});
      expect(state.sortBy).toBe('amount');

});

test('should test sort by date',() => {
    const currentState = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
      };
    const state = filtersReducer(currentState,{type:'SORT_BY_DATE'});
    expect(state.sortBy).toBe('date');

});

test('should set text filter',() => {
    const state = filtersReducer(undefined,{type:'SET_TEXT_FILTER', text:'Test'});
    expect(state.text).toBe('Test');

});

test('should set start date',() => {
    const state = filtersReducer(undefined,{type:'SET_START_DATE', startDate:moment(0)});
    expect(state.startDate).toEqual(moment(0));

});

test('should set end date',() => {
    const state = filtersReducer(undefined,{type:'SET_END_DATE', endDate:moment(1)});
    expect(state.endDate).toEqual(moment(1));

});

