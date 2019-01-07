import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters }  from '../fixtures/filters';

let setTextFilter, setStartDate, setEndDate, sortByDate, sortByAmount, wrapper;

beforeEach( () => {
    setTextFilter = jest.fn();
    setStartDate  = jest.fn();
    setEndDate = jest.fn();
    sortByDate  = jest.fn();
    sortByAmount  = jest.fn();
    wrapper = shallow(<ExpenseListFilters 
        filters={filters}
        setTextFilter={setTextFilter}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        sortByDate={sortByDate}
        sortByAmount={sortByAmount}
    />);
    });

    test('should render expense list filters correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('should render expense list filters with altFilters correctly', () => {
        wrapper.setProps({
            filters: altFilters
        });
        expect(wrapper).toMatchSnapshot();
    });

    test('should handle text change', () => {
        const value = 'bills';
        wrapper.find('input').simulate('change',{
            target: { value }
        });
       expect(setTextFilter).toHaveBeenLastCalledWith(value);

    })
    test('should sort by date', () => {
        const value = 'date';
        wrapper.find('select').simulate('change',{
            target: { value }
        });
       expect(sortByDate).toHaveBeenCalled();
    })
    test('should sort by amount', () => {
        const value = 'amount';
        wrapper.find('select').simulate('change',{
            target: { value }
        });
       expect(sortByAmount).toHaveBeenCalled();
    })
    test('should handle date changes', () => {
        const startDate = moment();
        const endDate = moment().add(3,'days');
        wrapper.find('DateRangePicker').prop('onDatesChange')({
            startDate,
            endDate
        });
        expect(setStartDate).toHaveBeenLastCalledWith(startDate);
        expect(setEndDate).toHaveBeenLastCalledWith(endDate);
    })
    test('should handle date changefocus', () => {
        wrapper.find('DateRangePicker').prop('onFocusChange')('endDate');
        expect(wrapper.state('calendarFocused')).toEqual('endDate');
    })


