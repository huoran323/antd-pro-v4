import React, { PureComponent } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { ConnectProps } from '@/models/connect';
import { GlobalModelState } from '@/models/global';

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
    return <div>测试</div>;
  }
}

export default BasicLayout;
