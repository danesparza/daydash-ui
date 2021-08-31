
function CalendarEvent(props) {
    //  Format the display
    const summary = props.event.summary;
    const startTime = new Date(props.event.starttime * 1000).toLocaleTimeString("en-US", {hour12 : true, hour:  "numeric", minute: "numeric"}).toLocaleLowerCase();
    const endTime = new Date(props.event.endtime * 1000).toLocaleTimeString("en-US", {hour12 : true, hour:  "numeric", minute: "numeric"}).toLocaleLowerCase();
    let formattedTime = startTime + " - " + endTime;
    if(startTime === endTime){
        formattedTime = "All day"; 
    }

    //  Return the calendar
    return(                        
            <tr>
                <td className="eventTime">{formattedTime}</td>
                <td>{summary}</td>
            </tr>                
    );
}

export default CalendarEvent;