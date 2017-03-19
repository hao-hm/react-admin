import React, {Component} from 'react';
import './App.css';
import {Link} from 'react-router';
import logo from './logo.svg';
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
        {name: 'User', key: 'user', path: '/user', icon: 'user'},
        {
          name: 'Catalog',
          key: 'catalog',
          icon: 'link',
          children: [{name: 'Category', key: 'category', path: '/category'}, {
            name: 'Product',
            key: 'product',
            path: '/product'
          }]
        }
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

    const menuItems = this.state.sidebar.map((item, i) => {
      if (item.children) {
        return (
          <SubMenu key={item.key} title={<span><Icon type={item.icon} />{item.name}</span>}>
            {item.children.map(function (subMenu, i) {
              return <Menu.Item key={subMenu.key}><Link to={subMenu.path}><span>{subMenu.icon &&
              <Icon type={subMenu.icon}/>}{subMenu.name}</span></Link></Menu.Item>
            })}
          </SubMenu>
        )
      } else {
        return <Menu.Item key={item.key}><Link to={item.path}><span><Icon
          type={item.icon}/>{item.name}</span></Link></Menu.Item>
      }
    });

    return (
      <LocaleProvider locale={enUS}>
        <Layout style={{height: '100%'}}>
          <Header className="header">
            <img src={logo} className="logo" alt="logo"/>
            <Menu
              theme="light"
              mode="horizontal"
              selectedKeys={[activeMenuItem]}
              style={{ lineHeight: '64px', float: 'right' }}
            >
              <Menu.Item key="home">
                <Link to="/">
              <span>
                <Icon type="home"/>
                <span className="nav-text">Home</span>
              </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="user">
                <Link to="/user">
              <span>
                <Icon type="user"/>
                <span className="nav-text">User</span>
              </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="about">
                <Link to="/about">
                  <span className="nav-text">About</span>
                </Link>
              </Menu.Item>

            </Menu>
          </Header>
          <Content style={{ padding: '0 50px', marginTop: 64 }}>
            <Breadcrumb style={{ margin: '12px 0' }} routes={routes}/>
            <Layout style={{ padding: '24px 0', background: '#fff' }}>
              <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%' }}
                >
                  {menuItems}
                </Menu>
              </Sider>
              <Content style={{ padding: '0 24px', minHeight: 280 }}>
                {this.props.children}
              </Content>
            </Layout>
          </Content>

          <Footer style={{ textAlign: 'center' }}>
            TMA Design ©2017 Created by Hao HM
          </Footer>
        </Layout>
      </LocaleProvider>
    );
  }
}

export default App;
