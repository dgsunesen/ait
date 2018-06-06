/**
 * Copyright 2015, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var axios = require('../../MapStore2/web/client/libs/ajax');
const DateAPI = require('../utils/ManageDateUtils');
const moment = require('moment');

const MAP_CONFIG_LOADED = 'MAP_CONFIG_LOADED';
const MAP_CONFIG_LOAD_ERROR = 'MAP_CONFIG_LOAD_ERROR';

function configureMap(conf, mapId) {
    return {
        type: MAP_CONFIG_LOADED,
        config: conf,
        legacy: !!mapId,
        mapId: mapId
    };
}

function configureError(e) {
    return {
        type: MAP_CONFIG_LOAD_ERROR,
        error: e
    };
}

function loadMapConfig(configName, mapId, fromData, toData) {
    return (dispatch) => {
        return axios.get(configName).then((response) => {
            if (typeof response.data === 'object') {
                response.data.map.layers.map((data) => {
                    if (data && data.group && (data.group === "Variabili Meteo.Pioggia" || data.group === "Variabili Meteo.Temperatura" || data.group === "Layer di Base")) {
                        const mapFile = DateAPI.setAITMapFile(moment(fromData).format('YYYY-MM-DD'), moment(toData).format('YYYY-MM-DD'));
                        Object.assign(data, {params: {map: "/opt/ait/" + mapFile, fromData: moment(fromData).format('YYYY-MM-DD'), toData: moment(toData).format('YYYY-MM-DD')}});
                    }
                }, this);
                dispatch(configureMap(response.data, mapId));
            } else {
                try {
                    JSON.parse(response.data);
                } catch(e) {
                    dispatch(configureError('Configuration file broken (' + configName + '): ' + e.message));
                }
            }
        }).catch((e) => {
            dispatch(configureError(e));
        });
    };
}

module.exports = {
    MAP_CONFIG_LOADED,
    MAP_CONFIG_LOAD_ERROR,
    loadMapConfig,
    configureMap,
    configureError
};
