import options from './options';

import moment from 'moment';

import Era from "./Era";

export function era(date) {
    const {mileStones, others} = options;

    // First we'll order by the time line DESC
    const timeline = mileStones
        .map(mileStone => ({...mileStone, moment: moment(mileStone.date, 'YYYY/MM/DD')}))
        .sort((thisMileStone, thatMileStone) => thatMileStone.moment.diff(thisMileStone.moment))
    ;

    // Then we'll find the first - greater than - condition
    const foundMileStone = timeline.find(mileStone => {
        return moment(date).diff(mileStone.moment) >= 0;
    });

    if (!foundMileStone) {
        return new Era(others.era, date.getFullYear());
    }

    return new Era(foundMileStone.era, (date.getFullYear() - foundMileStone.since) + 1);
}
