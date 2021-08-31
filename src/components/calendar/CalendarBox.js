import CalendarEvent from "./CalendarEvent";

function CalendarBox(props) {
    //  Get the collection of calendar events
    const dtNow = new Date();
    const upcomingEvents = props.events.items.filter(item => new Date(item.endtime * 1000) > dtNow);
    let calendarEvents = upcomingEvents.map((item) =>  <CalendarEvent event={item} key={item.uid}/>);

    if(calendarEvents.length === 0){
        calendarEvents = (<tr><td colSpan="2">No events left today</td></tr>); 
    }

    //  Return the calendar
    return(
        <table className="table calendarTable is-fullwidth">
            <thead>
                <tr>
                <th>Time</th><th>Description</th>
                </tr>
            </thead>
            <tbody className="calendarBody">                
                {calendarEvents}
            </tbody>
        </table>
    );
}

export default CalendarBox;