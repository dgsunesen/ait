/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CustomTooltip = React.createClass({
    propTypes: {
        type: React.PropTypes.string,
        payload: React.PropTypes.array,
        label: React.PropTypes.string,
        active: React.PropTypes.bool
    },
    render() {
        const {active} = this.props;

        if (active) {
            const { payload} = this.props;
            return (
                <div>
                    <div className="custom-tooltip">
                        <p className="label" style={{color: "#8884d8"}}>{Math.abs(payload[1].value)}</p>
                    </div>
                    <div className="custom-tooltip">
                        <p className="label" style={{color: "#FF0000"}}>{Math.abs(payload[0].value)}</p>
                    </div>
                </div>
            );
        }
        return null;
    }
});

module.exports = CustomTooltip;
