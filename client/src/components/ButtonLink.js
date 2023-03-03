import React from "react";
import { NavLink } from "react-router-dom";

const ButtonLink = ({color, text, toPath, wrapperClass}) => {
    return (
        <NavLink to={toPath} className={'button button-link ' + 'button-' +color + ' ' + wrapperClass}>
           { text }
        </NavLink>
    )
} 
export default ButtonLink;