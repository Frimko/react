import React from 'react';
import { connect } from "react-redux";
import MDSpinner from "react-md-spinner";
import styled from "styled-components";

const WrapLoader = styled.div`
    justify-content: center;
    position: fixed;
    top:0;
    background-color: rgba(77,77,77,0.75);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    height: 300px;
`;

const Loader = (props) => {
    return (
        props.loader ? <WrapLoader><MDSpinner size={64}/></WrapLoader> : null
    )
};

export default connect(
    ({main}) => ({
        loader: main.loader
    })
)(Loader);