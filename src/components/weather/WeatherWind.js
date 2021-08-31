import {Fragment} from 'react';

function WeatherWind(props) {

    //  Format the wind direction
    let fmtDirection = "";
    if(props.direction > 0){ fmtDirection = "N";}
    if(props.direction > 30){ fmtDirection = "NE";}
    if(props.direction > 60){ fmtDirection = "E";}
    if(props.direction > 120){ fmtDirection = "SE";}
    if(props.direction > 150){ fmtDirection = "S";}
    if(props.direction > 210){ fmtDirection = "SW";}
    if(props.direction > 240){ fmtDirection = "W";}
    if(props.direction > 300){ fmtDirection = "NW";}
    if(props.direction > 330){ fmtDirection = "N";}

    return(
        <Fragment>
           {props.speed}mph {fmtDirection}
        </Fragment>        
    );
}

export default WeatherWind;