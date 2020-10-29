import options from './options';

import moment from 'moment';

import Era from "./Era";

export function era(date) {
    const { mileStones, others } = options;
    
    // First we'll order by the time line DESC
    const timeline = mileStones
        .map(mileStone => ({ ...mileStone, moment: moment(mileStone.date, 'YYYY/MM/DD') }))
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

/**
 * Get the start year of the era
 *
 * @param eraName
 * @returns {number}
 */
export function sinceYear(eraName) {
    return mileStones.find(({ era }) => era === eraName).since;
}

/**
 * Converting the era year back to year
 *
 * @param era string
 * @param nthYear number
 */
export function inverse(era, nthYear = 1) {
    if (nthYear < 1) {
        throw new Error('The nth year must be equal or greater than 1');
    }
    
    const mileStone = options.mileStones.find(mileStone => mileStone.era === era);
    
    if (!mileStone) {
        throw new Error('Invalid Era name. Must be either ' + eras.join());
    }
    
    return mileStone.since - 1 + nthYear;
}

/**
 * Get the number of available year for a given era
 *
 * @param eraName
 * @param now
 * @returns {number}
 */
export function availableNthYears(eraName, now = new Date()) {
    switch (eraName) {
        case Reiwa:
            return now.getFullYear() - sinceYear(eraName) + 1;
        case Heisei:
            return sinceYear(Reiwa) - sinceYear(Heisei) + 1;
        case Showa:
            return sinceYear(Heisei) - sinceYear(Showa) + 1;
        default:
            throw new Error('Invalid Era name. Must be either ' + eras.join());
    }
}

export const Reiwa = "令和"

export const Heisei = "平成"

export const Showa = "昭和"

export const eras = {
    Reiwa,
    Heisei,
    Showa
}

export const mileStones = options.mileStones
