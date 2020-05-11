import React from 'react';
import App from '../App';



const Weather = (props) =>{

    return(

    <div className="container">
      <div className="cards pt-4">
    <h1>{props.city}, {props.country}</h1>
         <h5 className="py-4">
             <i className={`wi ${props.weathericon} display-1`}></i>
         </h5>
         <h1 className="py-2">{props.temp_celsius}</h1>

         {/**show max and min temperature */}
         {minmaxTemp(props.temp_min, props.temp_max)}

         <h4 className="py-3">
             {props.description}
         </h4>
      </div>        
    </div>
    )
}

function minmaxTemp(min,max){
    return (
      <h3>
        <span className="px-4">{min}&deg;</span>
        <span className="px-4">{min}&deg;</span>
      </h3>
    );
}

export default Weather;