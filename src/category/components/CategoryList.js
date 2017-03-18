import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import action from '../actions';
import selector from  '../selector'
import {EDIT_MODE} from '../../util/actionType'
import {Table, Popconfirm, Alert, message} from 'antd';

class CategoryList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.action.fetch()
  }


  handleDelete = async (item) => {
    await this.props.action.delete({key: item.id});
    message.success('Delete success');
  };

  handleTableChange = (pagination, filters, sorter) => {
    this.props.action.fetch({
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order
    });
  };

  onEditClick = (item) => {
    this.props.action.setCurrent(item);
    this.props.action.changeMode(EDIT_MODE);
  };
  
  render() {
    const {data, loading, error} = this.props;

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: true,
        render: (text, record) => <Link to={`/category/${record.id}`}>{text}</Link>,
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        sorter: true,
        render: (text, record) => (new Date(text)).toLocaleDateString(),
      },
      {
        title: 'Action',
        key: 'action',
        fixed: 'right',
        width: 100,
        render: (text, record) => (
          <span>
            <a href="#" onClick={()=>this.onEditClick(record)}>Edit</a>
            <span className="ant-divider"/>
            <Popconfirm title="Are you sure delete this user?" onConfirm={()=> this.handleDelete(record)} okText="Yes"
                        cancelText="No">
              <a href="#">Delete</a>
            </Popconfirm>
          </span>
        )
      }
    ];
    return (
      <div>
        {error && (<Alert message={error} type="error" />)}
        <Table columns={columns} loading={loading > 0} dataSource={data} rowKey="id"
               onChange={this.handleTableChange}/>
      </div>

    );
  }
}


//prop types
CategoryList.propTypes = {
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
};

///////////////
const mapStateToProps = (state) => {
  return {
    data: selector.getData(state),
    loading: selector.getLoading(state),
    error: selector.getError(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  action: bindActionCreators(action, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
