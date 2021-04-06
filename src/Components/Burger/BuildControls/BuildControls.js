import React from 'react';
import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl'

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'}
]

const buildControls = (props) => {

  return (
    <footer className="Footer">
      <div className='BuildControls'>
        <p> current price : <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(cont => (
          <BuildControl
            key={cont.label}
            label={cont.label}
            // type={cont.type}
            disabled={props.disabled[cont.type]}
            remove={() => props.ingredientRemoved(cont.type)}
            added={() => props.ingredientAdded(cont.type)}/>
        ))}
        <button className='OrderButton' disabled={!props.purchasable} onClick={props.ordered}>{props.isAuth ?"ORDER NOW":"SIGN UP"}</button>
      </div>
    </footer>
  );
}
export default buildControls;
