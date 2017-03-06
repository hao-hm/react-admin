import React, {Component} from 'react';
import './App.css';
import {Link} from 'react-router';
import logo from './logo.svg';
import {Layout, Breadcrumb, Menu, Icon} from 'antd';
const {Header, Content, Footer, Sider} = Layout;
const { SubMenu } = Menu;



class App extends Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
      mode: 'inline',
      selectedKeys: []
    };
  }

  static contextTypes = {
    router: React.PropTypes.object
  };

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
          <Breadcrumb style={{ margin: '12px 0' }} routes={routes} />
          {this.props.children}
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          TMA Design ©2017 Created by Hao HM
        </Footer>
      </Layout>
    );
  }
}

export default App;
