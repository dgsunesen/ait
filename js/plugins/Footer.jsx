/**
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');
const srcLamma = require("./attribution/logo-lamma-transp.png");
const srcCnr = require("./attribution/logo_cnr.png");
const srcRt = require("./attribution/logo_regione.png");
require('./footer/footer.css');

// const style = {
//     backgroundColor: "#4E791E",
//     borderTop: "1px solid #222B43",
//     textAlign: "center",
//     padding: "5px",
//     // paddingRight: "200px",
//     position: "fixed",
//     left: "0",
//     bottom: "0",
//     height: "60px",
//     width: "100%"
// };

// const phantom = {
//     position: "relative",
//     display: 'block',
//     height: '60px',
//     width: '100%'
// };

// <div style={phantom} />
// <div style={style}>

const Footer = React.createClass({
    render() {
        return (
            <div>
                <div className="ms-footer">
                    <a href="http://www.lamma.rete.toscana.it/" target="_blank"><img src={srcLamma} height="40px"/></a>
                    <a href="http://www.ibimet.cnr.it/" target="_blank"><img src={srcCnr} height="50px"/></a>
                    <a href="http://www.regione.toscana.it/" target="_blank"><img src={srcRt} height="50px"/></a>
                    <br/><br/>
                </div>
            </div>
        );
    }
});

// const Footer = React.createClass({
//     render() {
//         return (
//             <div>
//                 <div className="ms-footer">
//                     <a href="http://www.lamma.rete.toscana.it/" target="_blank"><img src={srcLamma}/></a>
//                     <a href="http://www.ibimet.cnr.it/" target="_blank"><img src={srcCnr}/></a>
//                     <a href="http://www.regione.toscana.it/" target="_blank"><img src={srcRt}/></a>
//                     <br/><br/>
//                 </div>
//             </div>
//         );
//     }
// });

module.exports = {
    FooterPlugin: Footer
};
