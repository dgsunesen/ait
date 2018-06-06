/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var {MAP_YEAR_CHANGED, MAP_PERIOD_CHANGED, CLICK_THUMBNAIL_HOME} = require('../actions/home');
const DateAPI = require('../utils/ManageDateUtils');

const defaultState = {
    periodType: "1",
    fromData: new Date(DateAPI.calculateDateFromKey("1").fromData),
    toData: new Date(DateAPI.calculateDateFromKey("1").toData),
    showModal: false,
    imgSrc: "",
    map: "/opt/ait/ait.map"
};

function home(state = defaultState, action) {
    switch (action.type) {
        case MAP_YEAR_CHANGED:
            return {
                fromData: new Date(DateAPI.calculateDateFromKey(state.periodType, action.hidrologicYear).fromData),
                toData: new Date(DateAPI.calculateDateFromKey(state.periodType, action.hidrologicYear).toData),
                periodType: state.periodType,
                showModal: false,
                imgSrc: "",
                map: state.map
            };
        case MAP_PERIOD_CHANGED:
            return {
                fromData: new Date(DateAPI.calculateDateFromKey(action.periodType, state.toData).fromData),
                toData: new Date(DateAPI.calculateDateFromKey(action.periodType, state.toData).toData),
                periodType: action.periodType,
                showModal: false,
                imgSrc: "",
                map: state.map
            };
        case CLICK_THUMBNAIL_HOME:
            return {
                fromData: new Date(DateAPI.calculateDateFromKey(state.periodType, state.toData).fromData),
                toData: new Date(DateAPI.calculateDateFromKey(state.periodType, state.toData).toData),
                periodType: state.periodType,
                showModal: action.showModal,
                imgSrc: action.imgSrc,
                map: state.map
            };
        default:
            return state;
    }
}

module.exports = home;
