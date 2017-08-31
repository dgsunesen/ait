/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = require('recharts');
// const ElevationChartTooltip = require('./ElevationChartTooltip');

module.exports = React.createClass({
    propTypes: {
        chartData: React.PropTypes.array,
        chartStyle: React.PropTypes.object,
        animated: React.PropTypes.bool
    },
    getDefaultProps() {
        return {
            chartData: [],
            chartStyle: {
                margin: {
                    top: 5,
                    right: 5,
                    left: 5,
                    bottom: 5
                },
                width: 850,
                height: 300
            },
            animated: true
        };
    },
    renderAreaChart() {
        return (
            <div>
            <AreaChart margin={this.props.chartStyle.margin} width={this.props.chartStyle.width} height={this.props.chartStyle.height} data={this.formatData(this.props.chartData)}>
                <XAxis
                    hide={false}
                    dataKey="name"
                    tickCount={20}/>
                <YAxis
                    hide={false}/>
                <Tooltip />
                <Legend />
                <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={true}/>
                <defs>
                    <linearGradient id="st_value_clima" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF0000" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#FF0000" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="st_value" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <Area
                    isAnimationActive={this.props.animated}
                    type="monotone"
                    dataKey="st_value_clima"
                    stroke="#FF0000"
                    fill="#FF0000"
                    fillOpacity={1}
                    fill="url(#st_value_clima)"
                    activeDot={{r: 8}}/>
                <Area
                    isAnimationActive={this.props.animated}
                    type="monotone"
                    dataKey="st_value"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={1}
                    fill="url(#st_value)"
                    activeDot={{r: 8}}/>
            </AreaChart>
        </div>
        );
    },
    render() {
        return (
            <div>
                {this.renderAreaChart()}
            </div>
        );
    },
    formatData(values) {
        let data = [];
        let cum = 0;
        let cumClima = 0;
        values.forEach(function(o) {
            cum += o.st_value;
            cumClima += o.st_value_clima;
            data.push(
                {
                    "name": o.data.substring(0, 10),
                    "st_value": parseFloat(cum.toFixed(1)),
                    "st_value_clima": parseFloat(cumClima.toFixed(1))
                }
            );
        }, this);
        return data;
    }
});
