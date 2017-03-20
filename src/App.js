import React, {Component} from 'react';
import './App.css';
import {Link} from 'react-router';
import logo from './logo.svg';
import AppContent from './common/AppContent'
import {Layout, Breadcrumb, Menu, Icon, LocaleProvider} from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;


class App extends Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
      mode: 'inline',
      selectedKeys: [],
      sidebar: [
        {name: 'Dashboard', key: 'home', path: '/', icon: 'home'},
        {
          name: 'Sales',
          key: 'sales',
          icon: 'wallet',
          children: [
            {name: 'Orders', key: 'orders', path: '/orders'}
          ]
        },
        {
          name: 'Catalog',
          key: 'catalog',
          icon: 'shop',
          children: [{name: 'Category', key: 'category', path: '/category'}, {
            name: 'Product',
            key: 'product',
            path: '/product'
          }]
        },
        {
          name: 'User and Group',
          key: 'users',
          icon: 'user',
          children: [
            {name: 'User', key: 'user', path: '/user'},
            {name: 'Group', key: 'group', path: '/group'},
            {name: 'Role', key: 'role', path: '/role'},
          ]
        },
        {
          name: 'Customer',
          key: 'Customer',
          icon: 'team',
          children: [
            {name: 'Manage Customer', key: 'customer', path: '/customer'},
            {name: 'Manage Provider', key: 'provider', path: '/provider'}
          ]
        },
      ]
    }
  }

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({selectedKeys: [nextProps.location.pathname]})
  }

  render() {
    const {route, routes} = this.props;
    const module = location && location.pathname.replace(/(^\/|\/$)/g, '');
    let activeMenuItem = module || 'home';

    return (
      <LocaleProvider locale={enUS}>
        <Layout style={{height: '100%'}}>
          <Header className="header">
            <img src={logo} className="logo" alt="logo"/>
            <Menu
              theme="light"
              mode="horizontal"
              selectedKeys={[activeMenuItem]}
              style={{lineHeight: '64px', float: 'right'}}
            >

              <Menu.Item key="user">
                <Link to="/user">
              <span>
                <Icon type="user"/>
                <span className="nav-text">My Account</span>
              </span>
                </Link>
              </Menu.Item>
              {/*<Menu.Item key="about">*/}
                {/*<Link to="/about">*/}
                  {/*<span className="nav-text">About</span>*/}
                {/*</Link>*/}
              {/*</Menu.Item>*/}

            </Menu>
          </Header>
          <Content style={{padding: '0 50px', marginTop: 64}}>
            <Breadcrumb style={{margin: '12px 0'}} routes={routes}/>
            <AppContent sidebar={this.state.sidebar}>
              {this.props.children}
            </AppContent>

          </Content>

          <Footer style={{textAlign: 'center'}}>
            TMA Design ©2017 Created by Hao HM
          </Footer>
        </Layout>
      </LocaleProvider>
    );
  }
}

export default App;
