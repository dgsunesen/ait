/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const MAP_YEAR_CHANGED = 'MAP_YEAR_CHANGED';
const MAP_PERIOD_CHANGED = 'MAP_PERIOD_CHANGED';

function changeYear(hidrologicYear) {
    return {
        type: MAP_YEAR_CHANGED,
        hidrologicYear
    };
}

function changePeriod(periodType) {
    return {
        type: MAP_PERIOD_CHANGED,
        periodType
    };
}


module.exports = {MAP_YEAR_CHANGED, MAP_PERIOD_CHANGED, changeYear, changePeriod};
