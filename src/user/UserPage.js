import React, { Component } from 'react';
import UserList from  './UserList'
import UserDetail from  './UserDetail'

class UserPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <UserList/>
        {this.props.children}
      </div>
    );
  }
}

export default UserPage;