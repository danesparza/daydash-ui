import React from "react";

//  Components
import NewsItem from './NewsItem';

function NewsBox(props) {

    //  Get the collection of NewsItem elements from the prop.news array
    const newsItems = props.news.items.slice(0,5).map((item) =>  <NewsItem item={item} key={item.id}/>);

    //  Render the current time
    return (
        <React.Fragment>            
          {newsItems}
        </React.Fragment>
    );
}

export default NewsBox;