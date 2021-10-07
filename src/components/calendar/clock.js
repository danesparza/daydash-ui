import {Fragment, useState, useEffect} from 'react';

function Clock() {
    //  Set our time formatting options
    const options = {
        hour12 : true,
        hour:  "numeric",
        minute: "numeric"
     }    

    //  Setup the useState hook and pass the initial time
    const [currentTime, setCurrentTime] = useState(new Date());

    //  Updates state with the current time
    function getTime() {
        setCurrentTime(new Date());
    }

    useEffect(() => {
        const timerId = setInterval(getTime, 1000);
        return function cleanup() {
          clearInterval(timerId);
        };
      }, []);

    //  Render the current time
    return (
        <Fragment>
            {currentTime.toLocaleTimeString("en-US", options).toLocaleLowerCase()}            
        </Fragment>
    );
}

export default Clock;
