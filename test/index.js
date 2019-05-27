import moment from 'moment';
import {assert} from 'chai';
import {era} from './../src';

const {describe} = global;

describe('Japanese Era name tests', () => {
    it('Should be Reiwa era when the date was greater than 2019-05-01', () => {
        let givenDate1 = moment('2019-05-02', 'YYYY-MM-DD').toDate();
        let result1    = era(givenDate1);


        assert.equal(result1.getNthYear(), 1);
        assert.equal(result1.getName(), '令和');
    });

    it('Should be Reiwa even when the date was equal 2019-05-01', () => {

        let givenDate2 = moment('2019-05-01', 'YYYY-MM-DD').toDate();
        let result2    = era(givenDate2);


        assert.equal(result2.getNthYear(), 1);
        assert.equal(result2.getName(), '令和');
    });

    it('Should be Heisei even when the date is within 2019, but smaller than 2019/05/01', () => {
        let givenDate = moment('2019-04-30', 'YYYY-MM-DD').toDate();
        let result    = era(givenDate);

        assert.equal(result.getNthYear(), 2019 - 1989 + 1);
        assert.equal(result.getName(), '平成');
    });

    it('Should use others options, when it is older than 1926/12/25', () => {
        let givenDate = moment('1926-02-10', 'YYYY-MM-DD').toDate();
        let result    = era(givenDate);

        assert.equal(result.getNthYear(), 1926);
        assert.equal(result.getName(), '大正以前');
    });
});
