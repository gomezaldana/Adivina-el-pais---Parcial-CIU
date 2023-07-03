import React from 'react';

const Footer = () => {

    const fecha = new Date().getFullYear();

    return (
        <div className='pb-3 pt-4 shadow-lg mt-5'>
            <h5 className='text-center'>©{fecha}</h5>
        </div>);
}

export default Footer;