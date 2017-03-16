import React, { Component } from 'react';
import {connect} from 'react-redux'
import ProductList from './ProductList'
import selector from '../selector';
import ProductHeader from './ProductHeader';
import ProductForm from './ProductForm';
import {CREATE_MODE, EDIT_MODE} from '../../util/actionType';

class ProductPage extends Component {
  constructor(props) {
    super(props);
  }

  renderContent() {
    let mode =  this.props.mode;
    switch (mode){
      case CREATE_MODE:
        return <ProductForm />;
      case EDIT_MODE:
        return <ProductForm />;
      default:
        return <ProductList/>;
    }
  }

  render() {
    return (
      <div>
        <ProductHeader/>
        {this.renderContent()}
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    mode: selector.getCurrentMode(state)
  };
};


export default connect(mapStateToProps)(ProductPage);