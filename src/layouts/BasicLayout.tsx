import React, { PureComponent } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { ConnectProps } from '@/models/connect';
import { GlobalModelState } from '@/models/global';
import { Layout, BackTop } from 'antd';
import { SiderMenu, GlobalHeader } from '@/widget';

export interface BasicLayoutProps extends ConnectProps {
  menuList: any[];
  collapsed?: boolean;
  breadcrumbNameMap: any[];
}

@connect(({ global }: { global: GlobalModelState }) => ({
  ...global,
}))
class BasicLayout extends PureComponent<BasicLayoutProps> {
  componentDidMount() {
    
  }
  render() {
    const { location, menuList } = this.props;
    return (
      <>
        <Layout>
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
