import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import '../App.css';
import ModalJuego from './ModalJuego';
import BarritaPorcentaje from './BarritaPorcentaje';

const Juego = () => {

    //Persistencia - LocalStorage
    let numeroPaisGuardado = JSON.parse(localStorage.getItem('numeroPais'));
    if (!numeroPaisGuardado) {
        numeroPaisGuardado = 0
    }

    let respuestasAcertadasGuardado = JSON.parse(localStorage.getItem('respuestasAcertadas'));
    if (!respuestasAcertadasGuardado) {
        respuestasAcertadasGuardado = 0
    }

    let barritaPorcentajeGuardado = JSON.parse(localStorage.getItem('barritaPorcentaje'));
    if (!barritaPorcentajeGuardado) {
        barritaPorcentajeGuardado = 8.3333333333
    }

    // MODAL
    const [modalShow, setModalShow] = React.useState(false);
    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);

    // HOOKS

    const numeroParaAumentarBarrita = 8.3333333333;

    //hook barritaPorcentaje
    const [barritaPorcentaje, editarBarritaPorcentaje] = useState(barritaPorcentajeGuardado)

    //hook respuestasAcertadas
    const [respuestasAcertadas, editarRespuestasAcertadas] = useState(respuestasAcertadasGuardado);

    //hook por que pais estamos
    const [numeroPais, editarNumeroPais] = useState(numeroPaisGuardado);

    //hook nombre de los paises
    const [nombreApiPaises, editarNombrePais] = useState("");

    //FORM
    const [respuestaUsuario, editarRespuestaUsuario] = useState("");

    //hook url
    const [urlPais2, editarUrlPais2] = useState(null);

    //hook bandera pais actual
    const [banderaPais, editarBanderaPais] = useState(null);

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/region/South%20America")
            .then((response) => response.json())
            .then((urlPais2) => {
                editarUrlPais2(urlPais2);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (urlPais2) {
            editarBanderaPais(urlPais2[numeroPais].flags.png);
            editarNombrePais(urlPais2[numeroPais].name.common);
            console.log(urlPais2)
        }
    }, [urlPais2, numeroPais]);

    useEffect(() => {
        if (numeroPais) {
            localStorage.setItem('numeroPais', JSON.stringify(numeroPais));
        } else {
            localStorage.setItem('numeroPais', JSON.stringify(0));
        }
        if (respuestasAcertadas) {
            localStorage.setItem('respuestasAcertadas', JSON.stringify(respuestasAcertadas));
        } else {
            localStorage.setItem('respuestasAcertadas', JSON.stringify(0));
        }
        if (barritaPorcentaje) {
            localStorage.setItem('barritaPorcentaje', JSON.stringify(barritaPorcentaje));
        } else {
            localStorage.setItem('barritaPorcentaje', JSON.stringify(0));
        }
    }, [numeroPais, respuestasAcertadas, barritaPorcentaje]);

    // FUNCIONES

    const resetGame = () => {
        editarNumeroPais(0);
        editarRespuestasAcertadas(0);
        editarBarritaPorcentaje(8.3333333333);
    };

    const cambiarNumeroPais = () => {
        let numeroAPoner = undefined;
        if (numeroPais === 4 || numeroPais === 7) {
            numeroAPoner = numeroPais + 2;
        } else {
            numeroAPoner = numeroPais + 1;
        }
        editarNumeroPais (numeroAPoner);
    };

    const handleChange = (e) => {
        editarRespuestaUsuario(e.target.value);
    };

    const submitForm = (e) => {
        if (numeroPais === 13) {
            e.preventDefault();
            laRespuestaEsCorrecta(respuestaUsuario);
            handleShow();
        }
        else {
            e.preventDefault();
            if (numeroPais < 13) {
                laRespuestaEsCorrecta(respuestaUsuario);
                cambiarNumeroPais();
                editarBarritaPorcentaje(barritaPorcentaje + numeroParaAumentarBarrita)
            }
            editarRespuestaUsuario("");
        }
    };

    const laRespuestaEsCorrecta = (respuestaUsuario) => {
        if (respuestaUsuario.toLowerCase().trim() === nombreApiPaises.toLowerCase().trim()) {
            console.log(nombreApiPaises)
            const numeroAPoner = respuestasAcertadas + 1;
            editarRespuestasAcertadas(numeroAPoner);
        }
    };

    return (

        <div className='container pt-4'>
            <div className=' row text-center pt-4 '>

                <div className='col-6 d-flex flex-column align-items-center  pb-5'>
                    <img className="rounded border border-2 border-dark imagenBandera" src={banderaPais} alt="Bandera de pais" height={200} width={400} ></img>
                </div>

                <Form onSubmit={submitForm} className='col-6 formularioResponsive d-flex flex-column align-items-center justify-content-center'>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            name="pais"
                            onChange={handleChange}
                            placeholder="Nombre del pais"
                            value={respuestaUsuario}
                        />
                    </Form.Group>
                    <Button
                        className='mt-3'
                        variant="primary"
                        type="button"
                        onClick={submitForm}
                    >
                        Enviar respuesta
                    </Button>
                </Form>
            </div>

            <BarritaPorcentaje
                barritaPorcentaje={barritaPorcentaje}
            />

            <ModalJuego
                show={modalShow}
                handleClose={handleClose}
                respuestasAcertadas={respuestasAcertadas}
                resetGame={resetGame}
            />

        </div >

    );
}

export default Juego;