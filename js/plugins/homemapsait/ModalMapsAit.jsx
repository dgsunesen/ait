import React, { PropTypes } from 'react';
const Modal = require('../../../MapStore2/web/client/components/misc/Modal');
const {Button} = require('react-bootstrap');

const ModalMapsAit = (props) => {
    return (
        <div>
            <Modal {...props.modalOptions} onHide={() => props.onClickThumbnail(false)} show={props.showModal} style={{marginTop: "-100px"}} bsSize="large" container={document.getElementById("body")}>
                <Modal.Body >
                    <div style={{textAlign: "center"}}>
                        <img src={props.imgSrc} style={{width: "80%"}}/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsSize="small" style={{"float": "right"}} bsStyle="primary" onClick={() => props.onClickThumbnail(false)}>Chiudi</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

ModalMapsAit.propTypes = {
    title: PropTypes.string.isRequired,
    modalOptions: PropTypes.object.isRequired,
    showModal: PropTypes.bool.isRequired,
    onClickThumbnail: PropTypes.func.isRequired,
    imgSrc: PropTypes.string.isRequired
};

ModalMapsAit.defaultProps = {
    modalOptions: {}
};
module.exports = ModalMapsAit;
