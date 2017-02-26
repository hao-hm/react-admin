import React, {Component} from 'react';
import './App.css';
import {Layout, Breadcrumb, Menu, Icon} from 'antd';
const {Header, Content, Footer, Sider} = Layout;
import {Link} from 'react-router';
import logo from './logo.svg';


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
    return (
      <Layout style={{height: '100%'}}>
        <Sider collapsible
               collapsed={this.state.collapsed}
               onCollapse={this.onCollapse}>
          <Link className="logo" to="/">
            <img src={logo} className="logo-img" alt="logo"/>
          </Link>
          <Menu theme="dark" mode={this.state.mode} selectedKeys={this.state.selectedKeys}>

            <Menu.Item key="/user">
              <Link to="/user">
              <span>
                <Icon type="user"/>
                <span className="nav-text">User</span>
              </span>
              </Link>
            </Menu.Item>


            <Menu.Item key="/about">
              <Link to="/about">
                <span>
                  <Icon type="link"/>
                  <span className="nav-text">About</span>
                </span>
              </Link>
            </Menu.Item>


          </Menu>
        </Sider>
        <Layout>
          <Header style={{background: '#fff', padding: 0}}/>
          <Content style={{margin: '0 16px'}}>
            <Breadcrumb style={{margin: '12px 0'}}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{padding: 24, background: '#fff', minHeight: 200}}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{textAlign: 'center'}}>
            TMA Design ©2017 Created by Hao HM
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;
