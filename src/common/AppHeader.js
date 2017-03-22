import React, {Component, PropTypes} from 'react';
import { Button, Input, Icon } from 'antd';
import debounce from 'lodash/debounce';
import './AppHeader.css'

import {VIEW_MODE} from '../util/actionType';

class AppHeader extends Component {
  constructor(props){
    super(props);
    // debounce the passed in dispatch method
    this.onSearch = debounce(this.props.onSearch, 500)
  }
  handleChange = e => {
    // React event weirdness requires storing
    // the synthetic event
    this.onSearch(e.target.value);
  };

  render() {
    const {mode, buttons, title, search} = this.props;
    return  mode === VIEW_MODE && (
        <div style={{ marginBottom: 10, textAlign: 'right' }}>
          <h2 style={{float: 'left' }}>{title}</h2>
          <Input size="large" placeholder="Search all..." defaultValue={search} className="search-box"
                 style={{width: 'calc(100% - 200px)', float: 'left'}}
                 prefix={<Icon type="search" />} onChange={this.handleChange} />
          {buttons.map((button, i) => (
            <Button type={button.type} key={i} onClick={button.onClick}>{button.name}</Button>
          ))}
        </div>
      )
  }
}

AppHeader.propTypes = {
  mode: PropTypes.string.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  })),
  title: PropTypes.string.isRequired
};
export default AppHeader