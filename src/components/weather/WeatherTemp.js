import Rainbow from 'rainbowvis.js';

function WeatherTemp(props) {
    //  Get the color we need, based on the passed temperature
    const temperature = props.temperature || 0;

    //  Create a new spectrum:
    let rainbow = new Rainbow();

    //  Set our spectrum colors:
    rainbow.setSpectrum("FFC0E4", "D0338D", "33D0C4", "337DD0", "33D035", "DAD82D", "F08E00", "D03333");

    //  Get the color for the given temperature:
    const tempColor = "#" + rainbow.colorAt(temperature);    
    
    //  Format the returned item
    return (
        <span style={{ color: tempColor }}>{temperature}&deg;</span>
    );
}

export default WeatherTemp;