/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const PropTypes = React.PropTypes;
const {Button} = require('react-bootstrap');
const Modal = require('../../../../MapStore2/web/client/components/misc/Modal');
const moment = require('moment');
const AitCharts = require('../viewers/AitCharts');

const renderAitCharts = function(chartData) {
    return (
        <AitCharts
            chartData={chartData}/>
    );
};

const GeocodeViewer = (props) => {
    if (props.latlng) {
        /* lngCorrected is the converted longitude in order to have the value between
           the range (-180 / +180).
        */
        let lngCorrected = Math.round(props.latlng.lng * 100000) / 100000;
        /* the following formula apply the converion */
        lngCorrected = lngCorrected - (360) * Math.floor(lngCorrected / (360) + 0.5);
        let data = moment(props.data).format('YYYY-MM-DD');
        return (
            <div>
                <span>Lat: {Math.round(props.latlng.lat * 100000) / 100000 } - Long: { lngCorrected }</span>
                <Button
                    style={{"float": "right"}}
                    bsStyle="primary"
                    bsSize="small"
                    onClick={() => props.showRevGeocode({lat: props.latlng.lat, lng: lngCorrected}, {data})} >
                    {props.identifyRevGeocodeSubmitText}
                </Button>
                <Modal {...props.modalOptions} show={props.showModalReverse} bsSize="large" container={document.getElementById("body")}>
                    <Modal.Header>
                        <Modal.Title>{props.identifyRevGeocodeModalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        {renderAitCharts(props.revGeocodeDisplayName)}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsSize="small" style={{"float": "right"}} bsStyle="primary" onClick={props.hideRevGeocode}>{props.identifyRevGeocodeCloseText}</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
    return <span/>;
};

GeocodeViewer.propTypes = {
    latlng: PropTypes.object.isRequired,
    showRevGeocode: PropTypes.func.isRequired,
    showModalReverse: PropTypes.bool.isRequired,
    identifyRevGeocodeModalTitle: React.PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.object.isRequired]),
    revGeocodeDisplayName: React.PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]),
    hideRevGeocode: PropTypes.func.isRequired,
    identifyRevGeocodeSubmitText: React.PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.object.isRequired]),
    identifyRevGeocodeCloseText: React.PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.object.isRequired]),
    modalOptions: React.PropTypes.object
};

GeocodeViewer.defaultProps = {
    modalOptions: {}
};

module.exports = GeocodeViewer;
