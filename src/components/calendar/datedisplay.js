import {Fragment, useState} from 'react';

function DateDisplay() {
    //  Set our date formatting options
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };

    //  Set the initial date
    const date = new Date().toLocaleDateString("en-US", options);

    //  Setup the useState hook and pass the initial date
    const [currentDate, setCurrentDate] = useState(date);

    //  Updates state with the current date
    function getDate() {
        const date = new Date().toLocaleDateString("en-US", options);
        setCurrentDate(date);
    }

    //  Call getDate every second, to update the date state
    setInterval(getDate, 1000);

    //  Render the current date
    return (
        <Fragment>
            {currentDate}            
        </Fragment>
    );
}

export default DateDisplay;