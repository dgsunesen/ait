/*
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');

const {connect} = require('react-redux');
const {createSelector} = require('reselect');

const {mapSelector} = require('../../MapStore2/web/client/selectors/map');
const {layersSelector} = require('../../MapStore2/web/client/selectors/layers');

const {purgeMapInfoResults, showMapinfoMarker, hideMapinfoMarker, showChart, hideMapinfoRevGeocode, clearWarning} = require('../actions/mapInfoChart');
const {changeMousePointer} = require('../../MapStore2/web/client/actions/map');

const Message = require('../../MapStore2/web/client/plugins/locale/Message');

const {Glyphicon} = require('react-bootstrap');

const assign = require('object-assign');

require('../../MapStore2/web/client/plugins/identify/identify.css');

const selector = createSelector([
    (state) => (state.mapInfoChart && state.mapInfoChart.enabled) || (state.controls && state.controls.infoChart && state.controls.infoChart.enabled) || false,
    (state) => state.mapInfoChart && state.mapInfoChart.responses || [],
    (state) => state.mapInfoChart && state.mapInfoChart.requests || [],
    (state) => state.mapInfoChart && state.mapInfoChart.infoFormat,
    mapSelector,
    layersSelector,
    (state) => state.mapInfoChart && state.mapInfoChart.clickPoint,
    (state) => state.home && state.home.date,
    (state) => state.mapInfoChart && state.mapInfoChart.chartsData,
    (state) => state.mapInfoChart && state.mapInfoChart.warning

], (enabled, responses, requests, format, map, layers, point, data, chartsData, warning) => ({
    enabled, responses, requests, format, map, layers, point, data, chartsData, warning
}));
// result panel

/**
 * Identify plugin. This plugin allows to perform getfeature info.
 * It can be configured to have a mobile or a desktop flavor.
 * @class Identify
 * @memberof plugins
 * @static
 *
 * @prop showIn {string[]} List of the plugins where to show the plugin
 * @prop bodyClass {string} class to assign to the feature info panel body
 * @prop cfg.style {object} inline css style
 * @prop cfg.draggable {boolean} draggable info window
 * @prop cfg.collapsible {boolean} collapsible info panel
 * @prop cfg {object} style
 * @prop cfg.viewerOptions {object}
 * @prop cfg.viewerOptions.container {expression} the container of the viewer, expression from the context
 * @prop cfg.viewerOptions.header {expression} the geader of the viewer, expression from the context{expression}
 * @prop cfg.viewerOptions.collapsible {boolean} the single feature viewer is collapsible
 *
 * @example
 * {
 *   "name": "Identify",
 *   "showIn": ["Settings"],
 *   "cfg": {
 *       "style": {
 *           "position": "absolute",
 *           "width": "100%",
 *           "bottom": "0px",
 *           "zIndex": 1023,
 *           "maxHeight": "70%",
 *           "marginBottom": 0
 *       },
 *       "draggable": false,
 *       "collapsible": true,
 *       "viewerOptions": {
 *       "container": "{context.ReactSwipe}",
 *       "header": "{context.SwipeHeader}",
 *       "collapsible": false
 *   },
 *   "bodyClass": "mobile-feature-info"
 *  }
 * }
 */
const IdentifyChartPlugin = connect(selector, {
    purgeResults: purgeMapInfoResults,
    changeMousePointer,
    showMarker: showMapinfoMarker,
    clearWarning,
    hideMarker: hideMapinfoMarker,
    showAitChart: showChart,
    hideRevGeocode: hideMapinfoRevGeocode
})(require('../components/data/identify/IdentifyChartPanel'));

module.exports = {
    IdentifyChartPlugin: assign(IdentifyChartPlugin, {
        Toolbar: {
            name: 'infoChart',
            position: 5,
            tooltip: "chartinfo.tooltip",
            icon: <Glyphicon glyph="glyphicon glyphicon-signal"/>,
            help: <Message msgId="helptexts.infoButton"/>,
            toggle: true
        }
    }),
    reducers: {mapInfoChart: require('../reducers/mapInfoChart')}
};
