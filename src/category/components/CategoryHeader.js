import React, {PropTypes} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import action from '../actions';
import selector from '../selector';
import AppHeader from '../../common/AppHeader'
import {CREATE_MODE} from '../../util/actionType';

const CategoryHeader = ({action, mode}) => {
  const title = 'Categories';
  const buttons = [
    {name: 'Create', type: 'primary', onClick: () => action.changeMode(CREATE_MODE)}
  ];
  return <AppHeader buttons={buttons} mode={mode} title={title}/>;
};

//prop types
CategoryHeader.propTypes = {
  action: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired
};

///////////////////
const mapStateToProps = (state) => {
  return {
    mode: selector.getCurrentMode(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  action: bindActionCreators(action, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryHeader);