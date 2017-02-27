import React from 'react';
//import {Route, IndexRoute} from 'react-router';
import App from './App';
import HomePage from './home/HomePage'
// import AboutPage from './about/AboutPage'
import AboutRoute from './about/AboutRoute'
// import UserPage from './user/UserPage'
import UserRoute from './user/UserRoute'
//import NotFoundPage from './not-found/NotFoundPage'

//Webpack code splitting with Create React App and React Router
//More info: https://www.drewbolles.com/blog/2016/11/14/webpack-code-splitting-with-create-react-app-react-router/
//http://blog.scottlogic.com/2016/02/05/a-lazy-isomorphic-react-experiment.html
export default {
  childRoutes: [{
    path: '/',
    component: App,
    indexRoute: {component: HomePage},
    childRoutes: [
      AboutRoute,
      UserRoute
    ]
  }]
};

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
// export default (
//   <Route path="/" component={App}>
//     <IndexRoute component={HomePage} />
//     <Route path="user" getComponent={(location, callback) => {
//       require.ensure([], function (require) {
//         callback(null, require('./user/UserPage').default);
//       });
//     }} />
//     <Route path="about" getComponent={(location, callback) => {
//       require.ensure([], function (require) {
//         callback(null, require('./about/AboutPage').default);
//       });
//     }} />
//     <Route path="*" component={NotFoundPage} />
//   </Route>
// );


// export default (
//   <Route path="/" component={App}>
//     <IndexRoute component={HomePage} />
//     <Route path="user" component={UserPage} />
//     <Route path="about" component={AboutPage} />
//     <Route path="*" component={NotFoundPage} />
//   </Route>
// );