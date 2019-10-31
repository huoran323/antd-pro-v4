import React, { PureComponent } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { ConnectProps } from '@/models/connect';
import { GlobalModelState } from '@/models/global';
import { Layout, BackTop } from 'antd';
import { SiderMenu } from '@/widget';

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
    console.log('props --', this.props);
  }
  render() {
    const { location, menuList } = this.props;
    return (
      <>
        <Layout>
          <SiderMenu menuList={menuList} location={location} />
        </Layout>
      </>
    );
  }
}

export default BasicLayout;
