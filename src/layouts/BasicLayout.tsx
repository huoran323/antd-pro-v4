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
  render() {
    const { location, menuList, userInfo } = this.props;

    return (
      <>
        <Layout style={{ minHeight: '100vh', paddingLeft: '256px' }}>
          <SiderMenu menuList={menuList} location={location} />
          <Layout>
            <GlobalHeader userInfo={userInfo}></GlobalHeader>
          </Layout>
        </Layout>
      </>
    );
  }
}

export default BasicLayout;
