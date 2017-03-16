export default {
  path: 'product',
  breadcrumbName: 'Product',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/ProductPage').default)
    })
  }
};