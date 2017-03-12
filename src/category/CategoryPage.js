import React, { Component } from 'react';
import AppContent from '../common/AppContent'
import CategoryList from '../category/CategoryList'

class CategoryPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <AppContent>
        <CategoryList/>
      </AppContent>
    );
  }
}

export default CategoryPage;