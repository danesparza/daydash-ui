import React from "react";
import QRCode from 'qrcode.react';
import ago from 's-ago';

function NewsItem(props) {

    const createTime = new Date(props.item.createtime * 1000);

    return (
        <div className="column">              
            <div className="card newsItem">
            <div className="card-image">
                <img src={props.item.mediaurl} alt=""/>                
            </div>              
            <div className="card-content newsContent">                
                <div className="content">
                    <QRCode
                        value={props.item.storyurl}
                        size={50}
                        bgColor={'transparent'}
                        fgColor={"#4a4a4a"}
                        level={"L"}
                        includeMargin={false}
                        renderAs={"svg"}
                        className="newsQR is-pulled-right"
                        />                 
                    {props.item.text} - {ago(createTime)}                 
                </div>
            </div>
            </div>
        </div>
    );
}

export default NewsItem;