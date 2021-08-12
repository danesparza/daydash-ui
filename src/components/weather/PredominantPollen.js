import {Fragment} from 'react';

const checkIfExists = (props) => {
    return (props && props.pollen && props.pollen.data && props.pollen.data.predominant_pollen && Object.keys(props.pollen.data.predominant_pollen).length) ? true : false
};

function PredominantPollen(props) {
    //  Format the pollen information:    
    let retval = "Loading ...";
    if(checkIfExists(props)){
        retval = props.pollen.data.predominant_pollen;
    }

    //  Render the current time
    return (
        <Fragment>
            {retval}            
        </Fragment>
    );
}

export default PredominantPollen;
