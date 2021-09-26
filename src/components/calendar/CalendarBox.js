import CalendarEvent from "./CalendarEvent";
import SunCalc from "suncalc";

function CalendarBox(props) {
    //  Get the collection of calendar events
    const dtNow = new Date();
    
    let dtDaysEnd = new Date();
    dtDaysEnd.setHours(24,0,0,0); // The next 'midnight' (basically, at the end of today)

    //  Find out when sunrise / sunset is
    const latlong = props.config.location.split(",");
    const lat = parseFloat(latlong[0]);
    const long = parseFloat(latlong[1]);
    const suntimes = SunCalc.getTimes(dtNow, lat, long);
    
    //  Create a sunrise event
    const sunriseEvent = {
        uid: "" + suntimes.sunrise.getTime(),
        summary: "Sunrise ☀️⬆️",
        description: "",
        starttime: suntimes.sunrise.getTime() / 1000,
        endtime: suntimes.sunriseEnd.getTime() / 1000
    };

    //  Create a sunset event
    const sunsetEvent = {
        uid: "" + suntimes.sunsetStart.getTime(),
        summary: "Sunset ☀️⬇️",
        description: "",
        starttime: suntimes.sunsetStart.getTime() / 1000,
        endtime: suntimes.sunset.getTime() / 1000
    };

    // Get events that start before midnight tonight
    let todaysEvents = props.events.items.filter(item => new Date(item.starttime * 1000) < dtDaysEnd);  
    
    //  Add sunrise / sunset to the day's events
    todaysEvents.push(sunriseEvent);
    todaysEvents.push(sunsetEvent);
    
    //  Filter, sort and render our events
    const upcomingEvents = todaysEvents.filter(item => new Date(item.endtime * 1000) > dtNow); // Get events that end after right now
    upcomingEvents.sort((item1, item2) => item1.starttime - item2.starttime); // Sort the items by starttime (this way, all day events are first)
    let calendarEvents = upcomingEvents.map((item) =>  <CalendarEvent event={item} key={item.uid}/>); // Render the list of calendar event items

    //  If we don't have any events, display a message
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