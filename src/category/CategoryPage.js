import React, { Component } from 'react';
import {connect} from 'react-redux'
import AppContent from '../common/AppContent'
import CategoryList from './CategoryList'
import {getCurrentMode} from './categoryReducers';
import CategoryHeader from './CategoryHeader';
import CategoryForm from './CategoryForm';

import {CREATE_MODE, EDIT_MODE} from '../util/actionType';

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
      <AppContent>
        <CategoryHeader/>
        {this.renderContent()}
      </AppContent>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    mode: getCurrentMode(state)
  };
};


export default connect(mapStateToProps)(CategoryPage);