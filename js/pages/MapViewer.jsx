/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');

require('../assets/css/viewer.css');

const {connect} = require('react-redux');

const url = require('url');
const urlQuery = url.parse(window.location.href, true).query;

const ConfigUtils = require('../../MapStore2/web/client/utils/ConfigUtils');
const {loadMapConfig} = require('../actions/config');
const {resetControls} = require('../../MapStore2/web/client/actions/controls');

const MapViewer = require('../../MapStore2/web/client/containers/MapViewer');

let oldLocation;

const MapViewerPage = React.createClass({
    propTypes: {
        mode: React.PropTypes.string,
        params: React.PropTypes.object,
        loadMapConfig: React.PropTypes.func,
        reset: React.PropTypes.func,
        plugins: React.PropTypes.object,
        location: React.PropTypes.object,
        fromData: React.PropTypes.instanceOf(Date),
        toData: React.PropTypes.instanceOf(Date)
    },
    getDefaultProps() {
        return {
            mode: 'desktop'
        };
    },
    componentWillMount() {
        if (this.props.params.mapId && oldLocation !== this.props.location) {
            let fromData = this.props.fromData;
            let toData = this.props.toData;
            oldLocation = this.props.location;
            if (!ConfigUtils.getDefaults().ignoreMobileCss) {
                if (this.props.mode === 'mobile') {
                    require('../assets/css/mobile.css');
                }
            }

            // VMap = require('../components/viewer/Map')(this.props.params.mapType);
            let mapId = (this.props.params.mapId === '0') ? null : this.props.params.mapId;
            let config = urlQuery && urlQuery.config || null;
            // if mapId is a string, is the name of the config to load
            try {
                let mapIdNumber = parseInt(mapId, 10);
                if (isNaN(mapIdNumber)) {
                    config = mapId;
                    mapId = null;
                }
            } catch(e) {
                config = mapId;
                mapId = null;
            }
            const {configUrl} = ConfigUtils.getConfigurationOptions({mapId, config});
            this.props.reset();
            this.props.loadMapConfig(configUrl, mapId, fromData, toData);
        }
    },
    render() {
        return (<MapViewer
            plugins={this.props.plugins}
            params={this.props.params}
            />);
    }
});

module.exports = connect((state) => ({
    mode: (urlQuery.mobile || (state.browser && state.browser.mobile)) ? 'mobile' : 'desktop',
    fromData: state.home && state.home.fromData || new Date('1995-01-01'),
    toData: state.home && state.home.toData || new Date('1995-01-01')
}),
{
    loadMapConfig,
    reset: resetControls
})(MapViewerPage);
