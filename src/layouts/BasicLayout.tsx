import React, { PureComponent } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { ConnectProps } from '@/models/connect';

export interface BasicLayoutProps extends ConnectProps {
  menuList: any[];
  collapsed?: boolean;
  breadcrumbNameMap: any[];
}

class BasicLayout extends PureComponent<BasicLayoutProps> {
  render() {
    return <div></div>;
  }
}

export default connect()(BasicLayout);
