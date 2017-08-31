/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');
const {Grid, Row, Col, Thumbnail} = require('react-bootstrap');
const {connect} = require('react-redux');
const assign = require('object-assign');

const style = {
    maxWidth: "100%",
    overflow: "hidden",
    cursor: "pointer"
};

const HomeMapsAit = React.createClass({
    propTypes: {
        id: React.PropTypes.string
    },
    getDefaultProps() {
        return {};
    },
    render() {
        return (
            <div style={{
                marginTop: "-100px"
            }}>
                <Grid>
                    <Row className="show-grid">
                        <Col sm={3}>
                            <Thumbnail className="gridcard" style={style}>
                                <h4>
                                    <strong>Cumulato Precipitazione ultimi 30 gg (mm)</strong>
                                </h4>
                                <a href="../../assets/img/Prec_ultimi_30gg.png" target="_blank">
                                    <img className="img-fluid" src="../../assets/img/Prec_ultimi_30gg.png" alt="FFWI"/>
                                </a>
                            </Thumbnail>
                        </Col>
                        <Col sm={3}>
                            <Thumbnail className="gridcard" style={style}>
                                <h4>
                                    <strong>Anomalia Prec. ultimi 90gg (%)</strong>
                                </h4>
                                <a href="../../assets/img/Anomalia_Prec_ultimi_99gg.png" target="_blank">
                                    <img className="img-fluid" src="../../assets/img/Anomalia_Prec_ultimi_99gg.png" alt="FFWI"/>
                                </a>
                            </Thumbnail>
                        </Col>
                        <Col sm={3}>
                            <Thumbnail className="gridcard" style={style}>
                                <h4>
                                    <strong>Anomalia Prec. Bilancio Idrico dal 1 ottobre(%)</strong>
                                </h4>
                                <a href="../../assets/img/Anomalia_Prec_bilancioidrico.png" target="_blank">
                                    <img className="img-fluid" src="../../assets/img/Anomalia_Prec_bilancioidrico.png" alt="FFWI"/>
                                </a>
                            </Thumbnail>
                        </Col>
                        <Col sm={3}>
                            <Thumbnail className="gridcard" style={style}>
                                <h4>
                                    <strong>Anomalia Temperatura ultimi 30 gg (°C)</strong>
                                </h4>
                                <a href="../../assets/img/Anomalia_Tmed_ultimi_30gg.png" target="_blank">
                                    <img className="img-fluid" src="../../assets/img/Anomalia_Tmed_ultimi_30gg.png" alt="FFWI"/>
                                </a>
                            </Thumbnail>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
});

const HomeMapsAitPlugin = connect()(HomeMapsAit);

module.exports = {
    HomeMapsAitPlugin: assign(HomeMapsAitPlugin, {
        GridContainer: {
            id: 'homeMapsAitPlugin',
            name: 'homeMapsAitPlugin',
            tool: true,
            position: 1,
            priority: 1
        }
    }),
    reducers: {}
};
