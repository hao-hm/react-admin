// import AboutPage from './AboutPage'

export default {
  path: 'about',
  // component: AboutPage
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./AboutPage').default)
    })
  }
};