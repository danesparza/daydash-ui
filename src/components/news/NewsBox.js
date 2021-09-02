import React from "react";

//  Components
import NewsItem from './NewsItem';
import QuakeItem from './QuakeItem';

function NewsBox(props) {
    
    //  Our date comparitor for earthquake information
    let dtFourHoursAgo = new Date();    
    dtFourHoursAgo.setTime(dtFourHoursAgo.getTime() + (-4*60*60*1000)); // Find four hours ago

    //  Get the earthquake information for quakes in the last 4 hours
    const quakeFeatures = props.quakes.features.filter((item) => new Date(item.properties.time) > dtFourHoursAgo); // Find quakes that happened in the last 4 hours
    const quakeItems = quakeFeatures.slice(0,1).map((item) => <QuakeItem item={item} key={item.id}/>);  // Get the most recent quake

    //  Get the collection of NewsItem elements from the prop.news array
    const twitterItems = props.news.items.slice(0,6).map((item) =>  <NewsItem item={item} key={item.id}/>);        

    let newsItems = [];
    newsItems.push(...quakeItems);
    newsItems.push(...twitterItems);

    //  Render the current time
    return (
        <React.Fragment>            
          {newsItems}
        </React.Fragment>
    );
}

export default NewsBox;