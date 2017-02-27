import UserDetail from './UserDetail'
// import UserPage from './UserPage'

export default {
  path: 'user',
  // component: UserPage,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./UserPage').default)
    })
  },
  childRoutes: [
    {path: ':id', component: UserDetail}
  ]
};