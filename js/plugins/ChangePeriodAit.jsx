/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');
const {Label, FormControl, FormGroup, Grid, Row, Col} = require('react-bootstrap');
const Message = require('../../MapStore2/web/client/components/I18N/Message');
const {updateSettings, updateNode} = require('../../MapStore2/web/client/actions/layers');
const DateTimePicker = require('react-widgets').DateTimePicker;
const {compose} = require('redux');
const {changeYear, changePeriod} = require('../actions/home');
const DateAPI = require('../utils/ManageDateUtils');
const {connect} = require('react-redux');
const assign = require('object-assign');
const moment = require('moment');
const momentLocaliser = require('../../node_modules/react-widgets/lib/localizers/moment');
momentLocaliser(moment);

moment().locale('it');
moment.updateLocale('it', {
    months: [
        "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio",
        "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
    ],
    weekdays: 'Domenica_Lunedì_Martedì_Mercoledì_Giovedì_Venerdì_Sabato'.split('_')
});

const ChangePeriodAit = React.createClass({
    propTypes: {
        style: React.PropTypes.object,
        id: React.PropTypes.string,
        className: React.PropTypes.object,
        fromData: React.PropTypes.instanceOf(Date),
        toData: React.PropTypes.instanceOf(Date),
        onChangeYear: React.PropTypes.func,
        onChangeMonth: React.PropTypes.func,
        onChangePeriod: React.PropTypes.func,
        onUpdateSettings: React.PropTypes.func,
        onUpdateNode: React.PropTypes.func,
        settings: React.PropTypes.object,
        layers: React.PropTypes.object,
        periodType: React.PropTypes.string,
        periodTypes: React.PropTypes.array,
        map: React.PropTypes.string
    },
    getDefaultProps() {
        return {
            fromData: new Date(DateAPI.calculateDateFromKey("1", moment().subtract(1, 'day')._d).fromData),
            toData: new Date(DateAPI.calculateDateFromKey("1", moment().subtract(1, 'day')._d).toData),
            onChangeYear: () => {},
            onChangeMonth: () => {},
            onChangePeriod: () => {},
            onUpdateSettings: () => {},
            periodTypes: [
                { key: "1", label: "1 Mese"},
                { key: "2", label: "3 Mesi"},
                { key: "3", label: "6 Mesi"},
                { key: "4", label: "dal 1° Ottobre"}
            ],
            periodType: "1",
            map: "ait.map"
        };
    },
    componentWillReceiveProps(nextProps) {
        if (this.props.id === "mapstore-changedate-map") {
            if (this.props.fromData.getTime() !== nextProps.fromData.getTime() || this.props.toData.getTime() !== nextProps.toData.getTime()) {
                const mapFile = DateAPI.setAITMapFile(nextProps.fromData, nextProps.toData);
                this.updateParams({params: {map: "/opt/ait/" + mapFile, fromData: moment(nextProps.fromData).format('YYYY-MM-DD'), toData: moment(nextProps.toData).format('YYYY-MM-DD')}});
            }
        }
    },
    render() {
        let colModel = this.props.id === "mapstore-changedate" ? {sm: 4, smOffset: 4, md: 4, mdOffset: 4} : {sm: 3, smOffset: 9, md: 4, mdOffset: 9};
        return (
            <div id={this.props.id}>
                <Grid >
                  <Row className="show-grid">
                    <Col sm={colModel.sm} smOffset={colModel.smOffset} md={colModel.md} mdOffset={colModel.mdOffset}>
                        <Label><Message msgId="aitapp.selectDateHidrologicYear"/></Label>
                            <DateTimePicker
                                time={false}
                                initialView={"month"}
                                finalView={"month"}
                                min={new Date("2016-10-01")}
                                max={moment().subtract(1, 'day')._d}
                                format={"DD MMMM, YYYY"}
                                editFormat={"YYYY-MM-DD"}
                                value={new Date(this.props.toData)}
                                footer={true}
                                onChange={this.props.onChangeYear}/>
                    </Col>
                  </Row>
                  <Row className="show-grid">
                    <Col sm={colModel.sm} smOffset={colModel.smOffset} md={colModel.md} mdOffset={colModel.mdOffset}>
                        <Label><Message msgId="aitapp.selectCumulativePeriod"/></Label>
                        <FormGroup bsSize="sm">
                            <FormControl value={this.props.periodType} componentClass="select" ref="periodType" onChange={this.props.onChangePeriod}>
                                {this.props.periodTypes.map(type => <option value={type.key} key={type.key}>{type.label}</option>)}
                            </FormControl>
                        </FormGroup>
                    </Col>
                  </Row>
                </Grid>
            </div>
        );
    },
    updateParams(newParams, onUpdateNode = true) {
        // let originalSettings = assign({}, this.state.originalSettings);
        // // TODO one level only storage of original settings for the moment
        // Object.keys(newParams).forEach((key) => {
        //     originalSettings[key] = this.state.initialState[key];
        // });
        // this.setState({originalSettings});
        this.props.onUpdateSettings(newParams);
        if (onUpdateNode) {
            this.props.layers.flat.map((layers) => {
                if (layers.group === "Variabili Meteo.Pioggia" || layers.group === "Variabili Meteo.Temperatura" || layers.group === "Layer di Base") {
                // if (layers.group === "Spazializzazioni" || layers.group === "Aree di allerta meteo" || layers.group === "Stazioni") {
                    this.props.onUpdateNode(
                        layers.id,
                        "layers",
                        assign({}, this.props.settings.props, newParams)
                    );
                }
            }, this);
        }
    }
});

const ChangePeriodAitPlugin = connect((state) => ({
    fromData: state.home && state.home.fromData || new Date('1995-01-01'),
    toData: state.home && state.home.toData || new Date('1995-01-01'),
    periodType: state.home && state.home.periodType || "1",
    periodTypes: state.home && state.home.periodTypes || [{ key: "1", label: "1 Mese"}, { key: "2", label: "3 Mesi"}, { key: "3", label: "6 Mesi"}, { key: "4", label: "dal 1° Ottobre"}],
    settings: state.layers && state.layers.settings || {expanded: false, options: {opacity: 1}},
    layers: state.layers || {}
}), {
    onChangeYear: compose(changeYear, (event) => event),
    onChangePeriod: compose(changePeriod, (event) => event.target.value),
    onUpdateSettings: updateSettings,
    onUpdateNode: updateNode
})(ChangePeriodAit);

module.exports = {
    ChangePeriodAitPlugin: assign(ChangePeriodAitPlugin, {
        GridContainer: {
            id: 'changePeriodAit',
            name: 'changePeriodAit',
            tool: true,
            position: 1,
            priority: 1
        }
    }),
    reducers: {
        home: require('../reducers/home'),
        layers: require('../../MapStore2/web/client/reducers/layers')
    }
};
