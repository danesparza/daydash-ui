import React from "react";
import QRCode from 'qrcode.react';

function NewsBox(props) {

    //  Render the current time
    return (
        <React.Fragment>
            <div className="column">              
              <div className="card newsItem">
                <div className="card-image">
                  <img src="https://cdn.cnn.com/cnnnext/dam/assets/210819155129-hickenlooper-king-wicker-split-super-tease.jpg" alt=""/>                
                </div>              
                <div className="card-content newsContent">                
                  <div className="content">
                  <QRCode
                      value={"https://cnn.it/3B0jOt9"}
                      size={50}
                      bgColor={'transparent'}
                      fgColor={"#4a4a4a"}
                      level={"L"}
                      includeMargin={false}
                      renderAs={"svg"}
                      className="newsQR is-pulled-right"
                      />                 
                    Sens. John Hickenlooper, Angus King and Roger Wicker say they have tested positive for Covid-19. All three have been vaccinated.                  
                  </div>
                </div>
              </div>
            </div>

            <div className="column">              
              <div className="card newsItem">
                <div className="card-image">
                  <img src="https://cdn.cnn.com/cnnnext/dam/assets/210819123547-01-sonny-chiba-restricted-super-tease.jpg" alt=""/>                
                </div>              
                <div className="card-content newsContent">                
                  <div className="content">
                  <QRCode
                      value={"https://cnn.it/37VvlNR"}
                      size={50}
                      bgColor={'transparent'}
                      fgColor={"#4a4a4a"}
                      level={"L"}
                      includeMargin={false}
                      renderAs={"svg"}
                      className="newsQR is-pulled-right"
                      />                 
                    Sonny Chiba, martial arts star of 'Kill Bill,' dies of Covid-19 complications                 
                  </div>
                </div>
              </div>
            </div>

            <div className="column">              
              <div className="card newsItem">
                <div className="card-image">
                  <img src="https://dynaimage.cdn.cnn.com/cnn/digital-images/org/e3540985-f87f-4592-a871-0c44182a8d3d.jpg" alt=""/>                
                </div>              
                <div className="card-content newsContent">                
                  <div className="content">
                  <QRCode
                      value={"https://www.cnn.com/politics/live-news/us-capitol-suspected-explosives-08-19-21/h_5dc30e9d6b9430d72e53cdc3a27cbae8"}
                      size={50}
                      bgColor={'transparent'}
                      fgColor={"#4a4a4a"}
                      level={"L"}
                      includeMargin={false}
                      renderAs={"svg"}
                      className="newsQR is-pulled-right"
                      />                 
                    A suspect who claimed to have a bomb in a truck near the US Capitol has surrendered to authorities, sources say                 
                  </div>
                </div>
              </div>
            </div>

            <div className="column">              
              <div className="card newsItem">
                <div className="card-image">
                  <img src="https://cdn.cnn.com/cnnnext/dam/assets/210819121053-09-capitol-incident-0819-super-tease.jpg" alt=""/>                
                </div>              
                <div className="card-content newsContent">                
                  <div className="content">
                  <QRCode
                      value={"https://cnn.it/2XGOdyf"}
                      size={50}
                      bgColor={'transparent'}
                      fgColor={"#4a4a4a"}
                      level={"L"}
                      includeMargin={false}
                      renderAs={"svg"}
                      className="newsQR is-pulled-right"
                      />                 
                    The US Supreme Court has been evacuated because of a suspected security threat near the Library of Congress. Follow live updates: \n https://t.co/sE4JDUzWFb                  
                  </div>
                </div>
              </div>
            </div>

            <div className="column">              
              <div className="card newsItem">
                <div className="card-image">
                  <img src="https://cdn.cnn.com/cnnnext/dam/assets/210819121053-09-capitol-incident-0819-super-tease.jpg" alt=""/>                
                </div>              
                <div className="card-content newsContent">                
                  <div className="content">
                  <QRCode
                      value={"https://cnn.it/3j1Yptu"}
                      size={50}
                      bgColor={'transparent'}
                      fgColor={"#4a4a4a"}
                      level={"L"}
                      includeMargin={false}
                      renderAs={"svg"}
                      className="newsQR is-pulled-right"
                      />                 
                    Police are responding to a claim of an explosive device in a truck near the US Capitol, according to law enforcement sources. Nearby buildings have been evacuated.                  
                  </div>
                </div>
              </div>
            </div>

            <div className="column">              
              <div className="card newsItem">
                <div className="card-image">
                  <img src="https://cdn.cnn.com/cnnnext/dam/assets/210807195408-joe-jill-biden-071821-super-tease.jpg" alt=""/>                
                </div>              
                <div className="card-content newsContent">                
                  <div className="content">
                  <QRCode
                      value={"https://www.cnn.com/2021/08/19/politics/bidens-covid-vaccine-booster-shots/index.html"}
                      size={50}
                      bgColor={'transparent'}
                      fgColor={"#4a4a4a"}
                      level={"L"}
                      includeMargin={false}
                      renderAs={"svg"}
                      className="newsQR is-pulled-right"
                      />                 
                    President Joe Biden and first lady Jill Biden plan to get Covid-19 vaccine booster shots once they are cleared to take them, the President said in an interview that aired Thursday                  
                  </div>
                </div>
              </div>
            </div>

            <div className="column">              
              <div className="card newsItem">
                <div className="card-image">
                  <img src="https://cdn.cnn.com/cnnnext/dam/assets/210819083630-hurricane-grace-satellite-8am-et-081921-super-tease.jpg" alt=""/>                
                </div>              
                <div className="card-content newsContent">                
                  <div className="content">
                  <QRCode
                      value={"https://www.cnn.com/2021/08/19/weather/hurricane-grace-mexico-thursday/index.html"}
                      size={50}
                      bgColor={'transparent'}
                      fgColor={"#4a4a4a"}
                      level={"L"}
                      includeMargin={false}
                      renderAs={"svg"}
                      className="newsQR is-pulled-right"
                      />                 
                    Category 1 Hurricane Grace makes landfall on the Yucatan Peninsula in Mexico after striking Haiti and impacting other Caribbean islands as a tropical storm                  
                  </div>
                </div>
              </div>
            </div>
        </React.Fragment>
    );
}

export default NewsBox;