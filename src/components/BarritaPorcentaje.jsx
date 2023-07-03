import React from 'react';

const BarritaPorcentaje = ({barritaPorcentaje}) => {
    
    return (
        <div className='pt-3 col-12 barraResponsive'>
            <div className="progress">
                <div className="progress-bar bg-warning progress-bar-striped" role="progressbar" style={{ width: barritaPorcentaje.toString() + "%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </div>
    );
}

export default BarritaPorcentaje;