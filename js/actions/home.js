/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const MAP_TYPE_CHANGED = 'MAP_TYPE_CHANGED';
const MAP_DATE_CHANGED = 'MAP_DATE_CHANGED';
const MAP_DATE_PLUS = 'MAP_DATE_PLUS';
const MAP_DATE_MINUS = 'MAP_DATE_MINUS';

function changeMapType(mapType) {
    return {
        type: MAP_TYPE_CHANGED,
        mapType
    };
}

function changeDate(date) {
    return {
        type: MAP_DATE_CHANGED,
        date
    };
}

function changeDatePlus(date) {
    return {
        type: MAP_DATE_PLUS,
        date
    };
}

function changeDateMinus(date) {
    return {
        type: MAP_DATE_MINUS,
        date
    };
}

module.exports = {MAP_TYPE_CHANGED, MAP_DATE_CHANGED, MAP_DATE_PLUS, MAP_DATE_MINUS, changeMapType, changeDate, changeDatePlus, changeDateMinus};
