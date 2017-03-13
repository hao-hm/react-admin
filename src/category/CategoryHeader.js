import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import { Button } from 'antd';
import {action} from './categoryActions';
import {getCurrentMode} from './categoryReducers';
import {VIEW_MODE, CREATE_MODE} from '../util/actionType';

const CategoryHeader = ({action, mode}) => {

  const onCreateClick = ()=>{
    action.changeMode(CREATE_MODE)
  };

  return mode === VIEW_MODE && (
    <div style={{ marginBottom: 16, textAlign: 'right' }}>
      <Button type="primary" onClick={onCreateClick}>Create</Button>
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    mode: getCurrentMode(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  action: bindActionCreators(action, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryHeader);