export default {
  path: 'category',
  breadcrumbName: 'Category',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./CategoryPage').default)
    })
  }
};