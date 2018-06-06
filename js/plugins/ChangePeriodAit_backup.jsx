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
const {changeYear, changeMonth, changePeriod} = require('../actions/home');
const DateAPI = require('../utils/ManageDateUtils');
const {connect} = require('react-redux');
const assign = require('object-assign');
const moment = require('moment');

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
        hidrologicYear: React.PropTypes.string,
        hidrologicYears: React.PropTypes.array,
        startMonth: React.PropTypes.string,
        startMonths: React.PropTypes.array
    },
    getDefaultProps() {
        return {
            fromData: new Date(DateAPI.calculateDateFromKey(1).fromData),
            toData: new Date(DateAPI.calculateDateFromKey(1).toData),
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
            hidrologicYears: [
                { key: "2016", label: "2016" }
            ],
            hidrologicYear: "2016",
            startMonths: [
                { key: "january", label: "Gennaio" },
                { key: "february", label: "Febbraio" },
                { key: "march", label: "Marzo" },
                { key: "april", label: "Aprile" },
                { key: "may", label: "Maggio" },
                { key: "june", label: "Giugno" },
                { key: "july", label: "Luglio" },
                { key: "august", label: "Agosto" },
                { key: "september", label: "Settembre" },
                { key: "october", label: "Ottobre" },
                { key: "november", label: "Novembre" },
                { key: "december", label: "Dicembre" }
            ],
            startMonth: "january"
        };
    },
    componentWillReceiveProps(nextProps) {
        if (this.props.id === "mapstore-changedate-map") {
            if (this.props.fromData.getTime() !== nextProps.fromData.getTime()) {
                this.updateParams({params: {fromData: moment(nextProps.fromData).format('YYYY-MM-DD'), toData: moment(nextProps.toData).format('YYYY-MM-DD')}});
            }
        }
    },
    render() {
        return (
            <div id={this.props.id}>
                <Grid>
                  <Row className="show-grid">
                    <Col sm={4}>
                        <Label><Message msgId="aitapp.selectDateHidrologicYear"/></Label>
                            <DateTimePicker
                            time={false}
                            min={new Date("2016-01-01")}
                            max={moment().subtract(1, 'day')._d}
                            format={"YYYY"}
                            value={new Date("2016")}
                            onChange={this.props.onChangeYear}/>
                    </Col>
                    <Col sm={4}>
                        <Label><Message msgId="aitapp.selectCumulativeStartMonth"/></Label>
                        <FormGroup bsSize="lg">
                            <FormControl value={this.props.startMonth} componentClass="select" ref="startMonth" onChange={this.props.onChangeMonth}>
                                {this.props.startMonths.map(type => <option value={type.key} key={type.key}>{type.label}</option>)}
                            </FormControl>
                        </FormGroup>
                    </Col>
                    <Col sm={4}>
                        <Label><Message msgId="aitapp.selectCumulativePeriod"/></Label>
                        <FormGroup bsSize="lg">
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
    hidrologicYear: state.home && state.home.hidrologicYear || "2016",
    hidrologicYears: state.home && state.home.hidrologicYears || [{ key: "2016", label: "2016" }],
    startMonth: state.home && state.home.startMonth || "january",
    startMonths: state.home && state.home.startMonths || [
        { key: "january", label: "Gennaio" },
        { key: "february", label: "Febbraio" },
        { key: "march", label: "Marzo" },
        { key: "april", label: "Aprile" },
        { key: "may", label: "Maggio" },
        { key: "june", label: "Giugno" },
        { key: "july", label: "Luglio" },
        { key: "august", label: "Agosto" },
        { key: "september", label: "Settembre" },
        { key: "october", label: "Ottobre" },
        { key: "november", label: "Novembre" },
        { key: "december", label: "Dicembre" }
    ],
    settings: state.layers && state.layers.settings || {expanded: false, options: {opacity: 1}},
    layers: state.layers || {}
}), {
    onChangeYear: compose(changeYear, (event) => event.target.value),
    onChangeMonth: compose(changeMonth, (event) => event.target.value),
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
