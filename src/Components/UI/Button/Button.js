import React from 'react';
import './Button.css';
const Button =(props)=>{

    return (
      <button className={["Button",[props.btnType]].join(" ")} disabled={props.disabled} onClick={props.Clicked}>{props.children}</button>
    );
  }


export default Button;
