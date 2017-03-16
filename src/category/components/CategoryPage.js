import React, { Component } from 'react';
import {connect} from 'react-redux'
import AppContent from '../../common/AppContent'
import CategoryList from './CategoryList'
import selector from '../selector';
import CategoryHeader from './CategoryHeader';
import CategoryForm from './CategoryForm';
import {CREATE_MODE, EDIT_MODE} from '../../util/actionType';

class CategoryPage extends Component {
  constructor(props) {
    super(props);
  }

  renderContent() {
    let mode =  this.props.mode;
    switch (mode){
      case CREATE_MODE:
        return <CategoryForm />;
      case EDIT_MODE:
        return <CategoryForm />;
      default:
        return <CategoryList/>;
    }
  }

  render() {
    return (
      <div>
        <CategoryHeader/>
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


export default connect(mapStateToProps)(CategoryPage);