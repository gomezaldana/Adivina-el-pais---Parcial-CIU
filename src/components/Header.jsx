import React from 'react';
import giftMundo from '../imagenes/globe.gif.webp'
const Header = () => {
    return (
        <div className='header shadow-lg d-flex justify-content-center pt-2 pb-2 colorTituloH1'>
            <img className='' src={giftMundo} alt='Imagen del mundo'height={150}></img>
            <h1 className='mt-5'>ADIVINA EL PAIS</h1>
        </div>
    );
}

export default Header; 