import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as actions from './UserActions';
import {Table, Popconfirm} from 'antd';

class Users extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {data} = this.props;
    this.props.actions.fetchData(data && data.page)
  }



  handleDelete = (e) => {
    console.log(e)
  };
  handleTableChange = (pagination, filters, sorter) => {
    this.props.actions.fetchData(pagination.current);
  };
  render() {
    const {data, loading} = this.props;
    const dataSource = data.data;
    const pagination = {
      total: data.total,
      current: parseInt(data.page)
    };
    const columns = [
      {
        title: 'Avatar',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (text, record) => (
          <div>
            <img alt="avatar" style={{ width: 50 }} src={record.avatar}/>
          </div>
        )
      },
      {
        title: 'First Name',
        dataIndex: 'first_name',
        key: 'first_name',
        render: (text, record) => <Link to={`/user/${record.id}`}>{text}</Link>,
      },
      {
        title: 'Last Name',
        dataIndex: 'last_name',
        key: 'last_name',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="#">Edit</a>
            <span className="ant-divider"/>
            <Popconfirm title="Are you sure delete this user?" onConfirm={()=> this.handleDelete(record)} okText="Yes" cancelText="No">
              <a href="#">Delete</a>
            </Popconfirm>
          </span>
        ),
      }
    ];
    return (
      <Table columns={columns} loading={loading>0} dataSource={dataSource} pagination={pagination} rowKey="id" onChange={this.handleTableChange}/>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    data: state.user.data,
    loading: state.user.loading
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

const UserList = connect(mapStateToProps, mapDispatchToProps)(Users);
export default UserList;