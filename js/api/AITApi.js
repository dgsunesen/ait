/**
 * Copyright 2015, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var axios = require('../../MapStore2/web/client/libs/ajax');
const urlUtil = require('url');
const assign = require('object-assign');
const DEFAULT_URL = '172.16.1.146/cgi-bin/aitchart.py';

// const defaultOptions = {
//     format: 'json',
//     bounded: 0,
//     polygon_geojson: 1,
//     priority: 5
// };
/**
 * API for local config
 */
const Api = {
    aitchart: function(coords, options) {
        var params = assign({lat: coords.lat, lng: coords.lng}, options || {});
        var url = urlUtil.format({
            protocol: window.location.protocol,
            host: DEFAULT_URL,
            query: params
        });
        return axios.get(url); // TODO the jsonp method returns .promise and .cancel method,the last can be called when user cancel the query
    }
};

module.exports = Api;
