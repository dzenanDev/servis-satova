import React, { Fragment } from 'react';
import { Layout, Menu, Breadcrumb, Avatar } from 'antd';
import {
  PieChartFilled,
  HomeFilled,
  BarsOutlined,
  SettingFilled,
  ImportOutlined,
  IdcardOutlined,
  RocketTwoTone,
  FormOutlined,
  ToolTwoTone,
  SnippetsTwoTone,
} from '@ant-design/icons';
import { Outlet, Link } from 'react-router-dom';
import { store } from '@redux/store';
import logo from '@assets/images/logoInoma.png';
import styles from './index.module.less';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { globalSelector, setSidebarCollapsed } from '@redux/modules/global';
import { authSelector, logOut, CurrentUser } from '@redux/modules/auth';
import { Trans } from 'react-i18next';
import { UserOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const MainLayout: React.FC = () => {
  const { collapsed } = useSelector(globalSelector);
  const { currentUser } = useSelector(authSelector);
  const navigate = useNavigate();

  const toggle = () => {
    store.dispatch(setSidebarCollapsed(!collapsed));
  };

  const signOut = () => {
    store.dispatch(logOut());
    navigate('/login');
  };

  const { pathname } = useLocation();
  const routeBc: any[] | undefined = [{ path: 'dashboard', title: 'Home' }];
  pathname.split('/').forEach(el => {
    routeBc.push({ path: el, title: el });
  });

  const itemRender = (route: any, params: any, routes: any, paths: any) => {
    if (!route.path) return;
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span key={route.path}>{route.title}</span>
    ) : (
      <Link key={route.path} to={route.path}>
        {route.title}
      </Link>
    );
  };

  return (
    <Layout key="layoutkey1" className={styles.mainLayout}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggle}>
        <div className={styles.logo}>
          <img alt="React logo" src={logo} />
        </div>

        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<HomeFilled />}>
            <Link to="Naslovna">Naslovna</Link>
          </Menu.Item>

          <SubMenu key="dio" icon={<RocketTwoTone />} title="Rezervi dijelovi">
            <Menu.Item key="items1" icon={<BarsOutlined />}>
              <Link to="Rezervni">Rezervni dijelovi</Link>
            </Menu.Item>
            <Menu.Item key="items2" icon={<FormOutlined />}>
              <Link to="NewRezervni">Dodaj Rezervni dio</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="zsub1" icon={<SnippetsTwoTone />} title="Narudbe">
            <Menu.Item key="z2" icon={<ImportOutlined />}>
              <Link to="Narudbe">Sve narudbe</Link>
            </Menu.Item>
            <Menu.Item key="z3" icon={<IdcardOutlined />}>
              <Link to="NewNarudba">Naruci</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="rev" icon={<ToolTwoTone />} title="Reversi ">
            <Menu.Item key="5" icon={<SettingFilled />}>
              <Link to="Reversi">Reversi na servis</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<PieChartFilled />}>
              <Link to="NewRevers"></Link> Dodaj Revers na servis
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout key="layoutkey" className="site-layout">
        <Header className="site-layout-header">
          <Menu key="user" mode="horizontal" onClick={() => {}}>
            <SubMenu
              title={
                <Fragment>
                  <span style={{ color: '#999', marginRight: 4 }}>
                    <Trans>Hi,</Trans>
                  </span>
                  <span style={{ color: '#999', marginRight: 7 }}>
                    {currentUser.display_name}
                  </span>
                  <Avatar
                    size={30}
                    style={{ backgroundColor: '#87d068' }}
                    icon={<UserOutlined />}
                  />
                </Fragment>
              }
            >
              <Menu.Item key="SignOut" onClick={signOut}>
                <Trans>Sign out</Trans>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Header>
        <Content key="contentkey" className={styles.contentWrapper}>
          <Breadcrumb
            key="keybreadcrumb"
            itemRender={itemRender}
            routes={routeBc}
            className={styles.breadcrumb}
          />
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Content className={styles.contentContainer}>
              <Outlet />
            </Content>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Dzenan Huremovic ©2021</Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
