import {Fragment, useState} from 'react';

function Clock() {
    //  Set our time formatting options
    const options = {
        hour12 : true,
        hour:  "numeric",
        minute: "numeric"
     }

    //  Set the initial time
    const time = new Date().toLocaleTimeString("en-US", options).toLocaleLowerCase();

    //  Setup the useState hook and pass the initial time
    const [currentTime, setCurrentTime] = useState(time);

    //  Updates state with the current time
    function getTime() {
        const time = new Date().toLocaleTimeString("en-US", options).toLocaleLowerCase();
        setCurrentTime(time);
    }

    //  Call getTime every second, to update the time state
    setInterval(getTime, 1000);

    //  Render the current time
    return (
        <Fragment>
            {currentTime}            
        </Fragment>
    );
}

export default Clock;
