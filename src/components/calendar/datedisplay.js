import {Fragment, useState, useEffect} from 'react';

function DateDisplay() {
    //  Set our date formatting options
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };

    //  Setup the useState hook and pass the initial date
    const [currentDate, setCurrentDate] = useState(new Date());

    //  Updates state with the current date
    function getDate() {
        setCurrentDate(new Date());
    }

    useEffect(() => {
        const timerId = setInterval(getDate, 1000);
        return function cleanup() {
          clearInterval(timerId);
        };
      }, []);

    //  Render the current date
    return (
        <Fragment>
            {currentDate.toLocaleDateString("en-US", options)}            
        </Fragment>
    );
}

export default DateDisplay;