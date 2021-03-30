import React, {Component} from 'react';
import './Model.css'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import BackDrop from '../BackDrop/BackDrop'

class Model extends Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
      return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  render() {
    return (
      <Auxiliary>
        <BackDrop show={this.props.show} clicked={this.props.modelClose}/>
        <div className='Model'
             style={{transform:this.props.show ? 'translateY(0)':'translateY(-100vh)',
               opecity:this.props.show ? 1 : 0   }}>
          {this.props.children}
        </div>
      </Auxiliary>
    );
  }
}

export default Model;
