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
    console.log('userinfo --', this.props);
    const { dispatch, userInfo } = this.props;
    const { user_type } = userInfo;

    let username = localStorage.getItem('username');
    console.log('username -', username);
    // const userInfo = yield call(getUserInfo, { username: username });

    dispatch({
      type: 'global/getMenu',
      payload: {
        user_type: user_type,
      },
    });
  }
  render() {
    const { location, menuList } = this.props;

    return (
      <>
        <Layout style={{ minHeight: '100vh', paddingLeft: '256px' }}>
          <SiderMenu menuList={menuList} location={location} />
          <Layout>
            <GlobalHeader></GlobalHeader>
          </Layout>
        </Layout>
      </>
    );
  }
}

export default BasicLayout;
