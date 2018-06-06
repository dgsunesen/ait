/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');
const {Grid, Row, Col, Thumbnail} = require('react-bootstrap');
const ModalMapsAit = require('./homemapsait/ModalMapsAit');
const {clickThumbnail} = require('../actions/home');
const {connect} = require('react-redux');
const assign = require('object-assign');

const style = {
    maxWidth: "100%",
    overflow: "hidden",
    cursor: "pointer"
};

const HomeMapsAit = React.createClass({
    propTypes: {
        id: React.PropTypes.string,
        showModal: React.PropTypes.bool,
        imgSrc: React.PropTypes.string,
        onClickThumbnail: React.PropTypes.func,
        modalOptions: React.PropTypes.object
    },
    getDefaultProps() {
        return {
            showModal: false,
            imgSrc: "",
            onClickThumbnail: () => {},
            modalOptions: {}
        };
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
                                <a onClick={() => this.props.onClickThumbnail(true, "http://geoportale.lamma.rete.toscana.it/assets/img/Prec_ultimi_30gg.png")}>
                                    <ModalMapsAit
                                        title={"Cumulato Precipitazione ultimi 30 gg (mm)"}
                                        modalOptions={this.props.modalOptions}
                                        showModal={this.props.showModal}
                                        onClickThumbnail={this.props.onClickThumbnail}
                                        imgSrc={this.props.imgSrc}/>
                                    <img className="img-fluid" src="http://geoportale.lamma.rete.toscana.it/assets/img/Prec_ultimi_30gg.png" alt="FFWI"/>
                                </a>
                            </Thumbnail>
                        </Col>
                        <Col sm={3}>
                            <Thumbnail className="gridcard" style={style}>
                                <h4>
                                    <strong>Anomalia Prec. ultimi 90gg (%)</strong>
                                </h4>
                                <a onClick={() => this.props.onClickThumbnail(true, "http://geoportale.lamma.rete.toscana.it/assets/img/Anomalia_Prec_ultimi_90gg.png")}>
                                    <ModalMapsAit
                                        title={"Anomalia Prec. ultimi 90gg (%)"}
                                        modalOptions={this.props.modalOptions}
                                        showModal={this.props.showModal}
                                        onClickThumbnail={this.props.onClickThumbnail}
                                        imgSrc={this.props.imgSrc}/>
                                    <img className="img-fluid" src="http://geoportale.lamma.rete.toscana.it/assets/img/Anomalia_Prec_ultimi_90gg.png" alt="FFWI"/>
                                </a>
                            </Thumbnail>
                        </Col>
                        <Col sm={3}>
                            <Thumbnail className="gridcard" style={style}>
                                <h4>
                                    <strong>Anomalia Prec. dal 1 ottobre(%)</strong>
                                </h4>
                                <a onClick={() => this.props.onClickThumbnail(true, "http://geoportale.lamma.rete.toscana.it/assets/img/Anomalia_Prec_bilancioidrico.png")}>
                                    <ModalMapsAit
                                        title={"Anomalia Prec. Bilancio Idrico dal 1 ottobre(%)"}
                                        modalOptions={this.props.modalOptions}
                                        showModal={this.props.showModal}
                                        onClickThumbnail={this.props.onClickThumbnail}
                                        imgSrc={this.props.imgSrc}/>
                                    <img className="img-fluid" src="http://geoportale.lamma.rete.toscana.it/assets/img/Anomalia_Prec_bilancioidrico.png" alt="FFWI"/>
                                </a>
                            </Thumbnail>
                        </Col>
                        <Col sm={3}>
                            <Thumbnail className="gridcard" style={style}>
                                <h4>
                                    <strong>Anomalia Temperatura ultimi 30 gg (°C)</strong>
                                </h4>
                                <a onClick={() => this.props.onClickThumbnail(true, "http://geoportale.lamma.rete.toscana.it/assets/img/Anomalia_Tmed_ultimi_30gg.png")}>
                                    <ModalMapsAit
                                        title={"Anomalia Temperatura ultimi 30 gg (°C)"}
                                        modalOptions={this.props.modalOptions}
                                        showModal={this.props.showModal}
                                        onClickThumbnail={this.props.onClickThumbnail}
                                        imgSrc={this.props.imgSrc}/>
                                    <img className="img-fluid" src="http://geoportale.lamma.rete.toscana.it/assets/img/Anomalia_Tmed_ultimi_30gg.png" alt="FFWI"/>
                                </a>
                            </Thumbnail>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
});

const HomeMapsAitPlugin = connect((state) => ({
    showModal: state.home && state.home.showModal || false,
    imgSrc: state.home && state.home.imgSrc || ""
}), {
    onClickThumbnail: clickThumbnail
})(HomeMapsAit);

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
    reducers: {
        home: require('../reducers/home')
    }
};
