/**
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const CustomizedLabel = React.createClass({
    propTypes: {
        x: React.PropTypes.func,
        y: React.PropTypes.func,
        stroke: React.PropTypes.string,
        value: React.PropTypes.string
    },
    render() {
        const {x, y, stroke, value} = this.props;
        return <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{value}</text>;
    }
});

module.exports = CustomizedLabel;
