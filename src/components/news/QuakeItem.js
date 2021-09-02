import React from "react";
import QRCode from 'qrcode.react';
import ago from 's-ago';

function QuakeItem(props) {

    //  Get the create time as a date
    const eventTime = new Date(props.item.properties.time);

    //  Format the item text
    const mag = props.item.properties.mag;
    const place = props.item.properties.place;
    let fmtText = `Magnitude ${mag} earthquake near ${place} reported`; 
    
    //  Format the item image url:
    const lat = props.item.geometry.coordinates[1];
    const long = props.item.geometry.coordinates[0];
    const fmtImageURL = `http://localhost:3010/v1/image/map/${lat},${long}`;

    return (
        <div className="column">              
            <div className="card newsItem">
            <div className="card-image">
                <img src={fmtImageURL} alt=""/>                
            </div>              
            <div className="card-content newsContent">                
                <div className="content">
                    <QRCode
                        value={props.item.properties.url}
                        size={50}
                        bgColor={'transparent'}
                        fgColor={"#4a4a4a"}
                        level={"L"}
                        includeMargin={false}
                        renderAs={"svg"}
                        className="newsQR is-pulled-right"
                        />                 
                    {fmtText} - {ago(eventTime)}                 
                </div>
            </div>
            </div>
        </div>
    );
}

export default QuakeItem;