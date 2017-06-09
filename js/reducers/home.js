/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var {MAP_TYPE_CHANGED, MAP_DATE_CHANGED, MAP_DATE_PLUS, MAP_DATE_MINUS} = require('../actions/home');

function home(state = {mapType: "leaflet", date: new Date("1995-01-01")}, action) {
    switch (action.type) {
        case MAP_TYPE_CHANGED:
            return {mapType: action.mapType};
        case MAP_DATE_CHANGED:
            return {date: action.date};
        case MAP_DATE_PLUS:
            return {
                date: new Date(action.date.getTime() + 86400000)
            };
        case MAP_DATE_MINUS:
            return {
                date: new Date(action.date.getTime() - 86400000)
            };
        default:
            return state;
    }
}

module.exports = home;
