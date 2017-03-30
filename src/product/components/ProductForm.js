import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import action from '../actions';
import categoryAction from '../../category/actions'
import selector from '../selector';
import categorySelector from '../../category/selector';
import {VIEW_MODE, CREATE_MODE, EDIT_MODE} from '../../util/actionType';
import { Form, Select, Input, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class ProductForm extends Component {
  constructor(props) {
    super(props);

    const current = this.props.current || {};
    this.state = {
      name: current.name,
      description: current.description,
      categoryId: current.categoryId
    };
  }
  componentWillMount() {
    this.props.categoryAction.fetch()
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if(this.isCreate()){
          this.props.action.create({request: values})
        }else{
          this.props.action.update({key: this.props.current.id,request: values});
          this.props.action.setCurrent(null);
        }

      }
    });
  };

  isCreate = ()=> {
    return this.props.mode === CREATE_MODE;
  };

  isEdit = ()=> {
    return this.props.mode === EDIT_MODE;
  };

  handleCancel = () => {
    this.props.action.changeMode(VIEW_MODE);
    this.props.action.setCurrent(null);
  };

  handleChangeCategories = (value) => {
    console.log(value);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    };
    const state = this.state;

    return (
      <div>
        <h2>{this.isCreate()? 'Create Product' : 'Edit Product'}</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="Name">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input product name!' }],
              initialValue: state.name
            })(
              <Input />
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="Description">
            {getFieldDecorator('description', {
              rules: [{ required: true, message: 'Please input product description!' }],
              initialValue: state.description
            })(
              <Input />
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="Categories">
            {getFieldDecorator('categoryId', {
              rules: [{ required: true, message: 'Please select categories!' }],
              initialValue: state.categoryId
            })(
              <Select
                placeholder="Please select"
                onChange={this.handleChangeCategories}
              >
                {this.props.categories.map((category) => (
                  <Option key={category.id}>{category.name}</Option>
                ))}
              </Select>
            )}
          </FormItem>

          <FormItem wrapperCol={{ span: 8, offset: 4 }}>
            <Button type="primary" loading={this.props.loading > 0} htmlType="submit">Submit</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleCancel}>Cancel</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  current: selector.getCurrentItem(state),
  mode: selector.getCurrentMode(state),
  loading: selector.getLoading(state),
  categories: categorySelector.getData(state)
});

const mapDispatchToProps = (dispatch) => ({
  action: bindActionCreators(action, dispatch),
  categoryAction: bindActionCreators(categoryAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ProductForm));