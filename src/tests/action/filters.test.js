import moment from 'moment';
import { setTextFilter, sortByDate, sortByAmount , setStartDate, setEndDate} from '../../actions/filters';

test('should generate startDate action object',() => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type:'SET_START_DATE',
        startDate:moment(0)
    });
});

test('should generate endDate action object',() => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type:'SET_END_DATE',
        endDate:moment(0)
    });
});

test('should generate setTextFilter action with default object',() => {
    const action = setTextFilter();
    expect(action).toEqual({
        type:'SET_TEXT_FILTER',
        text: ''
    });
});

test('should generate setTextFilter action object',() => {
    const action = setTextFilter('Coffee');
    expect(action).toEqual({
        type:'SET_TEXT_FILTER',
        text: 'Coffee'
    });
});

test('should generate sortByDate action object',() => {
    const action = sortByDate();
    expect(action).toEqual({
        type:'SORT_BY_DATE'
    });
});

test('should generate sortByAmount action object',() => {
    const action = sortByAmount();
    expect(action).toEqual({
        type:'SORT_BY_AMOUNT'
    });
    
});