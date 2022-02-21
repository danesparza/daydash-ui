import React from "react";
import QRCode from 'qrcode.react';
import ago from 's-ago';

function NewsItem(props) {

    //  Get the create time as a date
    const createTime = new Date(props.item.createtime * 1000);

    //  Format the news text so that ...
    //  Any link is removed (from the end trim off anything including and after http)
    let fmtText = props.item.text;
    if(fmtText.indexOf("http") > 0){
        fmtText = fmtText.substring(0, fmtText.indexOf("http"));
    }    

    //  Any last sentence is not used (from the end, trim off the last bit of text from the first period found)
    if(fmtText.lastIndexOf(".") > 60){
        fmtText = fmtText.substring(0, fmtText.lastIndexOf("."));
    }

    //  Finally ... trim after 100 chars and show an elipsis
    //  TODO: We might be able to take this out if we hide navigation
    if(fmtText.length > 110){
        fmtText = fmtText.substring(0, 150) + "...";
    }

    return (
        <div className="column">              
            <div className="card newsItem">
            <div className="card-image">
                <img src={props.item.mediadata} alt=""/>                
            </div>              
            <div className="card-content newsContent">                
                <div className="content">
                    <QRCode
                        value={props.item.storyurl}
                        size={50}
                        bgColor={'transparent'}
                        fgColor={"#999999"}
                        level={"L"}
                        includeMargin={false}
                        renderAs={"svg"}
                        className="newsQR is-pulled-right"
                        />                 
                    {fmtText} - {ago(createTime)}                 
                </div>
            </div>
            </div>
        </div>
    );
}

export default NewsItem;