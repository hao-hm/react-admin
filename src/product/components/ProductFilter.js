import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import action from '../actions';
import selector from '../selector';
import categorySelector from '../../category/selector';
import categoryAction from '../../category/actions';
import {VIEW_MODE} from '../../util/actionType';
import {Card, Select} from 'antd';
const Option = Select.Option;

class ProductFilter extends Component {

  componentWillMount() {
    this.props.categoryAction.fetch();
  }

  handleChangeCategories = (value) => {
    this.props.action.filterProducts(value);
  };

  render() {
    return this.props.mode === VIEW_MODE &&(
      <Card style={{marginBottom: 10}}>
        <Select
          style={{width: 200}}
          placeholder="Please select"
          defaultValue={'all'}
          onChange={this.handleChangeCategories}
        >
          <Option key={'all'}>All Categories</Option>
          {this.props.categories.map((category) => (
            <Option key={category.id}>{category.name}</Option>
          ))}
        </Select>
      </Card>
    );
  }
}

//prop types
ProductFilter.propTypes = {
  action: PropTypes.object.isRequired
};

///////////////////
const mapStateToProps = (state) => {
  return {
    mode: selector.getCurrentMode(state),
    categories: categorySelector.getData(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  action: bindActionCreators(action, dispatch),
  categoryAction: bindActionCreators(categoryAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductFilter);