import React, { Component } from 'react';
import {connect} from 'react-redux'

class Detail extends Component {
  render() {
    return(
      <div>
        <h1>Detail</h1>
        Name: {this.props.current.first_name}
        Last Name: {this.props.current.last_name}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    current: {}
  };
};

export default connect(mapStateToProps)(Detail);
