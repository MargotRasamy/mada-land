import React from "react";

const ButtonSimple = ({type, color, text, wrapperClass, onClickEvent, size}) => {
    return (
        <button type={type} onClick={onClickEvent} className={'button button-simple button-' +color + ' button-' + size + ' ' + wrapperClass}>
           { text }
        </button>
    )
} 
export default ButtonSimple;