/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const moment = require('moment');

const Api = {
    calculateDateFromKey(key, toData) {
        let date = {};
        // let momentData1 = moment(toData).clone().format('YYYY-MM');
        // let momentData2 = moment().clone().subtract(1, 'day').format('YYYY-MM');
        // if (momentData1 === momentData2) {
        //     date.toData = moment().clone().subtract(1, 'day').format('YYYY-MM-DD');
        // } else {
        //     date.toData = moment(toData).clone().endOf('month').format('YYYY-MM-DD');
        // }
        date.toData = moment(toData).clone().format('YYYY-MM-DD');

        if (key === "1") {
            // date.fromData = moment(toData).clone().subtract(1, 'month').startOf('month').format('YYYY-MM-DD');
            // date.fromData = moment(toData).clone().startOf('month').format('YYYY-MM-DD');
            date.fromData = moment(toData).clone().subtract(1, 'month').format('YYYY-MM-DD');
        } else if (key === "2") {
            // date.fromData = moment(toData).clone().subtract(3, 'month').startOf('month').format('YYYY-MM-DD');
            date.fromData = moment(toData).clone().subtract(3, 'month').format('YYYY-MM-DD');
            // date.fromData = moment(toData).clone().startOf('month').format('YYYY-MM-DD');
        } else if (key === "3") {
            date.fromData = moment(toData).clone().subtract(6, 'month').format('YYYY-MM-DD');
            // date.fromData = moment(toData).clone().subtract(6, 'month').startOf('month').format('YYYY-MM-DD');
            // date.fromData = moment(toData).clone().startOf('month').format('YYYY-MM-DD');
        } else {
            date.fromData = moment(toData).clone().startOf('year').subtract(3, 'month').startOf('month').format('YYYY-MM-DD');
        }
        return date;
    }
};

module.exports = Api;
