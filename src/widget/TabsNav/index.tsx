import React, { Component } from 'react';
import { ConnectProps, ConnectState } from '@/models/connect';

import Breadcrumb from '../Breadcrumb';

interface ITabsNavProps extends ConnectProps {
  children: any;
}

interface ITabsNavState extends ConnectState {}

class TabsNav extends Component<ITabsNavProps, ITabsNavState> {
  render() {
    const { children, ...restProps } = this.props;
    return (
      <div>
        <Breadcrumb {...restProps}></Breadcrumb>
        {children}
      </div>
    );
  }
}

export default TabsNav;
