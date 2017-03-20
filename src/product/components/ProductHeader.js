import React, {PropTypes} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import action from '../actions';
import selector from '../selector';
import AppHeader from '../../common/AppHeader';
import ProductFilter from './ProductFilter';
import {CREATE_MODE} from '../../util/actionType';

const ProductHeader = ({action, mode, search}) => {
  const headerData = {
    title: 'Product',
    buttons: [
      {name: 'Create', type: 'primary', onClick: () => action.changeMode(CREATE_MODE)}
    ],
    mode,
    search,
    onSearch: function (value) {
      action.fetch({search: value})
    }
  };
  return (
    <div>
      <ProductFilter/>
      <AppHeader {...headerData}/>
    </div>
  );
};

//prop types
ProductHeader.propTypes = {
  action: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired
};

///////////////////
const mapStateToProps = (state) => {
  return {
    mode: selector.getCurrentMode(state),
    search: selector.getSearch(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  action: bindActionCreators(action, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductHeader);