/**
 * Copyright 2015, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const ol = window.ol;

const ConfigMeteoUtils = {
    normalizeConfig: function(config) {
        return {'results': config};
    },
    projectionsDefs: function() {
        return [
            {
                "code": "EPSG:3003",
                "def": "+proj=tmerc +lat_0=0 +lon_0=9 +k=0.9996 +x_0=1500000 +yol_0=0 +ellps=intl +towgs84=-104.1,-49.1,-9.9,0.971,-2.917,0.714,-11.68 +units=m +no_defs",
                "extent": [1290650.93, 4192956.42, 2226749.10, 5261004.57]
            }, {
                "code": "EPSG:3004",
                "def": "+proj=tmerc +lat_0=0 +lon_0=15 +k=0.9996 +x_0=2520000 +y_0=0 +ellps=intl +towgs84=-104.1,-49.1,-9.9,0.971,-2.917,0.714,-11.68 +units=m +no_defs",
                "extent": [1782205.39, 4223533.54, 2791665.11, 5222517.32]
            }
        ];
    },
    applyProjections: function(code, extent) {
        return new ol.proj.Projection({
            code,
            extent
        });
    }
};

module.exports = ConfigMeteoUtils;
