/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const DateAPI = require('./utils/ManageDateUtils');
const moment = require('moment');

module.exports = {
    pages: [{
        name: "home",
        path: "/",
        component: require('./pages/Maps')
    }, {
        name: "maps",
        path: "/maps",
        component: require('./pages/Maps')
    }, {
        name: "mapviewer",
        path: "/viewer/:mapType/:mapId",
        component: require('./pages/MapViewer')
    }, {
        name: "manager",
        path: "/manager",
        component: require('./pages/Manager')
    }, {
        name: "manager",
        path: "/manager/:tool",
        component: require('./pages/Manager')
    }],
    pluginsDef: require('./plugins.js'),
    initialState: {
        defaultState: {
            mousePosition: {enabled: false},
            // home: {date: moment().subtract(1, 'day')._d, minusButtonDisabled: false, plusButtonDisabled: true},
            home: {
                fromData: new Date(DateAPI.calculateDateFromKey("1", moment().subtract(1, 'day')._d).fromData),
                toData: new Date(DateAPI.calculateDateFromKey("1", moment().subtract(1, 'day')._d).toData),
                periodType: "1"
            },
            maptype: {mapType: "openlayers"},
            mapInfo: {enabled: false, infoFormat: 'text/html' },
            mapInfoChart: {enabled: false, infoFormat: 'text/html' },
            theme: {selectedTheme: {id: "ait"}},
            controls: {
                help: {
                    enabled: false
                },
                print: {
                    enabled: false
                },
                toolbar: {
                    active: null,
                    expanded: false
                },
                drawer: {
                    enabled: false,
                    menu: "1"
                }
            }
        },
        mobile: {
            mapInfo: {enabled: true, infoFormat: 'text/html' },
            mousePosition: {enabled: true, crs: "EPSG:4326", showCenter: true}
        }
    },
    storeOpts: {
        persist: {
            whitelist: ['security']
        }
    }
};
