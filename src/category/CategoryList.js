import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as actions from './categoryActions';
import {Table, Popconfirm, Alert} from 'antd';

class CategoryList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {data} = this.props;
    this.props.actions.fetchCategoryList(data && data.page)
  }


  handleDelete = (item) => {
    this.props.actions.deleteCategory(item.id);
  };
  handleTableChange = (pagination, filters, sorter) => {
    this.props.actions.fetchCategoryList(pagination.current);
  };

  render() {
    const {data, loading, error} = this.props;
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
            <img alt="avatar" style={{width: 50}} src={record.avatar}/>
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
            <Popconfirm title="Are you sure delete this user?" onConfirm={()=> this.handleDelete(record)} okText="Yes"
                        cancelText="No">
              <a href="#">Delete</a>
            </Popconfirm>
          </span>
        ),
      }
    ];
    return (
      <div>
        {error && (<Alert message={error} type="error" />)}
        <Table columns={columns} loading={loading > 0} dataSource={dataSource} pagination={pagination} rowKey="id"
               onChange={this.handleTableChange}/>
      </div>

    );
  }
}


const mapStateToProps = (state) => {
  return {
    data: state.category.data,
    loading: state.category.loading,
    error: state.category.error
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
