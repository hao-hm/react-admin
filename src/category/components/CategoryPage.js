import React, { PropTypes } from 'react';
import {connect} from 'react-redux'
import AppContent from '../../common/AppContent'
import CategoryList from './CategoryList'
import selector from '../selector';
import CategoryHeader from './CategoryHeader';
import CategoryForm from './CategoryForm';
import {CREATE_MODE, EDIT_MODE} from '../../util/actionType';


const CategoryPage = ({mode}) => {

  const renderContent = () => {
    switch (mode){
      case CREATE_MODE:
      case EDIT_MODE:
        return <CategoryForm />;
      default:
        return <CategoryList/>;
    }
  };

  return (
    <div>
      <CategoryHeader/>
      {renderContent()}
    </div>
  )
};

//prop types
CategoryPage.propTypes = {
  mode: PropTypes.string.isRequired
};

//////////////
const mapStateToProps = (state) => {
  return {
    mode: selector.getCurrentMode(state)
  };
};

export default connect(mapStateToProps)(CategoryPage);