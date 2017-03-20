import React from 'react';
import { Link } from 'react-router';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const AppContent = ({children, sidebar}) => {
  const module = location && location.pathname.replace(/(^\/|\/$)/g, '');
  let activeMenuItem = module || 'home';
  let defaultOpenItem;
  const menuItems = sidebar.map((item, i) => {
    if (item.children) {
      return (
        <SubMenu key={item.key} title={<span><Icon type={item.icon} />{item.name}</span>}>
          {item.children.map(function (subMenu, i) {
            if(subMenu.key === activeMenuItem){
              defaultOpenItem = item.key;
            }
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
    <Layout style={{ padding: '24px 0', background: '#fff' }}>
      {sidebar&& (<Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          selectedKeys={[activeMenuItem]}
          defaultOpenKeys={[defaultOpenItem]}
          style={{ height: '100%' }}>
          {menuItems}
        </Menu>
      </Sider>)}
      <Content style={{ padding: '0 24px', minHeight: 280 }}>
        {children}
      </Content>
    </Layout>
  )
};

export default AppContent;