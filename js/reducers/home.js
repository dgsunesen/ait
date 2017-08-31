/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var {MAP_YEAR_CHANGED, MAP_PERIOD_CHANGED} = require('../actions/home');
const DateAPI = require('../utils/ManageDateUtils');

const defaultState = {
    periodType: "1",
    fromData: new Date(DateAPI.calculateDateFromKey("1").fromData),
    toData: new Date(DateAPI.calculateDateFromKey("1").toData)
};

function home(state = defaultState, action) {
    switch (action.type) {
        case MAP_YEAR_CHANGED:
            return {
                fromData: new Date(DateAPI.calculateDateFromKey(state.periodType, action.hidrologicYear).fromData),
                toData: new Date(DateAPI.calculateDateFromKey(state.periodType, action.hidrologicYear).toData),
                periodType: state.periodType
            };
        case MAP_PERIOD_CHANGED:
            return {
                fromData: new Date(DateAPI.calculateDateFromKey(action.periodType, state.toData).fromData),
                toData: new Date(DateAPI.calculateDateFromKey(action.periodType, state.toData).toData),
                periodType: action.periodType
            };
        default:
            return state;
    }
}

module.exports = home;
