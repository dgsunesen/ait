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

        // The selected DATE from the users
        date.toData = moment(toData).clone().format('YYYY-MM-DD');

        // const year = moment(toData).clone().format('YYYY-MM-DD');
        if (key === "1") {
            date.fromData = moment(toData).clone().subtract(1, 'month').format('YYYY-MM-DD');
        } else if (key === "2") {
            date.fromData = moment(toData).clone().subtract(3, 'month').format('YYYY-MM-DD');
        } else if (key === "3") {
            date.fromData = moment(toData).clone().subtract(6, 'month').format('YYYY-MM-DD');
        } else {
            // se la data selezionata è minore del 1 ottobre dello stesso anno
            const currentYear = moment(date.toData).format('YYYY');
            const currentToData = moment().clone().format(currentYear + "-10-01");
            if (date.toData < currentToData) {
                if (moment(toData).clone().format('YYYY') < currentYear) {
                    date.fromData = moment(toData).clone().endOf('year').subtract(2, 'month').startOf('month').format('YYYY-MM-DD');
                } else {
                    date.fromData = moment(toData).clone().subtract(1, 'year').endOf('year').subtract(2, 'month').startOf('month').format('YYYY-MM-DD');
                }
            } else {
                date.fromData = moment(toData).clone().endOf('year').subtract(2, 'month').startOf('month').format('YYYY-MM-DD');
            }
        }
        return date;
    },
    setAITMapFile(fromData, toData) {
        const fromDataMoment = moment(fromData);
        const toDataMoment = moment(toData);
        const duration = toDataMoment.diff(fromDataMoment, 'days');
        if (duration > 31 && duration <= 70) {
            return "ait3.map";
        } else if (duration > 70 && duration <= 190) {
            return "ait6.map";
        } else if (duration > 190) {
            return "ait12.map";
        }
        return "ait.map";
    }
};

module.exports = Api;
