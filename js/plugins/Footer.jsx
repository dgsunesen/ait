/**
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');
const src = require("./attribution/logo_bianco.png");
require('./footer/footer.css');

const Footer = React.createClass({
    render() {
        return (
            <div className="ms-footer">
            <div><a target="_blank" href="http://www.autoritaidrica.toscana.it/"> <img src={src} width="240" title="Autorità Idrica Toscana" alt="Autorità Idrica Toscana" /></a> <br/><br/></div>
                Autorità Idrica Toscana <br/> Casella Postale n. 1485 U.P. Firenze, 7,  Via Pietrapiana, 53 - 50121 Firenze <br/>  Sede legale: Via Verdi n. 16 (primo piano), Firenze <br/>
                Email: info@autoritaidrica.toscana.it | Tel 055 263291 | Fax 055 2632940
            </div>
        );
    }
});

module.exports = {
    FooterPlugin: Footer
};
