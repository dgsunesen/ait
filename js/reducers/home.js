/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const moment = require('moment');
var {MAP_DATE_CHANGED, MAP_DATE_PLUS, MAP_DATE_MINUS} = require('../actions/home');

function home(state = {date: new Date("1995-01-01"), plusButtonDisabled: false, minusButtonDisabled: false}, action) {
    switch (action.type) {
        case MAP_DATE_CHANGED:
            return {
                date: action.date,
                plusButtonDisabled: moment(action.date).format('YYYY-MM-DD') === moment().subtract(1, 'day').format('YYYY-MM-DD'),
                minusButtonDisabled: moment(action.date).format('YYYY-MM-DD') === moment("1995-01-01").format('YYYY-MM-DD')
            };
        case MAP_DATE_PLUS:
            return {
                date: new Date(action.date.getTime() + 86400000),
                plusButtonDisabled: moment(action.date).add(1, 'day').format('YYYY-MM-DD') === moment().subtract(1, 'day').format('YYYY-MM-DD'),
                minusButtonDisabled: false
            };
        case MAP_DATE_MINUS:
            return {
                date: new Date(action.date.getTime() - 86400000),
                plusButtonDisabled: false,
                minusButtonDisabled: moment(action.date).subtract(1, 'day').format('YYYY-MM-DD') === moment("1995-01-01").format('YYYY-MM-DD')
            };
        default:
            return state;
    }
}

module.exports = home;
