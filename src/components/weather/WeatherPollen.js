import Rainbow from 'rainbowvis.js';

function WeatherPollen(props) {
    //  Get the color we need, based on the passed temperature
    const pollenCount = props.count || 0;

    //  Create a new spectrum:
    let rainbow = new Rainbow();

    //  Set our spectrum colors:
    rainbow.setNumberRange(0, 12);

    rainbow.setSpectrum("999999", "006400", "E0E200", "FF8E00", "FF0000");

    //  Get the color for the given temperature:
    const tempColor = "#" + rainbow.colorAt(pollenCount);    
    
    //  Format the returned item
    return (
        <div className='weatherWeekPollen' style={{ backgroundColor: tempColor }}>Pollen: {pollenCount}</div>
    );
}

export default WeatherPollen;