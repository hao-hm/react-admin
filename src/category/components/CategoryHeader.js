import React, {PropTypes} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import action from '../actions';
import selector from '../selector';
import AppHeader from '../../common/AppHeader'
import {CREATE_MODE} from '../../util/actionType';

const CategoryHeader = ({action, mode, search}) => {
  const headerData = {
    title: 'Categories',
    buttons: [
      {name: 'Create', type: 'primary', onClick: () => action.changeMode(CREATE_MODE)}
    ],
    mode,
    search,
    onSearch: function (value) {
      action.fetch({search: value})
    }
  };
  return <AppHeader {...headerData}/>;
};

//prop types
CategoryHeader.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryHeader);