import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ModalJuego = ({ show, handleClose, respuestasAcertadas, resetGame }) => {

    const reiniciarElJuego = () => {
        resetGame();
        handleClose();
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
        >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body className=' d-flex flex-column align-items-center text-center'>
                <h4>Tu puntaje es</h4>
                <p className='fondoEstrella p-3'>{respuestasAcertadas}</p>
            </Modal.Body>
            <Modal.Footer className=' d-flex flex-column align-items-center'>
                <Button size="sm" variant="outline-primary" onClick={reiniciarElJuego}>Jugar de nuevo</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalJuego;