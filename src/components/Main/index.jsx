import React from 'react';
import Header from 'components/Header'
import Loader from 'containers/Loader'

const Main = (props) => {
    return (
        <div>
            <Header/>
            <div className="container">
                {props.children}
            </div>
            <Loader/>
        </div>
    )
};

export default Main