
function CalendarEvent(props) {
    //  Format the display
    const summary = props.event.summary;

    //  Get the start/end dates
    const startTime =  new Date(props.event.starttime * 1000);
    const endTime = new Date(props.event.endtime * 1000);
    
    //  Format the start/end dates
    const fmtStartTime = startTime.toLocaleTimeString("en-US", {hour12 : true, hour:  "numeric", minute: "numeric"}).toLocaleLowerCase();
    const fmtEndTime = endTime.toLocaleTimeString("en-US", {hour12 : true, hour:  "numeric", minute: "numeric"}).toLocaleLowerCase();
    let formattedTime = fmtStartTime + " - " + fmtEndTime;

    //  If we have an event that lasts > 23 hours, let's just call it "All day"
    let startEndDiff = Math.abs(endTime.getTime() - startTime.getTime()) / 3600000;
    if(startEndDiff > 23){
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