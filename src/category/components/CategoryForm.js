import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import action from '../actions';
import selector from '../selector';
import {VIEW_MODE, CREATE_MODE, EDIT_MODE} from '../../util/actionType';
import { Form, Select, Input, Button } from 'antd';
const FormItem = Form.Item;

class CategoryForm extends Component {
  constructor(props) {
    super(props);
    const current = this.props.current || {};
    this.state = {
      name: current.name,
      description: current.description
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
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

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    };
    const state = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="Name">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input category name!' }],
            initialValue: state.name
          })(
            <Input />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="Description">
          {getFieldDecorator('description', {
            rules: [{ required: true, message: 'Please input category description!' }],
            initialValue: state.description
          })(
            <Input />
          )}
        </FormItem>

        <FormItem wrapperCol={{ span: 8, offset: 4 }}>
          <Button type="primary" loading={this.props.loading} htmlType="submit">Submit</Button>
          <Button onClick={this.handleCancel}>Cancel</Button>
        </FormItem>
      </Form>
    );
  }
}

//prop types
CategoryForm.propTypes = {
  mode: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
};

///////////////////
const mapStateToProps = (state) => ({
  current: selector.getCurrentItem(state),
  mode: selector.getCurrentMode(state),
  loading: selector.getLoading(state) > 0
});

const mapDispatchToProps = (dispatch) => ({
  action: bindActionCreators(action, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(CategoryForm));