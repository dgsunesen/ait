/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');
const {Label, Button, Glyphicon} = require('react-bootstrap');
const Message = require('../../MapStore2/web/client/components/I18N/Message');
const {updateSettings, updateNode} = require('../../MapStore2/web/client/actions/layers');
const DateTimePicker = require('react-widgets').DateTimePicker;
const {compose} = require('redux');
const {changeDate, changeDatePlus, changeDateMinus} = require('../actions/home');
const {connect} = require('react-redux');
const assign = require('object-assign');
const moment = require('moment');

const ChangeDate = React.createClass({
    propTypes: {
        style: React.PropTypes.object,
        id: React.PropTypes.string,
        className: React.PropTypes.object,
        date: React.PropTypes.instanceOf(Date),
        plusButtonDisabled: React.PropTypes.bool,
        minusButtonDisabled: React.PropTypes.bool,
        onChangeDate: React.PropTypes.func,
        onChangeDateMinus: React.PropTypes.func,
        onChangeDatePlus: React.PropTypes.func,
        onUpdateSettings: React.PropTypes.func,
        onUpdateNode: React.PropTypes.func,
        settings: React.PropTypes.object,
        layers: React.PropTypes.object
    },
    getDefaultProps() {
        return {
            date: new Date('1995-01-01'),
            plusButtonDisabled: false,
            minusButtonDisabled: false,
            onChangeDate: () => {},
            onUpdateSettings: () => {},
            onChangeDateMinus: () => {},
            onChangeDatePlus: () => {}
        };
    },
    componentWillReceiveProps(nextProps) {
        if (this.props.id === "mapstore-changedate-map") {
            if (this.props.date.getTime() !== nextProps.date.getTime()) {
                this.updateParams({params: {data: moment(nextProps.date).format('YYYY-MM-DD')}});
                // this.updateParams({params: {data: moment(nextProps.date).format('YYYY-MM-DD'), map: "spazializzazioni"}});
            }
        }
    },
    render() {
        return (
            <div id={this.props.id}>
                <Label><Message msgId="manager.date_picker"/></Label>
                <div className="center">
                    <p></p>
                    <div className="input-group">
                        <span className="input-group-btn">
                            <Button
                                onClick={() => this.props.onChangeDateMinus(new Date(this.props.date))}
                                bsStyle="danger"
                                disabled={this.props.minusButtonDisabled}>
                                <Glyphicon glyph="glyphicon glyphicon-minus" />
                            </Button>
                        </span>

                        <DateTimePicker
                        time={false}
                        min={new Date("1995-01-01")}
                        max={moment().subtract(1, 'day')._d}
                        format={"YYYY-MM-DD"}
                        value={new Date(this.props.date)}
                        onChange={this.props.onChangeDate}/>

                        <span className="input-group-btn">
                            <Button
                                onClick={() => this.props.onChangeDatePlus(new Date(this.props.date))}
                                bsStyle="success"
                                disabled={this.props.plusButtonDisabled}>
                                <Glyphicon glyph="glyphicon glyphicon-plus" />
                            </Button>
                        </span>
                    </div>
                    <p></p>
                </div>
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

const ChangeDatePlugin = connect((state) => ({
    date: state.home && state.home.date || new Date('1995-01-01'),
    plusButtonDisabled: state.home && state.home.plusButtonDisabled || false,
    minusButtonDisabled: state.home && state.home.minusButtonDisabled || false,
    settings: state.layers && state.layers.settings || {expanded: false, options: {opacity: 1}},
    layers: state.layers || {}
}), {
    onChangeDate: compose(changeDate, (event) => event),
    onChangeDatePlus: compose(changeDatePlus, (event) => event),
    onChangeDateMinus: compose(changeDateMinus, (event) => event),
    onUpdateSettings: updateSettings,
    onUpdateNode: updateNode
})(ChangeDate);

module.exports = {
    ChangeDatePlugin: assign(ChangeDatePlugin, {
        GridContainer: {
            id: 'changeDate',
            name: 'changeDate',
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
