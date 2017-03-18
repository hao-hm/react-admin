import React, {PropTypes} from 'react';
import { Button } from 'antd';

import {VIEW_MODE} from '../util/actionType';

const AppHeader = ({mode, buttons, title}) => {
  return mode === VIEW_MODE && (
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <h2 style={{float: 'left' }}>{title}</h2>
        {buttons.map(button => (
          <Button type={button.type} onClick={button.onClick}>{button.name}</Button>
        ))}
      </div>
    )
};
AppHeader.propTypes = {
  mode: PropTypes.string.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  })).isRequired,
  title: PropTypes.string.isRequired
};
export default AppHeader