import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { ConnectProps, ConnectState } from '@/models/connect';
import { Layout } from 'antd';
import { SiderMenu, GlobalHeader } from '@/widget';

export interface BasicLayoutProps extends ConnectProps {
  userInfo: any;
  menuList: any[];
  collapsed?: boolean;
  breadcrumbNameMap: any[];
}

@connect(({ global, userLogin }: ConnectState) => ({
  ...global,
  userInfo: userLogin.userInfo,
}))
class BasicLayout extends PureComponent<BasicLayoutProps> {
  componentDidMount() {
    const { dispatch } = this.props;

    let username = localStorage.getItem('username');

    // 获取用户信息
    dispatch({
      type: 'userLogin/getUserInfo',
      payload: {
        username: username,
      },
    });
  }

  // 切换collapsed， collapsed为从GlobalHeader中传递过来的
  handleMenuCollapse = collapsed => {
    const { dispatch } = this.props;

    dispatch({
      type: 'global/changeCollapsed',
      collapsed,
    });
  };

  render() {
    const { children, location, menuList, userInfo, collapsed } = this.props;
    const layoutStyle = { paddingLeft: collapsed ? '80px' : '256px' };

    return (
      <>
        <Layout style={{ minHeight: '100vh' }}>
          <SiderMenu menuList={menuList} location={location} collapsed={collapsed} />
          <Layout style={{ minHeight: '100vh', ...layoutStyle }}>
            <GlobalHeader
              userInfo={userInfo}
              collapsed={collapsed}
              onCollapse={this.handleMenuCollapse}
            ></GlobalHeader>
            <div>{children}</div>
          </Layout>
        </Layout>
      </>
    );
  }
}

export default BasicLayout;
