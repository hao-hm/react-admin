import React, { Component } from 'react';
import {Breadcrumb} from 'antd';
import UserList from  './UserList'
import UserDetail from  './UserDetail'
import AppContent from '../common/AppContent'

class UserPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <AppContent>
        <UserList/>
      </AppContent>
    );
  }
}

export default UserPage;