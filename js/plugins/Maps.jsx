/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const {connect} = require('react-redux');
const {loadMaps, updateMapMetadata, deleteMap, createThumbnail, deleteThumbnail, saveMap, thumbnailError, saveAll, onDisplayMetadataEdit, resetUpdating, metadataChanged} = require('../../MapStore2/web/client/actions/maps');
const {editMap, updateCurrentMap, errorCurrentMap, removeThumbnail, resetCurrentMap} = require('../../MapStore2/web/client/actions/currentMap');
const ConfigUtils = require('../../MapStore2/web/client/utils/ConfigUtils');
const MapsGrid = connect((state) => {
    return {
        bsSize: "small",
        maps: state.maps && state.maps.results ? state.maps.results : [],
        currentMap: state.currentMap,
        loading: state.maps && state.maps.loading,
        mapType: (state.home && state.home.mapType) || (state.maps && state.maps.mapType)
    };
}, {
    loadMaps,
    updateMapMetadata,
    editMap,
    saveMap,
    removeThumbnail,
    onDisplayMetadataEdit,
    resetUpdating,
    saveAll,
    updateCurrentMap,
    errorCurrentMap,
    thumbnailError,
    createThumbnail,
    deleteThumbnail,
    deleteMap,
    resetCurrentMap
})(require('../../MapStore2/web/client/components/maps/MapGrid'));

const {loadPermissions, updatePermissions, loadAvailableGroups} = require('../../MapStore2/web/client/actions/maps');
const {updateCurrentMapPermissions, addCurrentMapPermission} = require('../../MapStore2/web/client/actions/currentMap');
const {setControlProperty} = require('../../MapStore2/web/client/actions/controls');

const MetadataModal = connect(
    (state = {}) => ({
        metadata: state.maps.metadata,
        availableGroups: state.currentMap && state.currentMap.availableGroups || [ ], // TODO: add message when array is empty
        newGroup: state.controls && state.controls.permissionEditor && state.controls.permissionEditor.newGroup,
        newPermission: state.controls && state.controls.permissionEditor && state.controls.permissionEditor.newPermission || "canRead",
        user: state.security && state.security.user || {name: "Guest"}
    }),
    {
        loadPermissions, loadAvailableGroups, updatePermissions, onGroupsChange: updateCurrentMapPermissions, onAddPermission: addCurrentMapPermission, metadataChanged,
        onNewGroupChoose: setControlProperty.bind(null, 'permissionEditor', 'newGroup'),
        onNewPermissionChoose: setControlProperty.bind(null, 'permissionEditor', 'newPermission')
    }, null, {withRef: true} )(require('../../MapStore2/web/client/components/maps/modals/MetadataModal'));

const PaginationToolbar = connect((state) => {
    if (!state.maps ) {
        return {};
    }
    let {start, limit, results, loading, totalCount, searchText} = state.maps;
    const total = Math.min(totalCount || 0, limit || 0);
    const page = (results && total && Math.ceil(start / total)) || 0;
    return {
        page: page,
        pageSize: limit,
        items: results,
        total: totalCount,
        searchText,
        loading
    };
}, {onSelect: loadMaps}, (stateProps, dispatchProps) => {

    return {
        ...stateProps,
        onSelect: (pageNumber) => {
            let start = stateProps.pageSize * pageNumber;
            let limit = stateProps.pageSize;
            dispatchProps.onSelect(ConfigUtils.getDefaults().geoStoreUrl, stateProps.searchText, {start, limit});
        }
    };
})(require('../../MapStore2/web/client/components/misc/PaginationToolbar'));

const Maps = React.createClass({
    propTypes: {
        mapType: React.PropTypes.string,
        onGoToMap: React.PropTypes.func,
        loadMaps: React.PropTypes.func,
        maps: React.PropTypes.object,
        colProps: React.PropTypes.object
    },
    contextTypes: {
        router: React.PropTypes.object
    },
    componentDidMount() {
        this.props.loadMaps(ConfigUtils.getDefaults().geoStoreUrl, ConfigUtils.getDefaults().initialMapFilter || "*", {start: 0, limit: 12});
    },
    getDefaultProps() {
        return {
            mapType: "leaflet",
            onGoToMap: () => {},
            loadMaps: () => {},
            fluid: false,
            colProps: {
                xs: 12,
                sm: 6,
                lg: 3,
                md: 4,
                style: {
                    "marginBottom": "20px"
                }
            },
            maps: {
                results: []
            }
        };
    },
    render() {
        return (<MapsGrid
            colProps={this.props.colProps}
            viewerUrl={(map) => {this.context.router.push("/viewer/" + this.props.mapType + "/" + map.id); }}
            metadataModal={MetadataModal}
            />);
    }
});

module.exports = {
    MapsPlugin: connect((state) => ({
        mapType: (state.maptype && state.maptype.mapType) || 'leaflet'
    }), {
        loadMaps
    })(Maps),
    epics: require('../../MapStore2/web/client/epics/maptype'),
    reducers: {
        maps: require('../../MapStore2/web/client/reducers/maps'),
        maptype: require('../../MapStore2/web/client/reducers/maptype'),
        currentMap: require('../../MapStore2/web/client/reducers/currentMap')
    }
};
