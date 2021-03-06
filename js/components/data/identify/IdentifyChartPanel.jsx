/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const {Panel, Glyphicon, Modal} = require('react-bootstrap');
const {findIndex} = require('lodash');

require('./css/identify.css');

const Draggable = require('react-draggable');

const MapInfoUtils = require('../../../../MapStore2/web/client/utils/MapInfoUtils');
const Spinner = require('../../../../MapStore2/web/client/components/misc/spinners/BasicSpinner/BasicSpinner');
const Message = require('../../../../MapStore2/web/client/components/I18N/Message');
const DefaultViewer = require('./DefaultViewer');
const Dialog = require('../../../../MapStore2/web/client/components/misc/Dialog');
const moment = require('moment');

const Identify = React.createClass({
    propTypes: {
        enabled: React.PropTypes.bool,
        draggable: React.PropTypes.bool,
        collapsible: React.PropTypes.bool,
        style: React.PropTypes.object,
        point: React.PropTypes.object,
        format: React.PropTypes.string,
        map: React.PropTypes.object,
        layers: React.PropTypes.array,
        buffer: React.PropTypes.number,
        requests: React.PropTypes.array,
        responses: React.PropTypes.array,
        viewerOptions: React.PropTypes.object,
        viewer: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.func]),
        purgeResults: React.PropTypes.func,
        noQueryableLayers: React.PropTypes.func,
        clearWarning: React.PropTypes.func,
        queryableLayersFilter: React.PropTypes.func,
        buildRequest: React.PropTypes.func,
        sendRequest: React.PropTypes.func,
        localRequest: React.PropTypes.func,
        showMarker: React.PropTypes.func,
        hideMarker: React.PropTypes.func,
        changeMousePointer: React.PropTypes.func,
        maxItems: React.PropTypes.number,
        excludeParams: React.PropTypes.array,
        includeOptions: React.PropTypes.array,
        showAitChart: React.PropTypes.func,
        hideRevGeocode: React.PropTypes.func,
        showModalReverse: React.PropTypes.bool,
        reverseGeocodeData: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array, React.PropTypes.string]),
        enableRevGeocode: React.PropTypes.bool,
        wrapRevGeocode: React.PropTypes.bool,
        panelClassName: React.PropTypes.string,
        headerClassName: React.PropTypes.string,
        bodyClassName: React.PropTypes.string,
        asPanel: React.PropTypes.bool,
        headerGlyph: React.PropTypes.string,
        closeGlyph: React.PropTypes.string,
        allowMultiselection: React.PropTypes.bool,
        warning: React.PropTypes.string,
        data: React.PropTypes.instanceOf(Date),
        chartsData: React.PropTypes.array
    },
    getDefaultProps() {
        return {
            enabled: false,
            draggable: true,
            collapsible: false,
            format: MapInfoUtils.getDefaultInfoFormatValue(),
            requests: [],
            responses: [],
            buffer: 2,
            viewerOptions: {},
            viewer: DefaultViewer,
            purgeResults: () => {},
            buildRequest: MapInfoUtils.buildIdentifyRequest,
            localRequest: () => {},
            sendRequest: () => {},
            showMarker: () => {},
            hideMarker: () => {},
            noQueryableLayers: () => {},
            clearWarning: () => {},
            changeMousePointer: () => {},
            showAitChart: () => {},
            hideRevGeocode: () => {},
            containerProps: {
                continuous: false
            },
            showModalReverse: false,
            reverseGeocodeData: [],
            enableRevGeocode: true,
            wrapRevGeocode: false,
            queryableLayersFilter: MapInfoUtils.defaultQueryableFilter,
            style: {
                position: "absolute",
                maxWidth: "1500px",
                width: "900px",
                top: "26px",
                left: "250px",
                zIndex: 1023,
                boxShadow: "2px 2px 4px #A7A7A7"
            },
            point: {},
            map: {},
            layers: [],
            maxItems: 10,
            excludeParams: ["SLD_BODY"],
            includeOptions: [
                "buffer",
                "cql_filter",
                "filter",
                "propertyName"
            ],
            panelClassName: "modal-dialog info-panel modal-content",
            headerClassName: "modal-header",
            bodyClassName: "modal-body info-wrap",
            asPanel: false,
            headerGlyph: "",
            closeGlyph: "1-close",
            className: "square-button",
            allowMultiselection: false,
            date: new Date('2016-10-01'),
            chartsData: []
        };
    },
    componentWillReceiveProps(newProps) {
        if (this.needsRefresh(newProps)) {
            // if (!newProps.point.modifiers || newProps.point.modifiers.ctrl !== true || !newProps.allowMultiselection) {
            //     this.props.purgeResults();
            // }
            // const queryableLayers = newProps.layers.filter(newProps.queryableLayersFilter);
            // queryableLayers.forEach((layer) => {
            //     const {url, request, metadata} = this.props.buildRequest(layer, newProps);
            //     if (url) {
            //         this.props.sendRequest(url, request, metadata, this.filterRequestParams(layer));
            //     } else {
            //         this.props.localRequest(layer, request, metadata);
            //     }
            // });

            let data = moment(newProps.data).subtract(1, 'day').format('YYYY-MM-DD');
            this.props.showAitChart({lat: newProps.point.latlng.lat, lng: newProps.point.latlng.lng}, {data});

            this.props.showMarker();

            // if (queryableLayers.length === 0) {
            //     this.props.noQueryableLayers();
            // } else {
            //     this.props.showMarker();
            // }

        }

        if (newProps.enabled && !this.props.enabled) {
            this.props.changeMousePointer('pointer');
        } else if (!newProps.enabled && this.props.enabled) {
            this.props.changeMousePointer('auto');
            this.props.hideMarker();
            this.props.purgeResults();
        }
    },
    onModalHiding() {
        this.props.hideMarker();
        this.props.purgeResults();
    },
    renderHeader(missing) {
        return (
            <span role="header">
                { (missing !== 0 ) ? <Spinner value={missing} sSize="sp-small" /> : null }
                {this.props.headerGlyph ? <Glyphicon glyph={this.props.headerGlyph} /> : null}&nbsp;<Message msgId="identifyChartTitle" />
                <button onClick={this.onModalHiding} className="close">{this.props.closeGlyph ? <Glyphicon glyph={this.props.closeGlyph}/> : <span>×</span>}</button>
            </span>
        );
    },
    renderResults(missingResponses) {
        const Viewer = this.props.viewer;
        let chartsData = this.props.chartsData;
        return (
                <Viewer
                    format={this.props.format}
                    missingResponses={missingResponses}
                    responses={this.props.responses}
                    {...this.props.viewerOptions}
                    aitChartsData={chartsData.error ? <Message msgId="identifyRevGeocodeError" /> : chartsData}/>
        );
    },
    renderContent() {
        let missingResponses = this.props.requests.length - this.props.responses.length;
        return this.props.asPanel ? (
            <Panel
                defaultExpanded={true}
                collapsible={this.props.collapsible}
                id="mapstore-getfeatureinfo"
                style={this.props.style}
                className={this.props.panelClassName}>
                <div className={this.props.headerClassName ? this.props.headerClassName : "panel-heading"}>
                    {this.renderHeader(missingResponses)}
                </div>
                {this.renderResults(missingResponses)}
            </Panel>
        ) : (
            <Dialog id="mapstore-getfeatureinfo"
                style={this.props.style}
                className={this.props.panelClassName}
                headerClassName={this.props.headerClassName}
                bodyClassName={this.props.bodyClassName}
                >
                {this.renderHeader(missingResponses)}
                <div role="body">
                    {this.renderResults(missingResponses)}
                </div>
            </Dialog>
        );
    },
    render() {
        if (this.props.enabled && this.props.chartsData.length !== 0) {
            return this.props.draggable ? (
                    <Draggable>
                        {this.renderContent()}
                    </Draggable>
                ) : this.renderContent();
        }
        if (this.props.warning) {
            return (<Modal show={true} bsSize="small" onHide={() => {
                this.props.clearWarning();
            }}>
                <Modal.Header className="dialog-error-header-side" closeButton>
                    <Modal.Title><Message msgId="warning"/></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mapstore-error"><Message msgId="identifyNoQueryableLayers"/></div>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>);
        }
        return null;
    },
    needsRefresh(props) {
        if (props.enabled && props.point && props.point.pixel) {
            if (!this.props.point.pixel || this.props.point.pixel.x !== props.point.pixel.x ||
                    this.props.point.pixel.y !== props.point.pixel.y ) {
                return true;
            }
            if (!this.props.point.pixel || props.point.pixel && this.props.format !== props.format) {
                return true;
            }
        }
        return false;
    },
   filterRequestParams(layer) {
        let includeOpt = this.props.includeOptions || [];
        let excludeList = this.props.excludeParams || [];
        let options = Object.keys(layer).reduce((op, next) => {
            if (next !== "params" && includeOpt.indexOf(next) !== -1) {
                op[next] = layer[next];
            }else if (next === "params" && excludeList.length > 0) {
                let params = layer[next];
                Object.keys(params).forEach((n) => {
                    if (findIndex(excludeList, (el) => {return (el === n); }) === -1) {
                        op[n] = params[n];
                    }
                }, {});
            }
            return op;
        }, {});
        return options;
    }
});

module.exports = Identify;
